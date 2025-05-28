'use client';

import { useExperimentStore } from '@/store/experimentStore';
import { findReaction } from '@/data/reactions';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Trash2, Play, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';

export const ExperimentLab: React.FC = () => {
  const {
    selectedElements,
    currentReaction,
    isExperimenting,
    showMolecularView,
    removeElement,
    clearLab,
    performExperiment,
    toggleMolecularView,
    setExperimenting
  } = useExperimentStore();
  
  const [isDropZoneActive, setIsDropZoneActive] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropZoneActive(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropZoneActive(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropZoneActive(false);
    
    try {
      const elementData = JSON.parse(e.dataTransfer.getData('application/json'));
      useExperimentStore.getState().addElement(elementData);
    } catch (error) {
      console.error('Error parsing dropped element:', error);
    }
  };
  
  const handleExperiment = () => {
    if (selectedElements.length === 0) return;
    
    setExperimenting(true);
    
    // Simulate experiment time
    setTimeout(() => {
      const elementSymbols = selectedElements.map(el => el.symbol);
      const reaction = findReaction(elementSymbols);
      performExperiment(reaction);
    }, 2000);
  };
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Beaker className="w-6 h-6" />
          Chemistry Lab
        </h2>
        
        <div className="flex gap-2">
          <button
            onClick={toggleMolecularView}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm flex items-center gap-1 transition-colors"
          >
            {showMolecularView ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showMolecularView ? 'Hide 3D' : 'Show 3D'}
          </button>
          
          <button
            onClick={clearLab}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm flex items-center gap-1 transition-colors"
            disabled={selectedElements.length === 0}
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>
      
      {/* Drop Zone */}
      <motion.div
        className={`
          border-2 border-dashed rounded-xl p-6 min-h-[200px] mb-6 transition-all duration-300
          ${isDropZoneActive 
            ? 'border-blue-400 bg-blue-400/10' 
            : selectedElements.length > 0 
              ? 'border-gray-600 bg-gray-800/30' 
              : 'border-gray-700 bg-gray-800/20'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          scale: isDropZoneActive ? 1.02 : 1,
        }}
      >
        {selectedElements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <Beaker className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg mb-2">Drop elements here to experiment</p>
            <p className="text-sm">or click on elements from the periodic table</p>
          </div>
        ) : (
          <div>
            <h3 className="text-white text-lg mb-4">Selected Elements:</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              <AnimatePresence>
                {selectedElements.map((element, index) => (
                  <motion.div
                    key={`${element.symbol}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`
                      relative px-4 py-2 rounded-lg border-2 cursor-pointer
                      bg-${element.color} border-gray-300 hover:border-red-400
                      transition-all duration-200
                    `}
                    onClick={() => removeElement(element.symbol)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-white text-center">
                      <div className="font-bold text-lg">{element.symbol}</div>
                      <div className="text-xs opacity-80">{element.name}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Experiment Button */}
            <button
              onClick={handleExperiment}
              disabled={isExperimenting || selectedElements.length === 0}
              className={`
                w-full py-3 rounded-lg font-semibold text-white transition-all duration-300
                flex items-center justify-center gap-2
                ${isExperimenting 
                  ? 'bg-yellow-600 cursor-wait' 
                  : 'bg-green-600 hover:bg-green-700 active:scale-95'
                }
              `}
            >
              {isExperimenting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Experimenting...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Start Experiment
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
      
      {/* Results */}
      <AnimatePresence>
        {currentReaction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-xl p-6 border border-green-700"
          >
            <h3 className="text-xl font-bold text-white mb-4">Reaction Result:</h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-green-400 font-semibold">Reaction: </span>
                <span className="text-white">{currentReaction.name}</span>
              </div>
              
              <div>
                <span className="text-green-400 font-semibold">Equation: </span>
                <span className="text-white font-mono">{currentReaction.balancedEquation}</span>
              </div>
              
              <div>
                <span className="text-green-400 font-semibold">Type: </span>
                <span className="text-white capitalize">{currentReaction.type}</span>
              </div>
              
              <div>
                <span className="text-green-400 font-semibold">Energy: </span>
                <span className={`font-semibold ${
                  currentReaction.energy === 'exothermic' ? 'text-red-400' : 'text-blue-400'
                }`}>
                  {currentReaction.energy === 'exothermic' ? '🔥 Exothermic' : '❄️ Endothermic'}
                </span>
              </div>
              
              {currentReaction.conditions && (
                <div>
                  <span className="text-green-400 font-semibold">Conditions: </span>
                  <span className="text-white">{currentReaction.conditions}</span>
                </div>
              )}
              
              <div className="pt-2">
                <span className="text-green-400 font-semibold">Description: </span>
                <p className="text-gray-300 mt-1">{currentReaction.description}</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {!currentReaction && selectedElements.length > 0 && !isExperimenting && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-xl p-6 border border-yellow-700"
          >
            <h3 className="text-xl font-bold text-white mb-2">No Reaction Found</h3>
            <p className="text-gray-300">
              The selected elements don't form a known reaction in our database. 
              Try different combinations or add more elements!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
