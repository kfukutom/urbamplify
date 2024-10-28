//import { init, loadData } from "./processing.jsx";

let dataset = [];
const DATASET_PATH = "./data/crime_data.csv";

// Data Initialization for D3.js
let law_data = { Felony: 0, Misdemeanor: 0, Violation: 0 };
let location_data = {};
let crime_hourly_data = Array(24).fill(0);  // use an array substitute.
let crime_victim_race = {};
let crime_share = 100;

const state = {
  s_age: "None",
  s_sex: "None",
  v_age: "None",
  v_sex: "None",
};

// Initializing on Window Load
window.onload = init;

// Global Initialization Variable
async function init() {
  try {
    const result = await loadData();
    dataset = getSampleSizeN(result, result.length / 2);
    preprocess(dataset);
    console.log("Data has been loaded successfully.");
  } catch (e) {
    console.error("Error in loading data:", e);
  }
}

// Preprocess data based on filters
function preprocess(data, updateMap = true) {
  resetFilters();
  const filtered = data.filter((row) =>
    ["s_age", "s_sex", "v_age", "v_sex"].every(
      (key) => state[key] === "None" || row[key.toUpperCase()] === state[key]
    )
  );

  // Update crime share and display it
  crime_share = Math.floor((filtered.length / dataset.length) * 100);
  document.getElementById("crime_total_share").textContent = `${crime_share}%`;

  // Aggregate law data counts
  law_data = filtered.reduce(
    (acc, row) => {
      if (row.LAW_CAT_CD in acc) acc[row.LAW_CAT_CD]++;
      return acc;
    },
    { Felony: 0, Misdemeanor: 0, Violation: 0 }
  );
}
