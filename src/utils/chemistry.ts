import { Element } from '@/data/elements';
import { Reaction } from '@/data/reactions';

export const formatChemicalFormula = (formula: string): string => {
  return formula.replace(/(\\d+)/g, '�$1');
};

export const calculateMolecularWeight = (elements: Element[]): number => {
  return elements.reduce((total, element) => total + element.atomicMass, 0);
};

export const getElementInfo = (symbol: string, elements: Element[]): Element | undefined => {
  return elements.find(el => el.symbol === symbol);
};

export const formatAtomicMass = (mass: number): string => {
  return mass.toFixed(3);
};

export const getElementsByPeriod = (period: number, elements: Element[]): Element[] => {
  return elements.filter(el => el.period === period);
};

export const getElementsByGroup = (group: number, elements: Element[]): Element[] => {
  return elements.filter(el => el.group === group);
};

export const isNobleGas = (element: Element): boolean => {
  return element.category === 'noble-gas';
};

export const isReactiveElement = (element: Element): boolean => {
  return ['alkali-metal', 'alkaline-earth', 'halogen'].includes(element.category);
};

export const predictReactivity = (elements: Element[]): string => {
  const reactiveElements = elements.filter(isReactiveElement);
  const nobleGases = elements.filter(isNobleGas);
  
  if (nobleGases.length > 0) {
    return 'Low reactivity due to noble gas presence';
  }
  
  if (reactiveElements.length >= 2) {
    return 'High reactivity expected';
  }
  
  if (reactiveElements.length === 1) {
    return 'Moderate reactivity';
  }
  
  return 'Low to moderate reactivity';
};

export const getElectronegativityDifference = (element1: Element, element2: Element): number => {
  if (!element1.electronegativity || !element2.electronegativity) return 0;
  return Math.abs(element1.electronegativity - element2.electronegativity);
};

export const predictBondType = (element1: Element, element2: Element): string => {
  const electronegativityDiff = getElectronegativityDifference(element1, element2);
  
  if (electronegativityDiff < 0.5) {
    return 'Nonpolar covalent';
  } else if (electronegativityDiff < 1.7) {
    return 'Polar covalent';
  } else {
    return 'Ionic';
  }
};

export const generateReactionConditions = (reaction: Reaction): string[] => {
  const conditions: string[] = [];
  
  if (reaction.energy === 'exothermic') {
    conditions.push('🔥 Releases heat');
  } else {
    conditions.push('❄️ Requires heat input');
  }
  
  if (reaction.type === 'combustion') {
    conditions.push('🌬️ Requires oxygen');
    conditions.push('🔥 High temperature needed');
  }
  
  if (reaction.type === 'acid-base') {
    conditions.push('💧 Occurs in solution');
    conditions.push('⚡ Fast reaction');
  }
  
  if (reaction.reactants.includes('Na') || reaction.reactants.includes('K')) {
    conditions.push('⚠️ Highly reactive');
    conditions.push('💥 May be violent');
  }
  
  return conditions;
};

export const generateSafetyWarnings = (elements: Element[]): string[] => {
  const warnings: string[] = [];
  
  elements.forEach(element => {
    switch (element.symbol) {
      case 'Na':
      case 'K':
        warnings.push(`⚠️ ${element.name} is highly reactive with water`);
        break;
      case 'Cl':
      case 'F':
        warnings.push(`☠️ ${element.name} is toxic and corrosive`);
        break;
      case 'H':
        warnings.push(`🔥 ${element.name} is highly flammable`);
        break;
      case 'O':
        warnings.push(`💨 ${element.name} supports combustion`);
        break;
    }
  });
  
  return [...new Set(warnings)]; // Remove duplicates
};

export const calculateElectronConfiguration = (atomicNumber: number): string => {
  const shells = [2, 8, 8, 18, 18, 32, 32];
  const config: string[] = [];
  let electrons = atomicNumber;
  
  for (let i = 0; i < shells.length && electrons > 0; i++) {
    const electronsInShell = Math.min(electrons, shells[i]);
    config.push(`${i + 1}s${electronsInShell > 2 ? Math.min(2, electronsInShell) : electronsInShell}`);
    electrons -= electronsInShell;
    
    if (electronsInShell > 2 && i > 0) {
      config.push(`${i + 1}p${Math.min(6, electronsInShell - 2)}`);
      if (electronsInShell > 8 && i > 1) {
        config.push(`${i + 1}d${Math.min(10, electronsInShell - 8)}`);
        if (electronsInShell > 18 && i > 2) {
          config.push(`${i + 1}f${Math.min(14, electronsInShell - 18)}`);
        }
      }
    }
  }
  
  return config.join(' ');
};

export const getPeriodicTrends = (element: Element): { [key: string]: string } => {
  return {
    'Atomic Radius': element.period < 3 ? 'Small' : element.period < 5 ? 'Medium' : 'Large',
    'Ionization Energy': element.group < 3 ? 'Low' : element.group > 16 ? 'High' : 'Medium',
    'Electronegativity': element.electronegativity && element.electronegativity > 3 ? 'High' : 
                        element.electronegativity && element.electronegativity > 2 ? 'Medium' : 'Low',
    'Metallic Character': ['alkali-metal', 'alkaline-earth', 'transition-metal'].includes(element.category) ? 'High' :
                         element.category === 'metalloid' ? 'Medium' : 'Low'
  };
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void => {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};