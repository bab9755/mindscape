import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const screenshots = [
  {
    id: 1,
    title: "Voice Recording",
    description: "Simple, intuitive recording interface",
    image: "https://images.pexels.com/photos/4386346/pexels-photo-4386346.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    title: "AI Insights",
    description: "Discover patterns in your thoughts",
    image: "https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 3,
    title: "Personal Dashboard",
    description: "Track your mindful journey",
    image: "https://images.pexels.com/photos/6249581/pexels-photo-6249581.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

const AppPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
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
            Experience{' '}
            <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              Mindscape
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A beautifully crafted interface that makes voice journaling feel natural and inspiring.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Phone mockup with carousel */}
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-80 h-[640px] bg-slate-900 rounded-[3rem] p-2 shadow-2xl border-8 border-slate-700"
              >
                <div className="w-full h-full bg-slate-800 rounded-[2.5rem] overflow-hidden relative">
                  {/* Status bar */}
                  <div className="absolute top-0 left-0 right-0 h-12 bg-slate-900 z-10 flex items-center justify-between px-6">
                    <span className="text-white font-semibold">4:19</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full" />
                      <div className="w-8 h-4 bg-white rounded-sm" />
                    </div>
                  </div>

                  {/* Screenshot carousel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 pt-12"
                    >
                      <div className="p-6 h-full">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {screenshots[currentIndex].title}
                          </h3>
                          <p className="text-slate-400 mb-8">
                            {screenshots[currentIndex].description}
                          </p>
                        </div>
                        
                        {/* Mock interface elements */}
                        {currentIndex === 0 && (
                          <div className="flex flex-col items-center space-y-8">
                            <div className="text-center">
                              <div className="text-4xl font-bold text-white mb-2">0:02</div>
                              <div className="text-slate-400">Recording your thoughts...</div>
                            </div>
                            <div className="relative">
                              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-teal-600 rounded-full flex items-center justify-center">
                                <div className="w-8 h-8 bg-white rounded-sm"></div>
                              </div>
                              <motion.div
                                className="absolute inset-0 border-2 border-purple-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </div>
                            <div className="text-slate-400 text-center">Tap to stop</div>
                          </div>
                        )}

                        {currentIndex === 1 && (
                          <div className="space-y-6">
                            <div className="bg-purple-600 rounded-2xl p-4">
                              <div className="flex justify-between text-white text-sm mb-2">
                                <span>7 Entries</span>
                                <span>24m Total</span>
                                <span>85% Positive</span>
                              </div>
                              <div className="text-white text-sm">
                                You've been particularly focused on mindfulness and personal growth this week.
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-slate-700 rounded-xl p-3 text-center">
                                <div className="text-purple-400 text-lg font-bold">Mindfulness</div>
                                <div className="text-slate-400 text-sm">5 mentions</div>
                              </div>
                              <div className="bg-slate-700 rounded-xl p-3 text-center">
                                <div className="text-teal-400 text-lg font-bold">Goals</div>
                                <div className="text-slate-400 text-sm">3 mentions</div>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentIndex === 2 && (
                          <div className="space-y-6">
                            <div className="text-white text-lg">Good Evening</div>
                            <div className="text-slate-400">Ready to explore your mind?</div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-4 text-center text-white">
                                Start Recording
                              </div>
                              <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-4 text-center text-white">
                                Schedule Reflection
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-slate-700 rounded-lg p-3 text-center">
                                <div className="text-white text-xl font-bold">7</div>
                                <div className="text-slate-400 text-xs">Entries This Week</div>
                              </div>
                              <div className="bg-slate-700 rounded-lg p-3 text-center">
                                <div className="text-white text-xl font-bold">3</div>
                                <div className="text-slate-400 text-xs">Goals Tracked</div>
                              </div>
                              <div className="bg-slate-700 rounded-lg p-3 text-center">
                                <div className="text-white text-xl font-bold">85%</div>
                                <div className="text-slate-400 text-xs">Positive Sentiment</div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {screenshots.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex ? 'bg-purple-400' : 'bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Preview{' '}
                <span className="bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
                  Designed for Clarity
                </span>
              </h3>
              <p className="text-slate-300 text-lg leading-relaxed">
                Every screen is crafted with intention, removing distractions and 
                focusing on what matters most—your thoughts and growth.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Ambient Animations</h4>
                  <p className="text-slate-400">Subtle movements that enhance focus without distraction.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Tactile Interactions</h4>
                  <p className="text-slate-400">Every tap and swipe feels natural and responsive.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-coral-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Mindful Design</h4>
                  <p className="text-slate-400">Colors and layouts chosen to promote calm and reflection.</p>
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">
              Get a sneak peek at the beautifully crafted interface that will make voice journaling feel natural and inspiring.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppPreview;