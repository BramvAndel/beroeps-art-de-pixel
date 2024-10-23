import { loadAndInitializeModel } from "./render.js";

let models = [];

let currentModel = 0;

var world = document
  .querySelector("meta[name='world']")
  .getAttribute("content");

if (world == "end") {
  models = ["enderman", "dragon"];
} else if (world == "nether") {
  models = ["blaze", "ghast"];
} else if (world == "overworld") {
  models = [
    "bee",
    "cave spider",
    "chicken",
    "cow",
    "pig",
    "sheep",
  ];
}

document.getElementById("previous").addEventListener("click", previousModel);
document.getElementById("next").addEventListener("click", nextModel);

function nextModel() {
  applyTransition();
  setTimeout(() => {
    if (currentModel < models.length - 1) {
      currentModel++;
    } else {
      currentModel = 0;
    }

    let modelPath = "../../models/" + models[currentModel] + "/";
    console.log(modelPath);
    console.log("next");
    loadAndInitializeModel(modelPath, "model-element");
    document.getElementById("model-name").innerText = models[currentModel];
    removeTransition();
  }, 500); // Match the transition duration
}

function previousModel() {
  applyTransition();
  setTimeout(() => {
    if (currentModel > 0) {
      currentModel--;
    } else {
      currentModel = models.length - 1;
    }

    let modelPath = "../../models/" + models[currentModel] + "/";
    loadAndInitializeModel(modelPath, "model-element");
    document.getElementById("model-name").innerText = models[currentModel];
    removeTransition();
  }, 500); // Match the transition duration
}

function applyTransition() {
  document.getElementById("model-element").classList.add("model-transition");
}

function removeTransition() {
  document.getElementById("model-element").classList.remove("model-transition");
}

// Initial load
loadAndInitializeModel(
  "../../models/" + models[currentModel] + "/",
  "model-element"
);
document.getElementById("model-name").innerText = models[currentModel];
