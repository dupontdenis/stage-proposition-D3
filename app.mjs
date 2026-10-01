import { analyzeDOM } from "./domAnalyser.mjs";
import { renderHistogram } from "./d3Histogram.mjs";

// 1. Analyse du DOM → dataset
const data = analyzeDOM();

// 2. Affichage D3
renderHistogram(data);
