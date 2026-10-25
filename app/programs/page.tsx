'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import CTA from '@/components/CTA';

interface Track {
  id: string;
  title: string;
  description: string;
  duration: string;
  targetPersona: string;
  learningOutcomes: string[];
  curriculum: string[];
  pricing: string;
}

const tracks: Track[] = [
  {
    id: 'foundations',
    title: 'Foundations PM',
    description: 'Master the fundamentals of product management from discovery to delivery.',
    duration: '8 weeks',
    targetPersona: 'Aspiring PMs, Career Switchers',
    learningOutcomes: [
      'Build product strategy and vision',
      'Conduct user research and discovery',
      'Create roadmaps and prioritize features',
      'Work with engineering and design teams',
      'Measure product success with metrics',
    ],
    curriculum: [
      'Week 1-2: Product Discovery & User Research',
      'Week 3-4: Roadmapping & Prioritization',
      'Week 5-6: Execution & Stakeholder Management',
      'Week 7: Metrics & Analytics',
      'Week 8: Capstone Project',
    ],
    pricing: '$1,999',
  },
  {
    id: 'technical',
    title: 'Technical PM',
    description: 'Bridge the gap between engineering and product. Master system design, APIs, and technical decision-making.',
    duration: '10 weeks',
    targetPersona: 'Developers → PM, Junior PMs',
    learningOutcomes: [
      'Understand system architecture and design',
      'Work effectively with engineering teams',
      'Make technical trade-offs and decisions',
      'Design APIs and technical specifications',
      'Navigate technical debt and scalability',
    ],
    curriculum: [
      'Week 1-2: System Design Fundamentals',
      'Week 3-4: APIs & Technical Specifications',
      'Week 5-6: Architecture & Scalability',
      'Week 7-8: Technical Decision Making',
      'Week 9: Engineering Collaboration',
      'Week 10: Capstone Project',
    ],
    pricing: '$2,499',
  },
  {
    id: 'ai-ml',
    title: 'AI/ML PM',
    description: 'Navigate the world of machine learning products, LLMs, and AI-driven features.',
    duration: '10 weeks',
    targetPersona: 'PMs working with AI, Data Analysts → PM',
    learningOutcomes: [
      'Understand ML models and workflows',
      'Work with LLMs and AI APIs',
      'Design AI-powered product features',
      'Measure AI product success',
      'Navigate AI ethics and bias',
    ],
    curriculum: [
      'Week 1-2: ML Fundamentals for PMs',
      'Week 3-4: LLMs & Generative AI',
      'Week 5-6: AI Product Design',
      'Week 7-8: AI Metrics & Evaluation',
      'Week 9: AI Ethics & Governance',
      'Week 10: Capstone Project',
    ],
    pricing: '$2,499',
  },
  {
    id: 'growth',
    title: 'Growth PM',
    description: 'Drive user acquisition, retention, and revenue through data-driven experimentation.',
    duration: '8 weeks',
    targetPersona: 'PMs focused on growth, Marketing → PM',
    learningOutcomes: [
      'Design and run experiments',
      'Analyze growth metrics and funnels',
      'Optimize conversion and retention',
      'Build growth loops and viral mechanics',
      'Scale growth initiatives',
    ],
    curriculum: [
      'Week 1-2: Growth Fundamentals',
      'Week 3-4: Experimentation & A/B Testing',
      'Week 5-6: Funnel Optimization',
      'Week 7: Growth Loops & Viral Mechanics',
      'Week 8: Capstone Project',
    ],
    pricing: '$1,999',
  },
  {
    id: 'product-ops',
    title: 'Product Ops',
    description: 'Build systems and processes to scale product teams and operations.',
    duration: '6 weeks',
    targetPersona: 'Senior PMs, Product Leaders',
    learningOutcomes: [
      'Design product processes and workflows',
      'Set up product tooling and systems',
      'Manage product data and analytics',
      'Scale product teams',
      'Drive product culture',
    ],
    curriculum: [
      'Week 1-2: Product Ops Fundamentals',
      'Week 3-4: Tooling & Systems',
      'Week 5: Data & Analytics Infrastructure',
      'Week 6: Capstone Project',
    ],
    pricing: '$1,499',
  },
];

export default function ProgramsPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Are the programs self-paced or cohort-based?',
      answer: 'Our programs are cohort-based with live sessions, peer collaboration, and structured deadlines. This ensures accountability and community learning.',
    },
    {
      question: 'What is the time commitment?',
      answer: 'Most programs require 8-10 hours per week, including live sessions, assignments, and project work.',
    },
    {
      question: 'Do you offer certificates?',
      answer: 'Yes, upon completion of a program, you\'ll receive a certificate that you can add to your LinkedIn profile.',
    },
    {
      question: 'Can I switch tracks after starting?',
      answer: 'Yes, you can switch tracks within the first two weeks of the program. Contact our support team to make the change.',
    },
    {
      question: 'Is there a money-back guarantee?',
      answer: 'We offer a 14-day money-back guarantee if you\'re not satisfied with the program.',
    },
  ];

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
            Product Management Programs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Choose from structured tracks designed to take you from where you are to where you want to be.
          </motion.p>
        </div>
      </section>

      {/* Tracks Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                onClick={() => setSelectedTrack(track)}
              >
                <h3 className="text-2xl font-bold mb-2">{track.title}</h3>
                <p className="text-white/70 mb-4">{track.description}</p>
                <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                  <span>{track.duration}</span>
                  <span>{track.pricing}</span>
                </div>
                <button className="w-full py-2 rounded-lg border border-white/20 hover:bg-white/5 transition-colors">
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Details Modal */}
      {selectedTrack && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTrack(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-navy rounded-xl border border-white/20 p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-bold">{selectedTrack.title}</h2>
              <button
                onClick={() => setSelectedTrack(null)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-xl text-white/80 mb-6">{selectedTrack.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-white/60 mb-1">Duration</p>
                <p className="font-semibold">{selectedTrack.duration}</p>
              </div>
              <div>
                <p className="text-sm text-white/60 mb-1">Target Persona</p>
                <p className="font-semibold">{selectedTrack.targetPersona}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Learning Outcomes</h3>
              <ul className="space-y-2">
                {selectedTrack.learningOutcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-lime-green mr-2">✓</span>
                    <span className="text-white/80">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Curriculum</h3>
              <ul className="space-y-2">
                {selectedTrack.curriculum.map((item, idx) => (
                  <li key={idx} className="text-white/80">{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <CTA href="/contact" primary className="flex-1">
                Enroll Now
              </CTA>
              <CTA href="/contact" className="flex-1">
                Join Waitlist
              </CTA>
            </div>
          </motion.div>
        </div>
      )}

      {/* Comparison Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-center mb-12"
          >
            Compare Programs
          </motion.h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left p-4">Program</th>
                  <th className="text-center p-4">Duration</th>
                  <th className="text-center p-4">Price</th>
                  <th className="text-center p-4">Best For</th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((track) => (
                  <tr key={track.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="p-4 font-semibold">{track.title}</td>
                    <td className="p-4 text-center">{track.duration}</td>
                    <td className="p-4 text-center">{track.pricing}</td>
                    <td className="p-4 text-center text-sm text-white/70">{track.targetPersona}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-center mb-12"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-white/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <span className="text-xl">{openFAQ === index ? '−' : '+'}</span>
                </button>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="p-6 text-white/80"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
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
            Ready to Start Learning?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-white/80 mb-8"
          >
            Book a call to discuss which program is right for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <CTA href="/contact" primary>
              Book a Call
            </CTA>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
