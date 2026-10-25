'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import CTA from '@/components/CTA';
import Link from 'next/link';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillProfile {
  'Product Discovery': number;
  'User Experience': number;
  'Product Analytics': number;
  'Technical Skills': number;
  'Machine Learning': number;
  'Planning & Strategy': number;
  'Delivery': number;
  'Experimentation (A/B Testing)': number;
}

const backgroundProfiles: Record<string, SkillProfile> = {
  'Software Developer': {
    'Product Discovery': 4,
    'User Experience': 5,
    'Product Analytics': 5,
    'Technical Skills': 9,
    'Machine Learning': 6,
    'Planning & Strategy': 4,
    'Delivery': 8,
    'Experimentation (A/B Testing)': 3,
  },
  'Designer': {
    'Product Discovery': 6,
    'User Experience': 9,
    'Product Analytics': 4,
    'Technical Skills': 3,
    'Machine Learning': 2,
    'Planning & Strategy': 5,
    'Delivery': 5,
    'Experimentation (A/B Testing)': 4,
  },
  'Analyst': {
    'Product Discovery': 5,
    'User Experience': 4,
    'Product Analytics': 9,
    'Technical Skills': 6,
    'Machine Learning': 7,
    'Planning & Strategy': 5,
    'Delivery': 4,
    'Experimentation (A/B Testing)': 7,
  },
  'QA': {
    'Product Discovery': 5,
    'User Experience': 6,
    'Product Analytics': 5,
    'Technical Skills': 7,
    'Machine Learning': 3,
    'Planning & Strategy': 4,
    'Delivery': 8,
    'Experimentation (A/B Testing)': 5,
  },
  'Marketing / Growth': {
    'Product Discovery': 7,
    'User Experience': 6,
    'Product Analytics': 8,
    'Technical Skills': 3,
    'Machine Learning': 2,
    'Planning & Strategy': 7,
    'Delivery': 5,
    'Experimentation (A/B Testing)': 8,
  },
  'Existing PM': {
    'Product Discovery': 7,
    'User Experience': 7,
    'Product Analytics': 6,
    'Technical Skills': 5,
    'Machine Learning': 3,
    'Planning & Strategy': 8,
    'Delivery': 7,
    'Experimentation (A/B Testing)': 6,
  },
};

const targetProfiles: Record<string, SkillProfile> = {
  'Classical PM': {
    'Product Discovery': 9,
    'User Experience': 8,
    'Product Analytics': 7,
    'Technical Skills': 5,
    'Machine Learning': 3,
    'Planning & Strategy': 9,
    'Delivery': 8,
    'Experimentation (A/B Testing)': 7,
  },
  'Tech PM': {
    'Product Discovery': 8,
    'User Experience': 7,
    'Product Analytics': 6,
    'Technical Skills': 9,
    'Machine Learning': 5,
    'Planning & Strategy': 8,
    'Delivery': 9,
    'Experimentation (A/B Testing)': 6,
  },
  'Data PM': {
    'Product Discovery': 8,
    'User Experience': 6,
    'Product Analytics': 9,
    'Technical Skills': 7,
    'Machine Learning': 8,
    'Planning & Strategy': 8,
    'Delivery': 7,
    'Experimentation (A/B Testing)': 8,
  },
  'ML / AI PM': {
    'Product Discovery': 8,
    'User Experience': 7,
    'Product Analytics': 8,
    'Technical Skills': 7,
    'Machine Learning': 9,
    'Planning & Strategy': 8,
    'Delivery': 7,
    'Experimentation (A/B Testing)': 7,
  },
  'Growth PM': {
    'Product Discovery': 9,
    'User Experience': 7,
    'Product Analytics': 9,
    'Technical Skills': 4,
    'Machine Learning': 3,
    'Planning & Strategy': 8,
    'Delivery': 7,
    'Experimentation (A/B Testing)': 9,
  },
  'UX PM': {
    'Product Discovery': 9,
    'User Experience': 9,
    'Product Analytics': 6,
    'Technical Skills': 4,
    'Machine Learning': 2,
    'Planning & Strategy': 8,
    'Delivery': 7,
    'Experimentation (A/B Testing)': 6,
  },
  'Payments PM': {
    'Product Discovery': 8,
    'User Experience': 7,
    'Product Analytics': 8,
    'Technical Skills': 8,
    'Machine Learning': 4,
    'Planning & Strategy': 9,
    'Delivery': 9,
    'Experimentation (A/B Testing)': 7,
  },
};

