import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Sparkles, Brain, ArrowRight } from 'lucide-react';

const VoiceWave = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-32 h-32 rounded-full border-2 border-purple-500/30"
    initial={{ scale: 0, opacity: 0.8 }}
    animate={{ 
      scale: [0, 1.5, 2],
      opacity: [0.8, 0.4, 0]
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeOut"
    }}
  />
);

const FloatingParticle = ({ delay, x, y }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [0, -100],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeOut"
    }}
  />
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle 
          key={i}
          delay={i * 0.5}
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Voice recording animation */}
          <div className="relative flex justify-center mb-12">
            <div className="relative">
              <VoiceWave delay={0} />
              <VoiceWave delay={1} />
              <VoiceWave delay={2} />
              <motion.div
                className="relative z-10 w-20 h-20 bg-gradient-to-br from-purple-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.4)",
                    "0 0 40px rgba(168, 85, 247, 0.6)",
                    "0 0 20px rgba(168, 85, 247, 0.4)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mic className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Your Mind,{' '}
            <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              Amplified
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Transform spontaneous thoughts into actionable insights with AI-powered voice journaling. 
            Discover patterns, track growth, and unlock your inner wisdom.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white text-lg font-semibold rounded-full flex items-center space-x-2 shadow-lg transition-all duration-300"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800/50 text-white text-lg font-semibold rounded-full border border-slate-600 hover:border-slate-500 transition-all duration-300 backdrop-blur-sm"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16 flex justify-center items-center space-x-8 text-slate-400"
          >
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Coming Soon</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-teal-400" />
              <span>Early Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mic className="w-5 h-5 text-coral-400" />
              <span>Be First to Know</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;