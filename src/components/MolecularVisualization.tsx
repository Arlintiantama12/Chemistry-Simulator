'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useExperimentStore } from '@/store/experimentStore';

export const MolecularVisualization: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const frameRef = useRef<number>();
  
  const { currentReaction, selectedElements, showMolecularView } = useExperimentStore();
  
  useEffect(() => {
    if (!mountRef.current || !showMolecularView) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    
    mountRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Create molecules
    createMolecules(scene);
    
    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      // Rotate molecules
      scene.children.forEach(child => {
        if (child.userData.isAtom) {
          child.rotation.y += 0.01;
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [showMolecularView, currentReaction, selectedElements]);
  
  const createMolecules = (scene: THREE.Scene) => {
    // Clear previous molecules
    scene.children = scene.children.filter(child => !child.userData.isAtom && !child.userData.isBond);
    
    if (currentReaction) {
      createReactionMolecules(scene);
    } else if (selectedElements.length > 0) {
      createSelectedElementsVisualization(scene);
    }
  };
  
  const createReactionMolecules = (scene: THREE.Scene) => {
    if (!currentReaction) return;
    
    // Simple visualization for common molecules
    const moleculeVisualizations: { [key: string]: () => THREE.Group } = {
      'H2O': createWaterMolecule,
      'NaCl': createSaltMolecule,
      'CO2': createCO2Molecule,
      'HCl': createHClMolecule,
    };
    
    // Try to find a matching visualization
    for (const product of currentReaction.products) {
      const createMolecule = moleculeVisualizations[product];
      if (createMolecule) {
        const molecule = createMolecule();
        molecule.position.set(0, 0, 0);
        scene.add(molecule);
        break;
      }
    }
    
    // If no specific molecule found, create a generic representation
    if (scene.children.filter(child => child.userData.isAtom).length === 0) {
      createGenericMolecule(scene, currentReaction.products[0] || 'Unknown');
    }
  };
  
  const createSelectedElementsVisualization = (scene: THREE.Scene) => {
    selectedElements.forEach((element, index) => {
      const atom = createAtom(element.symbol, getElementColor(element.symbol));
      atom.position.set(
        (index - selectedElements.length / 2) * 3,
        0,
        0
      );
      scene.add(atom);
    });
  };
  
  const createAtom = (symbol: string, color: number): THREE.Group => {
    const group = new THREE.Group();
    group.userData.isAtom = true;
    
    // Atom sphere
    const geometry = new THREE.SphereGeometry(0.8, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
      color: color,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    group.add(sphere);
    
    // Element label
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 128;
    canvas.height = 128;
    
    context.fillStyle = 'white';
    context.font = 'bold 48px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(symbol, 64, 64);
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(1.5, 1.5, 1);
    group.add(sprite);
    
    return group;
  };
  
  const createWaterMolecule = (): THREE.Group => {
    const group = new THREE.Group();
    group.userData.isAtom = true;
    
    // Oxygen atom (red)
    const oxygen = createAtom('O', 0xff0000);
    oxygen.position.set(0, 0, 0);
    group.add(oxygen);
    
    // Hydrogen atoms (white)
    const hydrogen1 = createAtom('H', 0xffffff);
    hydrogen1.position.set(-1.5, 1, 0);
    hydrogen1.scale.setScalar(0.6);
    group.add(hydrogen1);
    
    const hydrogen2 = createAtom('H', 0xffffff);
    hydrogen2.position.set(1.5, 1, 0);
    hydrogen2.scale.setScalar(0.6);
    group.add(hydrogen2);
    
    // Bonds
    const bondGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.8);
    const bondMaterial = new THREE.MeshPhongMaterial({ color: 0x888888 });
    
    const bond1 = new THREE.Mesh(bondGeometry, bondMaterial);
    bond1.position.set(-0.75, 0.5, 0);
    bond1.rotation.z = Math.PI / 4;
    bond1.userData.isBond = true;
    group.add(bond1);
    
    const bond2 = new THREE.Mesh(bondGeometry, bondMaterial);
    bond2.position.set(0.75, 0.5, 0);
    bond2.rotation.z = -Math.PI / 4;
    bond2.userData.isBond = true;
    group.add(bond2);
    
    return group;
  };
  
  const createSaltMolecule = (): THREE.Group => {
    const group = new THREE.Group();
    group.userData.isAtom = true;
    
    // Sodium atom (yellow)
    const sodium = createAtom('Na', 0xffff00);
    sodium.position.set(-1.5, 0, 0);
    group.add(sodium);
    
    // Chlorine atom (green)
    const chlorine = createAtom('Cl', 0x00ff00);
    chlorine.position.set(1.5, 0, 0);
    group.add(chlorine);
    
    return group;
  };
  
  const createCO2Molecule = (): THREE.Group => {
    const group = new THREE.Group();
    group.userData.isAtom = true;
    
    // Carbon atom (black)
    const carbon = createAtom('C', 0x333333);
    carbon.position.set(0, 0, 0);
    group.add(carbon);
    
    // Oxygen atoms (red)
    const oxygen1 = createAtom('O', 0xff0000);
    oxygen1.position.set(-2, 0, 0);
    group.add(oxygen1);
    
    const oxygen2 = createAtom('O', 0xff0000);
    oxygen2.position.set(2, 0, 0);
    group.add(oxygen2);
    
    return group;
  };
  
  const createHClMolecule = (): THREE.Group => {
    const group = new THREE.Group();
    group.userData.isAtom = true;
    
    // Hydrogen atom (white)
    const hydrogen = createAtom('H', 0xffffff);
    hydrogen.position.set(-1, 0, 0);
    hydrogen.scale.setScalar(0.6);
    group.add(hydrogen);
    
    // Chlorine atom (green)
    const chlorine = createAtom('Cl', 0x00ff00);
    chlorine.position.set(1, 0, 0);
    group.add(chlorine);
    
    return group;
  };
  
  const createGenericMolecule = (scene: THREE.Scene, formula: string) => {
    const atom = createAtom(formula.substring(0, 2), 0x888888);
    atom.position.set(0, 0, 0);
    scene.add(atom);
  };
  
  const getElementColor = (symbol: string): number => {
    const colors: { [key: string]: number } = {
      'H': 0xffffff,  // White
      'He': 0xd9ffff, // Light cyan
      'Li': 0xcc80ff, // Light purple
      'Be': 0xc2ff00, // Light green
      'B': 0xffb5b5,  // Light pink
      'C': 0x909090,  // Gray
      'N': 0x3050f8,  // Blue
      'O': 0xff0d0d,  // Red
      'F': 0x90e050,  // Light green
      'Ne': 0xb3e3f5, // Light blue
      'Na': 0xab5cf2, // Purple
      'Mg': 0x8aff00, // Green
      'Al': 0xbfa6a6, // Light gray
      'Si': 0xf0c8a0, // Tan
      'P': 0xff8000,  // Orange
      'S': 0xffff30,  // Yellow
      'Cl': 0x1ff01f, // Green
      'Ar': 0x80d1e3, // Light blue
      'K': 0x8f40d4,  // Purple
      'Ca': 0x3dff00, // Green
      'Fe': 0xe06633, // Orange-red
      'Cu': 0xc88033, // Copper
      'Zn': 0x7d80b0, // Blue-gray
      'Br': 0xa62929, // Dark red
    };
    
    return colors[symbol] || 0x888888;
  };
  
  if (!showMolecularView) {
    return null;
  }
  
  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4">3D Molecular Visualization</h3>
      <div 
        ref={mountRef} 
        className="w-full h-96 rounded-lg bg-gray-800 border border-gray-600"
        style={{ minHeight: '300px' }}
      />
      <p className="text-gray-400 text-sm mt-2 text-center">
        {currentReaction 
          ? `Showing: ${currentReaction.name} (${currentReaction.equation})`
          : selectedElements.length > 0
            ? `Selected elements: ${selectedElements.map(el => el.symbol).join(', ')}`
            : 'Select elements to see their 3D representation'
        }
      </p>
    </div>
  );
};
