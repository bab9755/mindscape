import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Bell } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500/10 to-teal-500/10" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Be the First to Experience{' '}
            <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              Mindscape
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Get early access to the future of voice journaling. Be notified when we launch and receive exclusive beta access.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-md mx-auto mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-slate-800/50 text-white placeholder-slate-400 rounded-full border border-slate-600 focus:border-purple-500 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              />
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px rgba(168, 85, 247, 0.4)" 
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-teal-600 text-white text-lg font-semibold rounded-full flex items-center space-x-2 shadow-2xl transition-all duration-300 whitespace-nowrap"
              >
                <Mail className="w-5 h-5" />
                <span>Join Waitlist</span>
              </motion.button>
            </div>
            <p className="text-slate-400 text-sm mt-3 text-center">
              No spam, just updates on our launch. Unsubscribe anytime.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center items-center space-x-8 text-slate-400"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">2,500+</div>
              <div className="text-sm">Waitlist Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Q2 2025</div>
              <div className="text-sm">Expected Launch</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">iOS & Android</div>
              <div className="text-sm">Both Platforms</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-12 p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 max-w-2xl mx-auto"
          >
            <p className="text-slate-300 italic text-lg">
              "I can't wait for Mindscape to launch. The concept of AI-powered voice journaling 
              is exactly what I've been looking for to deepen my self-reflection practice."
            </p>
            <div className="mt-4 text-slate-400">
              — Sarah K., Beta Tester
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;