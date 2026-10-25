'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'template' | 'tool' | 'playbook' | 'case-study' | 'prompt-pack';
  tags: string[];
  link?: string;
}

const resources: Resource[] = [
  {
    id: 'notion-roadmap',
    title: 'Product Roadmap Template (Notion)',
    description: 'Comprehensive roadmap template with quarters, themes, and OKRs.',
    category: 'template',
    tags: ['Beginner', 'Planning'],
    link: '#',
  },
  {
    id: 'discovery-framework',
    title: 'Product Discovery Framework',
    description: 'Step-by-step framework for conducting user research and discovery.',
    category: 'playbook',
    tags: ['Intermediate', 'Discovery'],
    link: '#',
  },
  {
    id: 'ai-prompts',
    title: 'AI Prompt Pack for PMs',
    description: '100+ prompts for ChatGPT, Claude, and other LLMs to accelerate PM work.',
    category: 'prompt-pack',
    tags: ['AI', 'Advanced'],
    link: '#',
  },
  {
    id: 'technical-spec',
    title: 'Technical Specification Template',
    description: 'Template for writing clear technical specs for engineering teams.',
    category: 'template',
    tags: ['Technical', 'Intermediate'],
    link: '#',
  },
  {
    id: 'stakeholder-playbook',
    title: 'Stakeholder Management Playbook',
    description: 'Strategies and templates for managing stakeholders effectively.',
    category: 'playbook',
    tags: ['Intermediate', 'Leadership'],
    link: '#',
  },
  {
    id: 'ml-product-case',
    title: 'ML Product Case Study: Recommendation Engine',
    description: 'Deep dive into building a recommendation engine from scratch.',
    category: 'case-study',
    tags: ['AI', 'Advanced', 'Technical'],
    link: '#',
  },
  {
    id: 'experiment-template',
    title: 'A/B Test Experiment Template',
    description: 'Template for designing and running product experiments.',
    category: 'template',
    tags: ['Experimentation', 'Intermediate'],
    link: '#',
  },
  {
    id: 'api-design-template',
    title: 'API Design Template',
    description: 'Template for designing RESTful APIs and documenting endpoints.',
    category: 'template',
    tags: ['Technical', 'Advanced'],
    link: '#',
  },
  {
    id: 'growth-playbook',
    title: 'Growth Playbook',
    description: 'Comprehensive playbook for growth PMs with frameworks and tactics.',
    category: 'playbook',
    tags: ['Growth', 'Advanced'],
    link: '#',
  },
  {
    id: 'pm-tools-list',
    title: 'Essential PM Tools Directory',
    description: 'Curated list of 50+ tools for product discovery, roadmapping, and analytics.',
    category: 'tool',
    tags: ['Beginner', 'Tooling'],
    link: '#',
  },
  {
    id: 'llm-workflow',
    title: 'LLM Workflow Templates',
    description: 'Templates for integrating LLMs into product workflows.',
    category: 'prompt-pack',
    tags: ['AI', 'Advanced'],
    link: '#',
  },
  {
    id: 'payment-case',
    title: 'Payments PM Case Study',
    description: 'Case study on building a payment processing feature.',
    category: 'case-study',
    tags: ['Technical', 'Intermediate'],
    link: '#',
  },
];

const categories = [
  { id: 'all', label: 'All Resources', icon: '📚' },
  { id: 'template', label: 'Templates', icon: '📄' },
  { id: 'tool', label: 'Tools', icon: '🛠️' },
  { id: 'playbook', label: 'Playbooks', icon: '📖' },
  { id: 'case-study', label: 'Case Studies', icon: '📊' },
  { id: 'prompt-pack', label: 'Prompt Packs', icon: '🤖' },
];

const tags = ['Beginner', 'Intermediate', 'Advanced', 'AI', 'Technical', 'Interview', 'Discovery', 'Planning', 'Experimentation', 'Growth', 'Leadership', 'Tooling'];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredResources = resources.filter((resource) => {
    const categoryMatch = selectedCategory === 'all' || resource.category === selectedCategory;
    const tagMatch = selectedTags.length === 0 || selectedTags.some((tag) => resource.tags.includes(tag));
    return categoryMatch && tagMatch;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    return cat?.icon || '📚';
  };

  return (
    <main className="pt-16 min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-bold mb-6"
          >
            PM Resources & Tools
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Templates, playbooks, case studies, and tools to accelerate your PM journey.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedCategory === category.id
                      ? 'gradient-neon border-transparent text-white'
                      : 'border-white/20 bg-white/5 text-white/80 hover:border-white/40'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Filter by Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-success-green text-dark-navy font-semibold'
                      : 'bg-white/10 text-white/80 hover:bg-white/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-white/60">
              Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{getCategoryIcon(resource.category)}</span>
                  <span className="text-xs text-white/40 uppercase">{resource.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-white/70 text-sm mb-4">{resource.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded text-xs bg-white/10 text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {resource.link ? (
                  <Link
                    href={resource.link}
                    className="text-cyan-glow hover:underline text-sm font-medium"
                  >
                    View Resource →
                  </Link>
                ) : (
                  <button className="text-cyan-glow hover:underline text-sm font-medium">
                    Coming Soon
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No resources match your filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedTags([]);
                }}
                className="mt-4 text-cyan-glow hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neon-pink/20 via-electric-purple/20 to-deep-violet/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold mb-6"
          >
            Want More Resources?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-white/80 mb-8"
          >
            Join our community to get access to exclusive templates and resources.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg gradient-neon text-white font-medium hover:opacity-90 transition-opacity"
            >
              Join Waitlist
            </Link>
            <Link
              href="/programs"
              className="px-6 py-3 rounded-lg border-2 border-white/20 text-white font-medium hover:border-white/40 hover:bg-white/5 transition-all"
            >
              Explore Programs
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
