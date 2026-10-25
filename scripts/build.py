#!/usr/bin/env python3
"""Build the static, SEO-friendly Tech4PM site from src/index.html.

Every route of the single-file source is rendered in a headless browser and saved as its own
page (for example /program/index.html, /courses/sql-analytics/index.html), with a unique title,
meta description, canonical URL, Open Graph tags, hreflang links and schema.org data.
Also writes sitemap.xml, robots.txt, 404.html, favicon.svg and og-image.png.

Usage (from the repository root):
    pip install playwright
    playwright install chromium
    python scripts/build.py
Set CHROMIUM_PATH to use an existing Chromium binary instead of Playwright's download.
"""
import asyncio
import datetime
import html
import json
import os
import re
import hashlib
import shutil

from playwright.async_api import async_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src', 'index.html')
NAV_JS = os.path.join(ROOT, 'assets', 'nav.js')
SITE = 'https://tech4pm.com'
TODAY = datetime.date.today().isoformat()
OG_IMAGE = SITE + '/og-image.png'
ORG = {'@type': 'Organization', 'name': 'Tech4PM', 'url': SITE + '/', 'logo': SITE + '/favicon.svg'}

# Folders this script owns at the repository root. They are deleted and rebuilt on every run.
GENERATED_DIRS = ['ai', 'program', 'courses', 'live', 'docs', 'lesson', 'schedule', 'teams', 'resources',
                  'about', 'contact', 'privacy', 'terms', 'cookies', 'refunds', 'en']
GENERATED_FILES = ['assets/site.css', 'assets/app.js', 'index.html', '404.html', 'sitemap.xml', 'robots.txt', 'favicon.svg', 'og-image.png']

PAGES = {
    # route: (path, title, description or None to use the page's own intro text)
    'home': ('/', 'Tech4PM | Technical and AI Training for PMs',
             'Live cohorts and workshops that teach product and project managers how software, data and AI products work. Courses, technical docs and team training.'),
    'ai': ('/ai/', 'AI for Product and Project Managers | Tech4PM',
           'Practical AI skills for product managers and project managers: courses, workflows and guides for discovery, specs, planning, risk and reporting.'),
    'courses': ('/courses/', 'Courses for Technical and AI Product Management | Tech4PM',
                'Courses on system design, APIs, SQL, data architecture, machine learning and AI for product and project managers. Filter by level, topic and role.'),
    'live': ('/live/', 'Live Sessions with Instructors | Tech4PM', None),
    'lesson': ('/lesson/', 'Free Sample Lesson: How Software Is Built | Tech4PM',
               'Try a free five-step lesson from Technical Foundations for PMs: how products are built, front end and back end, releases and release risk.'),
    'schedule': ('/schedule/', 'Course Schedule and Enrollment | Tech4PM', None),
    'teams': ('/teams/', 'Technical and AI Training for Product Teams | Tech4PM', None),
    'resources': ('/resources/', 'Product Management Templates and Playbooks | Tech4PM', None),
    'about': ('/about/', 'About Tech4PM: Outcomes, Learning Path and FAQ', None),
    'contact': ('/contact/', 'Contact Tech4PM', None),
    'privacy': ('/privacy/', 'Privacy Policy | Tech4PM', 'How Tech4PM collects, uses and protects personal data, and your rights under the GDPR.'),
    'terms': ('/terms/', 'Terms of Service | Tech4PM', 'The terms for using the Tech4PM website and enrolling in Tech4PM courses.'),
    'cookies': ('/cookies/', 'Cookie Policy | Tech4PM', 'What the Tech4PM website stores on your device and how fonts are loaded.'),
    'refunds': ('/refunds/', 'Refund and Enrollment Policy | Tech4PM', 'How enrollment, payment, cancellations and refunds work for Tech4PM courses.'),
}
PROGRAM = {
    'hy': ('/program/', 'AI Project Manager-ների համար | 8 դասից բաղկացած ծրագիր | Tech4PM'),
    'en': ('/en/program/', 'AI for Project Managers: 8-Lesson Program | Tech4PM'),
}

PRERENDER_JS = r'''
() => {
  document.querySelectorAll('.page').forEach(p => { if (!p.classList.contains('on')) p.innerHTML = ''; });
  const m = document.querySelector('meta[name="claude:viewport-fit-sides"]'); if (m) m.remove();
  const on = document.querySelector('.page.on');
  const pick = sel => { const e = on && on.querySelector(sel); return e ? e.textContent.replace(/\s+/g, ' ').trim() : ''; };
  const faq = [...(on ? on.querySelectorAll('details') : [])].map(d => ({
    q: (d.querySelector('summary') || {}).textContent || '', a: (d.querySelector('p') || {}).textContent || ''
  })).filter(x => x.q && x.a);
  return {
    h1: pick('h1'),
    intro: pick('.lead') || pick('.phead p') || pick('.detail p.muted') || pick('.doc > p:not(.updated)') || pick('p'),
    faq: on && on.id === 'p-about' ? faq : [],
    head: [...document.head.querySelectorAll('link, style')].map(e => e.outerHTML).join('\n'),
    bodyClass: document.body.className,
    body: document.body.innerHTML
  };
}
'''


