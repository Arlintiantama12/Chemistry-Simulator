import { create } from 'zustand';
import { Element } from '@/data/elements';
import { Reaction } from '@/data/reactions';

export interface ExperimentState {
  // Selected elements for experiment
  selectedElements: Element[];
  
  // Current reaction result
  currentReaction: Reaction | null;
  
  // Experiment history
  experimentHistory: {
    id: string;
    timestamp: Date;
    elements: Element[];
    reaction: Reaction | null;
    result: string;
  }[];
  
  // Lab state
  isExperimenting: boolean;
  showMolecularView: boolean;
  
  // Actions
  addElement: (element: Element) => void;
  removeElement: (elementSymbol: string) => void;
  clearLab: () => void;
  performExperiment: (reaction: Reaction | null) => void;
  toggleMolecularView: () => void;
  setExperimenting: (state: boolean) => void;
}

export const useExperimentStore = create<ExperimentState>((set, get) => ({
  selectedElements: [],
  currentReaction: null,
  experimentHistory: [],
  isExperimenting: false,
  showMolecularView: false,
  
  addElement: (element: Element) => {
    const { selectedElements } = get();
    
    // Limit to 5 elements for simplicity
    if (selectedElements.length >= 5) return;
    
    set({
      selectedElements: [...selectedElements, element]
    });
  },
  
  removeElement: (elementSymbol: string) => {
    const { selectedElements } = get();
    const elementIndex = selectedElements.findIndex(el => el.symbol === elementSymbol);
    
    if (elementIndex !== -1) {
      const newElements = [...selectedElements];
      newElements.splice(elementIndex, 1);
      
      set({
        selectedElements: newElements,
        currentReaction: null
      });
    }
  },
  
  clearLab: () => {
    set({
      selectedElements: [],
      currentReaction: null,
      isExperimenting: false
    });
  },
  
  performExperiment: (reaction: Reaction | null) => {
    const { selectedElements, experimentHistory } = get();
    
    // Create experiment record
    const experimentRecord = {
      id: Date.now().toString(),
      timestamp: new Date(),
      elements: [...selectedElements],
      reaction,
      result: reaction ? 
        `${reaction.name}: ${reaction.equation}` : 
        'No reaction found for these elements'
    };
    
    set({
      currentReaction: reaction,
      experimentHistory: [experimentRecord, ...experimentHistory.slice(0, 9)], // Keep last 10
      isExperimenting: false
    });
  },
  
  toggleMolecularView: () => {
    set(state => ({
      showMolecularView: !state.showMolecularView
    }));
  },
  
  setExperimenting: (state: boolean) => {
    set({ isExperimenting: state });
  }
}));
