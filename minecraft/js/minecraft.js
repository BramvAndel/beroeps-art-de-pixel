import { loadAndInitializeModel } from '../js/render.js';
  
  document.addEventListener('DOMContentLoaded', () => {
    // Specify the model path and container ID
    const modelPath = '../models/steve/';
    const containerId = 'steveModel';
    
    // Call the function to load and initialize the model
    loadAndInitializeModel(modelPath, containerId);
  });