def clip(text, n=158):
    text = re.sub(r'\s+', ' ', text).strip()
    if len(text) <= n:
        return text
    cut = text[:n].rsplit(' ', 1)[0].rstrip(',.;:')
    return cut + '…'


def ld(obj):
    return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False).replace('</', '<\\/') + '</script>'


def breadcrumb(items):
    return {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
        {'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': SITE + p} for i, (n, p) in enumerate(items)]}


ASSETS = {}


def shared_asset(name, text):
    """Write a shared CSS/JS file once and return its cache-busted URL."""
    if name not in ASSETS:
        with open(os.path.join(ROOT, 'assets', name), 'w', encoding='utf-8') as fh:
            fh.write(text)
        ASSETS[name] = '/assets/' + name + '?v=' + hashlib.sha1(text.encode('utf-8')).hexdigest()[:10]
    return ASSETS[name]


def externalize(head, body):
    """Move the big inline <style> and the app <script> into shared, cacheable files."""
    m = re.search(r'<style>(.*?)</style>', head, flags=re.S)
    if m:
        head = head.replace(m.group(0), '<link rel="stylesheet" href="' + shared_asset('site.css', m.group(1).strip() + '\n') + '">')
    m = re.search(r'<script>(.*?)</script>', body, flags=re.S)
    if m:
        body = body.replace(m.group(0), '<script src="' + shared_asset('app.js', m.group(1).strip() + '\n') + '"></script>')
    return head, body


def page_html(spec, data):
    data['head_ext'], data['body_ext'] = externalize(data['head'], data['body'])
    lang = spec.get('lang', 'en')
    path = spec['path']
    canonical = SITE + spec.get('canonical', path)
    title = spec['title']
    desc = clip(spec.get('desc') or data['intro'])
    e = html.escape
    head = [
        '<meta charset="utf-8">',
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">',
        '<title>' + e(title) + '</title>',
        '<meta name="description" content="' + e(desc) + '">',
        '<link rel="canonical" href="' + e(canonical) + '">',
    ]
    if spec.get('noindex'):
        head.append('<meta name="robots" content="noindex">')
    for hl, href in spec.get('alternates', []):
        head.append('<link rel="alternate" hreflang="' + hl + '" href="' + SITE + href + '">')
    head += [
        '<meta name="theme-color" content="#0b0a12">',
        '<link rel="icon" href="/favicon.svg" type="image/svg+xml">',
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="Tech4PM">',
        '<meta property="og:title" content="' + e(title) + '">',
        '<meta property="og:description" content="' + e(desc) + '">',
        '<meta property="og:url" content="' + e(canonical) + '">',
        '<meta property="og:image" content="' + OG_IMAGE + '">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta property="og:locale" content="' + ('hy_AM' if lang == 'hy' else 'en_US') + '">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="twitter:title" content="' + e(title) + '">',
        '<meta name="twitter:description" content="' + e(desc) + '">',
        '<meta name="twitter:image" content="' + OG_IMAGE + '">',
        '<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>',
        data['head_ext'],
    ]
    for obj in spec.get('schema', []):
        head.append(ld(obj))
    config = ('<script>window.T4P_ROUTE=' + json.dumps(spec['route']) + ';window.T4P_LANG=' + json.dumps(spec.get('jslang')) +
              ';(function(){var g=document.getElementById.bind(document);'
              'document.getElementById=function(i){return g(i)||document.createElement("div")}})();</script>')
    body = data['body_ext']
    if spec.get('replace_main'):
        body = re.sub(r'<main>.*</main>', '<main>' + spec['replace_main'] + '</main>', body, flags=re.S)
    cls = (' class="' + e(data['bodyClass']) + '"') if data['bodyClass'] else ''
    return ('<!doctype html>\n<html lang="' + lang + '">\n<head>\n' + '\n'.join(head) + '\n</head>\n<body' + cls + '>\n' +
            config + '\n' + body.strip() + '\n<script src="/assets/nav.js"></script>\n</body>\n</html>\n')


def course_schema(name, desc, url, lang):
    return {'@context': 'https://schema.org', '@type': 'Course', 'name': name, 'description': desc,
            'url': url, 'inLanguage': lang, 'provider': ORG}


