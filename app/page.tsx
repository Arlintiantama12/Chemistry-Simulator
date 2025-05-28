'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PeriodicTable } from '@/components/PeriodicTable';
import { ExperimentLab } from '@/components/ExperimentLab';
import { MolecularVisualization } from '@/components/MolecularVisualization';
import { useExperimentStore } from '@/store/experimentStore';
import { Beaker, Table, Atom, Info, Github, Heart } from 'lucide-react';

type ActiveTab = 'periodic' | 'lab' | 'molecules' | 'about';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('periodic');
  const selectedElements = useExperimentStore(state => state.selectedElements);
  const clearExperiment = useExperimentStore(state => state.clearExperiment);

  const tabs = [
    { id: 'periodic', label: 'Periodic Table', icon: Table, color: 'from-blue-500 to-blue-600' },
    { id: 'lab', label: 'Experiment Lab', icon: Beaker, color: 'from-green-500 to-green-600' },
    { id: 'molecules', label: 'Molecules', icon: Atom, color: 'from-purple-500 to-purple-600' },
    { id: 'about', label: 'About', icon: Info, color: 'from-orange-500 to-orange-600' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'periodic':
        return <PeriodicTable />;
      case 'lab':
        return <ExperimentLab />;
      case 'molecules':
        return <MolecularVisualization />;
      case 'about':
        return (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Chemistry Simulator
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 leading-relaxed">
                Selamat datang di Chemistry Simulator - aplikasi interaktif untuk mempelajari kimia dengan cara yang menyenangkan dan visual!
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-xl font-semibold mb-3 text-blue-400">🔬 Fitur Utama</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Tabel Periodik interaktif dengan animasi</li>
                    <li>• Laboratorium virtual untuk eksperimen</li>
                    <li>• Visualisasi molekul 3D</li>
                    <li>• Simulasi reaksi kimia</li>
                    <li>• Database lengkap unsur kimia</li>
                  </ul>
                </div>
                
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h3 className="text-xl font-semibold mb-3 text-green-400">📚 Cara Penggunaan</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Klik unsur di tabel periodik untuk memilih</li>
                    <li>• Drag & drop unsur ke laboratorium</li>
                    <li>• Lihat visualisasi molekul yang terbentuk</li>
                    <li>• Eksplorasi berbagai reaksi kimia</li>
                    <li>• Pelajari sifat-sifat unsur</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-6 rounded-lg border border-purple-500/30">
                <h3 className="text-xl font-semibold mb-3 text-purple-400">⚡ Teknologi</h3>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'React', 'TypeScript', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Zustand'].map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-center pt-6 border-t border-gray-700">
                <p className="text-gray-400 flex items-center justify-center gap-2">
                  Dibuat dengan <Heart className="text-red-500 w-4 h-4" /> untuk pendidikan kimia
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <PeriodicTable />;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Chemistry Simulator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Jelajahi dunia kimia melalui tabel periodik interaktif, visualisasi molekul, dan laboratorium virtual
          </p>
        </motion.header>

        {/* Selected Elements Display */}
        <AnimatePresence>
          {selectedElements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">
                    Selected Elements ({selectedElements.length})
                  </h3>
                  <button
                    onClick={clearExperiment}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedElements.map((element, index) => (
                    <motion.span
                      key={`${element.symbol}-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-${element.color}`}
                    >
                      {element.symbol} - {element.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Tabs */}
        <motion.nav 
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
                  ${activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </motion.nav>

        {/* Main Content */}
        <motion.main
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.main>

        {/* Footer */}
        <motion.footer 
          className="text-center mt-12 py-6 border-t border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-400">
            Chemistry Simulator © 2024 - Educational Tool for Interactive Learning
          </p>
        </motion.footer>
      </div>
    </div>
  );
}
