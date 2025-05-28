'use client';

import { elements } from '@/data/elements';
import { ElementCard } from './ElementCard';
import { motion } from 'framer-motion';

export const PeriodicTable: React.FC = () => {
  // Group elements by periods for better layout
  const periods = [
    elements.filter(el => el.period === 1),
    elements.filter(el => el.period === 2),
    elements.filter(el => el.period === 3),
    elements.filter(el => el.period === 4),
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Periodic Table
      </h2>
      
      <motion.div 
        className="space-y-2"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {periods.map((period, periodIndex) => (
          <motion.div 
            key={periodIndex} 
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${Math.max(18, period.length)}, minmax(60px, 1fr))`
            }}
            variants={item}
          >
            {period.map((element, index) => {
              // Calculate grid position based on group
              const gridColumn = element.group;
              
              return (
                <div 
                  key={element.symbol}
                  style={{ gridColumn }}
                  className="flex justify-center"
                >
                  <ElementCard element={element} />
                </div>
              );
            })}
          </motion.div>
        ))}
      </motion.div>
      
      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-chemistry-alkali rounded"></div>
          <span className="text-gray-300">Alkali Metals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-chemistry-alkaline rounded"></div>
          <span className="text-gray-300">Alkaline Earth</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-chemistry-transition rounded"></div>
          <span className="text-gray-300">Transition Metals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-chemistry-nonmetal rounded"></div>
          <span className="text-gray-300">Non-metals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-chemistry-metalloid rounded"></div>
          <span className="text-gray-300">Metalloids</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-chemistry-noble rounded"></div>
          <span className="text-gray-300">Noble Gases</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-chemistry-metal rounded"></div>
          <span className="text-gray-300">Metals</span>
        </div>
      </div>
    </div>
  );
};
