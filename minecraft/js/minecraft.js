import { loadAndInitializeModel } from './render.js';
  
  document.addEventListener('DOMContentLoaded', () => {
    const modelPath = '../models/steve/';
    const containerId = 'steveModel';
    
    loadAndInitializeModel(modelPath, containerId);
  });