const backgrounds = Object.keys(backgroundProfiles);
const targets = Object.keys(targetProfiles);

export default function PMJourneyPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);

  const getRecommendations = () => {
    if (!selectedBackground || !selectedTarget) return null;

    const current = backgroundProfiles[selectedBackground];
    const target = targetProfiles[selectedTarget];
    
    const gaps: string[] = [];
    const recommendations = {
      tracks: [] as string[],
      templates: [] as string[],
      tools: [] as string[],
      reading: [] as string[],
      interview: [] as string[],
    };

    // Identify skill gaps
    Object.keys(target).forEach((skill) => {
      const currentSkill = current[skill as keyof SkillProfile];
      const targetSkill = target[skill as keyof SkillProfile];
      if (targetSkill - currentSkill > 2) {
        gaps.push(skill);
      }
    });

    // Generate recommendations based on target role
    if (selectedTarget === 'Tech PM' || gaps.includes('Technical Skills')) {
      recommendations.tracks.push('Technical PM');
      recommendations.templates.push('Technical Spec Template', 'API Design Template');
      recommendations.tools.push('Figma', 'Notion', 'Linear');
      recommendations.reading.push('The Design of Everyday Things', 'System Design Primer');
    }

    if (selectedTarget === 'ML/AI PM' || gaps.includes('Machine Learning')) {
      recommendations.tracks.push('AI/ML PM');
      recommendations.templates.push('ML Product Requirements', 'AI Prompt Library');
      recommendations.tools.push('Jupyter Notebooks', 'Weights & Biases', 'ChatGPT');
      recommendations.reading.push('Machine Learning Yearning', 'The AI Product Manager\'s Handbook');
    }

    if (selectedTarget === 'Growth PM' || gaps.includes('Experimentation (A/B Testing)')) {
      recommendations.tracks.push('Growth PM');
      recommendations.templates.push('Experiment Design Template', 'Growth Playbook');
      recommendations.tools.push('Amplitude', 'Mixpanel', 'Optimizely');
      recommendations.reading.push('Hacking Growth', 'Lean Analytics');
    }

    if (gaps.includes('Product Discovery') || gaps.includes('Planning & Strategy')) {
      recommendations.tracks.push('Foundations PM');
      recommendations.templates.push('Product Discovery Framework', 'Roadmap Template');
      recommendations.tools.push('Miro', 'Productboard', 'Aha!');
      recommendations.reading.push('Inspired', 'The Lean Startup');
    }

    recommendations.interview.push('PM Interview Prep Guide', 'Technical PM Interview Questions', 'Case Study Templates');

    return recommendations;
  };

  const recommendations = getRecommendations();

  const chartData = selectedBackground && selectedTarget ? {
    labels: Object.keys(targetProfiles[selectedTarget]),
    datasets: [
      {
        label: 'Current Skills',
        data: Object.values(backgroundProfiles[selectedBackground]),
        borderColor: 'rgb(34, 211, 238)', // Cyan glow
        backgroundColor: 'rgba(34, 211, 238, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Target Skills',
        data: Object.values(targetProfiles[selectedTarget]),
        borderColor: 'rgb(255, 46, 147)', // Neon pink
        backgroundColor: 'rgba(255, 46, 147, 0.2)',
        borderWidth: 2,
      },
    ],
  } : null;

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.8)',
          font: {
            size: 12,
          },
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 255, 255, 0.8)',
        },
      },
    },
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
            Your PM Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Visualize your current skills, identify gaps, and get personalized recommendations.
          </motion.p>
        </div>
      </section>

      {/* Step Indicator */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= s
                      ? 'gradient-neon text-white'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > s ? 'gradient-neon' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-white/60">
            <span>Select Background</span>
            <span>Choose Target</span>
            <span>View Results</span>
          </div>
        </div>
      </section>

      {/* Step 1: Select Background */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.section
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="px-4 sm:px-6 lg:px-8 py-12"
          >
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                What's your current background?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {backgrounds.map((bg) => (
                  <motion.button
                    key={bg}
                    onClick={() => {
                      setSelectedBackground(bg);
                      setTimeout(() => setStep(2), 300);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedBackground === bg
                        ? 'border-cyan-glow bg-cyan-glow/20 glow-cyan'
                        : 'border-white/10 bg-secondary-dark/50 hover:border-neon-pink/50 hover:glow-pink'
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-2">{bg}</h3>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Step 2: Select Target */}
        {step === 2 && (
          <motion.section
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="px-4 sm:px-6 lg:px-8 py-12"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setStep(1)}
                  className="text-white/60 hover:text-white"
                >
                  ← Back
                </button>
                <h2 className="text-3xl font-bold text-center flex-1">
                  What PM role do you want to become?
                </h2>
                <div className="w-16"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {targets.map((target) => (
                  <motion.button
                    key={target}
                    onClick={() => {
                      setSelectedTarget(target);
                      setTimeout(() => setStep(3), 300);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedTarget === target
                        ? 'border-neon-pink bg-neon-pink/20 glow-pink'
                        : 'border-white/10 bg-secondary-dark/50 hover:border-electric-purple/50 hover:glow-purple'
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-2">{target}</h3>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.section>
        )}

        {/* Step 3: Results */}
        {step === 3 && selectedBackground && selectedTarget && (
          <motion.section
            key="step3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-4 sm:px-6 lg:px-8 py-12"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => setStep(2)}
                  className="text-white/60 hover:text-white"
                >
                  ← Back
                </button>
                <h2 className="text-3xl font-bold text-center flex-1">
                  Your Skill Gap Analysis
                </h2>
                <div className="w-16"></div>
              </div>

              <div className="mb-8 text-center">
                <p className="text-xl text-text-primary">
                  Transitioning from <span className="font-semibold text-cyan-glow">{selectedBackground}</span> to{' '}
                  <span className="font-semibold text-neon-pink">{selectedTarget}</span>
                </p>
              </div>

              {/* Radar Chart */}
              <div className="bg-white/5 rounded-xl p-8 mb-12 border border-white/10">
                <div className="max-w-2xl mx-auto">
                  {chartData && (
                    <Radar data={chartData} options={chartOptions} />
                  )}
                </div>
              </div>

              {/* Recommendations */}
              {recommendations && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="mr-2">📚</span> Recommended Tracks
                    </h3>
                    <ul className="space-y-2">
                      {recommendations.tracks.map((track, idx) => (
                        <li key={idx} className="text-white/80">
                          • {track}
                        </li>
                      ))}
                    </ul>
                    <Link href="/programs" className="text-cyan-glow hover:underline mt-4 inline-block">
                      View Programs →
                    </Link>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="mr-2">📄</span> Templates to Study
                    </h3>
                    <ul className="space-y-2">
                      {recommendations.templates.map((template, idx) => (
                        <li key={idx} className="text-white/80">
                          • {template}
                        </li>
                      ))}
                    </ul>
                    <Link href="/resources" className="text-cyan-glow hover:underline mt-4 inline-block">
                      Browse Resources →
                    </Link>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="mr-2">🛠️</span> Tools to Learn
                    </h3>
                    <ul className="space-y-2">
                      {recommendations.tools.map((tool, idx) => (
                        <li key={idx} className="text-white/80">
                          • {tool}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="mr-2">📖</span> Reading List
                    </h3>
                    <ul className="space-y-2">
                      {recommendations.reading.map((book, idx) => (
                        <li key={idx} className="text-white/80">
                          • {book}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="mr-2">🎯</span> Interview Prep
                    </h3>
                    <ul className="space-y-2">
                      {recommendations.interview.map((item, idx) => (
                        <li key={idx} className="text-white/80">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="text-center">
                <CTA href="/programs" primary className="mr-4">
                  Explore Programs
                </CTA>
                <CTA href="/contact">
                  Book a Call
                </CTA>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
}