async def main():
    nav_js = open(NAV_JS, encoding='utf-8').read()
    src_url = 'file://' + SRC
    async with async_playwright() as p:
        kw = {'executable_path': os.environ['CHROMIUM_PATH']} if os.environ.get('CHROMIUM_PATH') else {}
        browser = await p.chromium.launch(**kw)

        async def render(route, jslang=None):
            page = await browser.new_page(viewport={'width': 1280, 'height': 900})
            await page.add_init_script('window.T4P_ROUTE=' + json.dumps(route) + ';window.T4P_LANG=' + json.dumps(jslang) + ';')
            await page.goto(src_url)
            await page.wait_for_timeout(400)
            await page.evaluate('(js) => { (0, eval)(js); }', nav_js)
            data = await page.evaluate(PRERENDER_JS)
            await page.close()
            return data

        # Discover courses and docs from the source itself.
        page = await browser.new_page()
        await page.add_init_script('window.T4P_ROUTE="courses";')
        await page.goto(src_url)
        await page.wait_for_timeout(400)
        course_ids = await page.evaluate('''[...new Set([...document.querySelectorAll('#catalog a[href^="#course-"]')].map(a => a.getAttribute('href').slice(8)))]''')
        await page.close()
        page = await browser.new_page()
        await page.add_init_script('window.T4P_ROUTE="docs";')
        await page.goto(src_url)
        await page.wait_for_timeout(300)
        doc_ids = await page.evaluate('''[...document.querySelectorAll('#dnav a[href^="#doc-"]')].map(a => a.getAttribute('href').slice(5))''')
        await page.close()

        specs = []
        for route, (path, title, desc) in PAGES.items():
            spec = {'route': route, 'path': path, 'title': title, 'desc': desc, 'schema': []}
            if route == 'home':
                spec['schema'] = [dict({'@context': 'https://schema.org'}, **ORG),
                                  {'@context': 'https://schema.org', '@type': 'WebSite', 'name': 'Tech4PM', 'url': SITE + '/', 'inLanguage': ['en', 'hy']}]
            elif route != 'about':
                spec['schema'] = [breadcrumb([('Home', '/'), (title.split(' | ')[0], path)])]
            specs.append(spec)
        alts = [('hy', '/program/'), ('en', '/en/program/'), ('x-default', '/program/')]
        for lang, (path, title) in PROGRAM.items():
            specs.append({'route': 'program', 'jslang': lang, 'lang': lang, 'path': path, 'title': title,
                          'alternates': alts, 'program': True})
        for cid in course_ids:
            if cid == 'ai-pm-program':
                continue  # this course is the /program/ landing page
            specs.append({'route': 'course-' + cid, 'path': '/courses/' + cid + '/', 'course': True})
        specs.append({'route': 'docs', 'path': '/docs/', 'canonical': '/docs/' + doc_ids[0] + '/',
                      'title': 'Technical Docs for Product and Project Managers | Tech4PM', 'in_sitemap': False})
        for did in doc_ids:
            specs.append({'route': 'doc-' + did, 'path': '/docs/' + did + '/', 'doc': True})
        specs.append({'route': '404', 'path': '/404.html', 'title': 'Page not found | Tech4PM', 'noindex': True,
                      'desc': 'This page does not exist on Tech4PM.', 'in_sitemap': False, 'file': '404.html',
                      'replace_main': '<section class="wrap" style="padding-block:120px;max-width:720px">'
                                      '<span class="caps muted">Error 404</span>'
                                      '<h1 style="font-size:clamp(34px,4.6vw,48px);line-height:1.1;margin:14px 0 18px">This page does not exist.</h1>'
                                      '<p class="muted" style="font-size:18px">The link may be old or mistyped. Try one of these instead.</p>'
                                      '<div class="actions"><a class="btn" href="/">Home</a><a class="btn ghost" href="/courses/">Courses</a>'
                                      '<a class="btn ghost" href="/program/">AI for Project Managers</a></div></section>'})

        # Clean previous output.
        for d in GENERATED_DIRS:
            shutil.rmtree(os.path.join(ROOT, d), ignore_errors=True)
        for f in GENERATED_FILES:
            if os.path.exists(os.path.join(ROOT, f)):
                os.remove(os.path.join(ROOT, f))

        sitemap = []
        for spec in specs:
            data = await render('home' if spec['route'] == '404' else spec['route'], spec.get('jslang'))
            url = SITE + spec['path']
            if spec.get('course'):
                spec['title'] = data['h1'] + ' | Tech4PM Course'
                spec['schema'] = [course_schema(data['h1'], clip(data['intro'], 300), url, 'en'),
                                  breadcrumb([('Home', '/'), ('Courses', '/courses/'), (data['h1'], spec['path'])])]
            if spec.get('doc'):
                spec['title'] = data['h1'] + ' | Tech4PM Docs'
                spec['schema'] = [breadcrumb([('Home', '/'), ('Docs', '/docs/'), (data['h1'], spec['path'])]),
                                  {'@context': 'https://schema.org', '@type': 'Article', 'headline': data['h1'],
                                   'description': clip(data['intro'], 300), 'url': url, 'inLanguage': 'en',
                                   'author': ORG, 'publisher': ORG}]
            if spec.get('program'):
                spec['schema'] = [course_schema(data['h1'], clip(data['intro'], 300), url, spec['lang']),
                                  breadcrumb([('Home', '/'), (data['h1'], spec['path'])])]
            if spec['route'] == 'about' and data['faq']:
                spec['schema'] = [breadcrumb([('Home', '/'), ('About', '/about/')]),
                                  {'@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': [
                                      {'@type': 'Question', 'name': f['q'].strip(),
                                       'acceptedAnswer': {'@type': 'Answer', 'text': f['a'].strip()}} for f in data['faq']]}]
            out = os.path.join(ROOT, spec['file']) if spec.get('file') else os.path.join(ROOT, spec['path'].strip('/'), 'index.html')
            os.makedirs(os.path.dirname(out), exist_ok=True)
            with open(out, 'w', encoding='utf-8') as fh:
                fh.write(page_html(spec, data))
            if spec.get('in_sitemap', True):
                sitemap.append((spec['path'], spec.get('alternates', [])))
            print('built', spec['path'])

        # Share image.
        page = await browser.new_page(viewport={'width': 1200, 'height': 630})
        await page.set_content(OG_CARD)
        await page.wait_for_timeout(300)
        await page.screenshot(path=os.path.join(ROOT, 'og-image.png'))
        await page.close()
        await browser.close()

    with open(os.path.join(ROOT, 'favicon.svg'), 'w', encoding='utf-8') as fh:
        fh.write(FAVICON)
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for path, alternates in sitemap:
        lines.append('  <url>')
        lines.append('    <loc>' + SITE + path + '</loc>')
        lines.append('    <lastmod>' + TODAY + '</lastmod>')
        for hl, href in alternates:
            lines.append('    <xhtml:link rel="alternate" hreflang="' + hl + '" href="' + SITE + href + '"/>')
        lines.append('  </url>')
    lines.append('</urlset>')
    with open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8') as fh:
        fh.write('\n'.join(lines) + '\n')
    with open(os.path.join(ROOT, 'robots.txt'), 'w', encoding='utf-8') as fh:
        fh.write('User-agent: *\nAllow: /\nDisallow: /src/\nDisallow: /scripts/\n\nSitemap: ' + SITE + '/sitemap.xml\n')
    print('done:', len(sitemap), 'pages in sitemap')


