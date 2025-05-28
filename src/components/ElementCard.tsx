'use client';

import { Element } from '@/data/elements';
import { motion } from 'framer-motion';
import { useExperimentStore } from '@/store/experimentStore';

interface ElementCardProps {
  element: Element;
  isDragging?: boolean;
}

export const ElementCard: React.FC<ElementCardProps> = ({ element, isDragging = false }) => {
  const addElement = useExperimentStore(state => state.addElement);
  
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(element));
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  const handleClick = () => {
    addElement(element);
  };
  
  return (
    <motion.div
      className={`
        relative cursor-pointer select-none p-2 rounded-lg border-2 
        transition-all duration-200 text-center min-h-[80px]
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        bg-${element.color} border-gray-300 hover:border-white
        hover:scale-105 active:scale-95
      `}
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col justify-center h-full text-white">
        <div className="text-lg font-bold">{element.symbol}</div>
        <div className="text-xs opacity-80">{element.atomicNumber}</div>
        <div className="text-xs opacity-70 truncate">{element.name}</div>
        <div className="text-xs opacity-60">{element.atomicMass.toFixed(2)}</div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg bg-white opacity-0 hover:opacity-10 transition-opacity duration-200" />
    </motion.div>
  );
};
