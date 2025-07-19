import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import AppPreview from './components/AppPreview';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <Features />
      <AppPreview />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;