FAVICON = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b6cff"/><stop offset="1" stop-color="#5b3df5"/></linearGradient></defs><rect width="64" height="64" rx="14" fill="url(#g)"/><text x="32" y="42" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="26" font-weight="700" fill="#ffffff">T4</text></svg>
'''

OG_CARD = '''<!doctype html><html><head><meta charset="utf-8"><style>
body{margin:0;width:1200px;height:630px;background:#0b0a12;color:#eeedf7;font-family:Inter,"Noto Sans Armenian",Arial,sans-serif;overflow:hidden;position:relative}
.glow{position:absolute;right:-160px;top:-220px;width:820px;height:820px;background:radial-gradient(closest-side,rgba(124,92,255,.45),transparent)}
.wrap{position:relative;padding:84px 88px;display:flex;flex-direction:column;height:100%;box-sizing:border-box}
.brand{display:flex;align-items:center;gap:18px;font-size:34px;font-weight:700}
.mark{width:64px;height:64px;border-radius:14px;background:linear-gradient(135deg,#8b6cff,#5b3df5);display:grid;place-items:center;font-size:26px;color:#fff}
h1{font-size:68px;line-height:1.05;letter-spacing:-.03em;margin:56px 0 24px;max-width:900px}
p{font-size:28px;color:#aaa6c2;margin:0;max-width:880px}
.pill{margin-top:auto;display:inline-flex;gap:12px;font-size:22px;color:#c9bbff}
.pill span{border:1px solid #3a3358;border-radius:999px;padding:10px 18px}
</style></head><body><div class="glow"></div><div class="wrap">
<div class="brand"><div class="mark">T4</div>Tech4PM</div>
<h1>Technical and AI training for product and project managers</h1>
<p>Live cohorts, workshops and the AI for Project Managers program.</p>
<div class="pill"><span>tech4pm.com</span><span>EN · HY</span></div>
</div></body></html>'''


if __name__ == '__main__':
    asyncio.run(main())
