export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  category: string;
  color: string;
  electronegativity?: number;
  valenceElectrons: number;
  period: number;
  group: number;
}

export const elements: Element[] = [
  // Period 1
  { symbol: 'H', name: 'Hydrogen', atomicNumber: 1, atomicMass: 1.008, category: 'nonmetal', color: 'chemistry-nonmetal', electronegativity: 2.2, valenceElectrons: 1, period: 1, group: 1 },
  { symbol: 'He', name: 'Helium', atomicNumber: 2, atomicMass: 4.003, category: 'noble-gas', color: 'chemistry-noble', electronegativity: 0, valenceElectrons: 2, period: 1, group: 18 },
  
  // Period 2
  { symbol: 'Li', name: 'Lithium', atomicNumber: 3, atomicMass: 6.941, category: 'alkali-metal', color: 'chemistry-alkali', electronegativity: 0.98, valenceElectrons: 1, period: 2, group: 1 },
  { symbol: 'Be', name: 'Beryllium', atomicNumber: 4, atomicMass: 9.012, category: 'alkaline-earth', color: 'chemistry-alkaline', electronegativity: 1.57, valenceElectrons: 2, period: 2, group: 2 },
  { symbol: 'B', name: 'Boron', atomicNumber: 5, atomicMass: 10.811, category: 'metalloid', color: 'chemistry-metalloid', electronegativity: 2.04, valenceElectrons: 3, period: 2, group: 13 },
  { symbol: 'C', name: 'Carbon', atomicNumber: 6, atomicMass: 12.011, category: 'nonmetal', color: 'chemistry-nonmetal', electronegativity: 2.55, valenceElectrons: 4, period: 2, group: 14 },
  { symbol: 'N', name: 'Nitrogen', atomicNumber: 7, atomicMass: 14.007, category: 'nonmetal', color: 'chemistry-nonmetal', electronegativity: 3.04, valenceElectrons: 5, period: 2, group: 15 },
  { symbol: 'O', name: 'Oxygen', atomicNumber: 8, atomicMass: 15.999, category: 'nonmetal', color: 'chemistry-nonmetal', electronegativity: 3.44, valenceElectrons: 6, period: 2, group: 16 },
  { symbol: 'F', name: 'Fluorine', atomicNumber: 9, atomicMass: 18.998, category: 'halogen', color: 'chemistry-nonmetal', electronegativity: 3.98, valenceElectrons: 7, period: 2, group: 17 },
  { symbol: 'Ne', name: 'Neon', atomicNumber: 10, atomicMass: 20.180, category: 'noble-gas', color: 'chemistry-noble', electronegativity: 0, valenceElectrons: 8, period: 2, group: 18 },
  
  // Period 3
  { symbol: 'Na', name: 'Sodium', atomicNumber: 11, atomicMass: 22.990, category: 'alkali-metal', color: 'chemistry-alkali', electronegativity: 0.93, valenceElectrons: 1, period: 3, group: 1 },
  { symbol: 'Mg', name: 'Magnesium', atomicNumber: 12, atomicMass: 24.305, category: 'alkaline-earth', color: 'chemistry-alkaline', electronegativity: 1.31, valenceElectrons: 2, period: 3, group: 2 },
  { symbol: 'Al', name: 'Aluminum', atomicNumber: 13, atomicMass: 26.982, category: 'post-transition', color: 'chemistry-metal', electronegativity: 1.61, valenceElectrons: 3, period: 3, group: 13 },
  { symbol: 'Si', name: 'Silicon', atomicNumber: 14, atomicMass: 28.086, category: 'metalloid', color: 'chemistry-metalloid', electronegativity: 1.90, valenceElectrons: 4, period: 3, group: 14 },
  { symbol: 'P', name: 'Phosphorus', atomicNumber: 15, atomicMass: 30.974, category: 'nonmetal', color: 'chemistry-nonmetal', electronegativity: 2.19, valenceElectrons: 5, period: 3, group: 15 },
  { symbol: 'S', name: 'Sulfur', atomicNumber: 16, atomicMass: 32.065, category: 'nonmetal', color: 'chemistry-nonmetal', electronegativity: 2.58, valenceElectrons: 6, period: 3, group: 16 },
  { symbol: 'Cl', name: 'Chlorine', atomicNumber: 17, atomicMass: 35.453, category: 'halogen', color: 'chemistry-nonmetal', electronegativity: 3.16, valenceElectrons: 7, period: 3, group: 17 },
  { symbol: 'Ar', name: 'Argon', atomicNumber: 18, atomicMass: 39.948, category: 'noble-gas', color: 'chemistry-noble', electronegativity: 0, valenceElectrons: 8, period: 3, group: 18 },
  
  // Period 4 (selected elements)
  { symbol: 'K', name: 'Potassium', atomicNumber: 19, atomicMass: 39.098, category: 'alkali-metal', color: 'chemistry-alkali', electronegativity: 0.82, valenceElectrons: 1, period: 4, group: 1 },
  { symbol: 'Ca', name: 'Calcium', atomicNumber: 20, atomicMass: 40.078, category: 'alkaline-earth', color: 'chemistry-alkaline', electronegativity: 1.00, valenceElectrons: 2, period: 4, group: 2 },
  { symbol: 'Fe', name: 'Iron', atomicNumber: 26, atomicMass: 55.845, category: 'transition-metal', color: 'chemistry-transition', electronegativity: 1.83, valenceElectrons: 2, period: 4, group: 8 },
  { symbol: 'Cu', name: 'Copper', atomicNumber: 29, atomicMass: 63.546, category: 'transition-metal', color: 'chemistry-transition', electronegativity: 1.90, valenceElectrons: 1, period: 4, group: 11 },
  { symbol: 'Zn', name: 'Zinc', atomicNumber: 30, atomicMass: 65.38, category: 'transition-metal', color: 'chemistry-transition', electronegativity: 1.65, valenceElectrons: 2, period: 4, group: 12 },
  { symbol: 'Br', name: 'Bromine', atomicNumber: 35, atomicMass: 79.904, category: 'halogen', color: 'chemistry-nonmetal', electronegativity: 2.96, valenceElectrons: 7, period: 4, group: 17 },
];

export const getElementBySymbol = (symbol: string): Element | undefined => {
  return elements.find(el => el.symbol === symbol);
};

export const getElementsByCategory = (category: string): Element[] => {
  return elements.filter(el => el.category === category);
};
