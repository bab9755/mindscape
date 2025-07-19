import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Brain, Target, Calendar, TrendingUp, Heart } from 'lucide-react';

const features = [
  {
    icon: Mic,
    title: "One-Tap Recording",
    description: "Capture thoughts instantly with seamless voice recording. No typing, no barriers—just pure expression.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced speech-to-text with emotional tone analysis and theme clustering to unlock deeper insights.",
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: Target,
    title: "Smart Suggestions",
    description: "Receive personalized prompts, curated content, and habit recommendations based on your patterns.",
    color: "from-coral-500 to-coral-600"
  },
  {
    icon: Calendar,
    title: "Reflection Scheduling",
    description: "Set gentle reminders for mindful moments and build a sustainable journaling practice.",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: TrendingUp,
    title: "Growth Tracking",
    description: "Weekly mind reviews show your personal evolution and emotional patterns over time.",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: Heart,
    title: "Mindful Design",
    description: "Clean, distraction-free interface with soothing animations designed for focus and calm.",
    color: "from-rose-500 to-rose-600"
  }
];

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group"
    >
      <div className="h-full p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
        <motion.div
          className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}
          whileHover={{ rotate: 10, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
        
        <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
          {feature.title}
        </h3>
        
        <p className="text-slate-400 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-teal-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful Features for{' '}
            <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              Mindful Growth
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Every feature is designed to help you connect with your thoughts, 
            understand your patterns, and take meaningful action.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;