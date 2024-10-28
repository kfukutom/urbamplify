const DATASET_PATH = "./data/crime_data.csv";
init();

// REQUIRES: `./data/crime_data.csv` exists.
// RETURNS: Promise<dataset>  if successful, null otherwise.
function init() {
  loadData().then((result) => {
    console.log(result);
    try {
      let dataset = result;
    }
    catch (e) {
      // error in system
      console.log(e);
      return null;
    }
  });
}

// REQUIRES: `./data/crime_data.csv` exists.
function loadData() {
  // try/catch block to handle errors
  try {
    // fetch data from csv
    return new Promise((resolve, reject) => {
      d3.csv(DATASET_PATH).then((data) => {
        resolve(data);
        console.log(data); // debugging purpose
      });
    });
  }
  catch (e) {
    // error would be caught in system here.
    console.log(e);
    return null;
  }
}

// REQUIRES: `./data/crime_data.csv` exists.
// RETURNS: None
// MODIFIES: dataset
function reportSystem() {
  if (console.log(dataset)) {
    console.log("System is running properly.\n");
  }
  else {
    console.log("Error in system, please check `processing.jsx` via. `./d3_vis/processing.jsx");
    return null;
  }
}
