'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CTA from '@/components/CTA';

export default function Home() {
  const whoItsFor = [
    { title: 'Software Engineers → PM', description: 'Transition from engineering to product' },
    { title: 'Data / Analysts → PM', description: 'Move from data to product leadership' },
    { title: 'Designers → PM', description: 'Bridge design and product strategy' },
    { title: 'Junior PMs', description: 'Level up your PM skills' },
    { title: 'Technical / AI PMs', description: 'Master technical & AI PM' },
  ];

  const valueProps = [
    {
      title: 'Structured PM Tracks',
      description: 'Comprehensive programs from Foundations to AI/ML PM with clear learning paths',
      icon: '📚',
    },
    {
      title: 'Technical PM Foundations',
      description: 'Master system design, APIs, architecture, and technical decision-making',
      icon: '⚙️',
    },
    {
      title: 'AI / ML PM Skills',
      description: 'Navigate ML models, LLMs, AI workflows, and data-driven products',
      icon: '🤖',
    },
    {
      title: 'Real-world Templates & Tools',
      description: 'Ready-to-use templates, prompts, and PM toolkits for immediate application',
      icon: '🛠️',
    },
    {
      title: 'Career & Interview Prep',
      description: 'Build roadmaps, manage stakeholders, and prepare for PM interviews',
      icon: '🎯',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Former Engineer, Now PM at Stripe',
      quote: 'Tech4PM gave me the structured path I needed to transition from engineering to product. The technical PM track was exactly what I was looking for.',
    },
    {
      name: 'Marcus Johnson',
      role: 'Data Analyst → PM at Meta',
      quote: 'The PM Journey tool helped me identify my skill gaps and create a personalized learning plan. Highly recommend!',
    },
    {
      name: 'Priya Patel',
      role: 'Senior PM at Google',
      quote: 'The AI/ML PM track kept me ahead of the curve. The frameworks and templates are production-ready.',
    },
  ];

  return (
    <main className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 animated-gradient"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,46,147,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.15),transparent_50%)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-7xl font-bold mb-6"
          >
            Build the Skills Modern Tech Product Managers Need
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-text-muted mb-8 max-w-3xl mx-auto"
          >
            Structured PM training, technical depth, AI-first thinking.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <CTA href="/pm-journey" primary>
              Start Your PM Journey
            </CTA>
            <CTA href="/programs">
              Explore Programs
            </CTA>
          </motion.div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-center mb-12"
          >
            Who It's For
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoItsFor.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-secondary-dark/50 border border-white/10 hover:border-neon-pink/50 hover:glow-pink transition-all backdrop-blur-sm"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/60">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-center mb-12"
          >
            What You'll Master
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-xl bg-secondary-dark/50 border border-white/10 hover:border-neon-pink/30 hover:glow-pink transition-all backdrop-blur-sm"
              >
                <div className="text-4xl mb-4">{prop.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{prop.title}</h3>
                <p className="text-white/70">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold mb-6"
          >
            Structured Learning Tracks
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Choose from Foundations PM, Technical PM, AI/ML PM, Growth PM, and Product Ops tracks.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <CTA href="/programs" primary>
              View All Programs
            </CTA>
          </motion.div>
        </div>
      </section>

      {/* Skill Path Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-bold mb-6">
                Find Your PM Path
              </h2>
              <p className="text-xl text-white/80 mb-6">
                Use our interactive PM Journey tool to visualize your current skills, identify gaps, and get personalized recommendations.
              </p>
              <CTA href="/pm-journey" primary>
                Explore PM Journey
              </CTA>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-64 lg:h-80 rounded-xl bg-gradient-to-br from-neon-pink/20 via-electric-purple/20 to-deep-violet/20 border border-white/10 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <p className="text-white/60">Interactive Skill Radar</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-center mb-12"
          >
            What Our Community Says
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <p className="text-white/80 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-white/60">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neon-pink/20 via-electric-purple/20 to-deep-violet/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold mb-6"
          >
            Ready to Start Your PM Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-white/80 mb-8"
          >
            Join our waitlist or book a call to discuss your goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <CTA href="/contact" primary>
              Book a Call
            </CTA>
            <CTA href="/contact">
              Join Waitlist
            </CTA>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
