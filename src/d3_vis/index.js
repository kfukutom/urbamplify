let dataset = [];
const DATASET_PATH = "./data/nypd-dataset-extended.csv";
let law_data = {
  Felony: 0,
  Misdemeanor: 0,
  Violation: 0,
};
let location_data = {};
let crime_hourly_data = {};
let crime_victim_race = {};
let crime_share = 100;

let state = {
  s_age: "None",
  s_sex: "None",
  v_age: "None",
  v_sex: "None",
};

// Initialize Hourly Crime data structure
for (let i = 0; i < 24; i++) {
  crime_hourly_data[i] = 0;
}

// SECTION Start
window.onload = function () {
  init();
};
// Global init function
function init() {
  loadData().then((result) => {
    dataset = getSampleSizeN(result, result.length / 2);
    // dataset = result;
    preprocess(dataset);
    // initMap();
  });
}

// SECTION Pre-processing
function preprocess(new_dataset, updateMap = true) {
  resetFilters();
  filtered = new_dataset.filter(
    (row) =>
      (state.s_age != "None" ? row.SUSP_AGE_GROUP == state.s_age : row) &&
      (state.s_sex != "None" ? row.SUSP_SEX == state.s_sex : row) &&
      (state.v_age != "None" ? row.VIC_AGE_GROUP == state.v_age : row) &&
      (state.v_sex != "None" ? row.VIC_SEX == state.v_sex : row)
  );
  // Update Crime Share
  crime_share = parseInt((filtered.length / dataset.length) * 100);
  document.getElementById("crime_total_share").innerHTML = crime_share + "%";

  filtered.forEach((row) => {
    // Process Crimes by Law Category
    if (row.LAW_CAT_CD == "FELONY") {
      law_data["Felony"] += 1;
    } else if (row.LAW_CAT_CD == "MISDEMEANOR") {
      law_data["Misdemeanor"] += 1;
    } else {
      law_data["Violation"] += 1;
    }

    // Process Top Crime Locations
    if (row.PREM_TYP_DESC in location_data) {
      location_data[row.PREM_TYP_DESC] += 1;
    } else {
      location_data[row.PREM_TYP_DESC] = 0;
    }

    // Process Crime rate by hours
    if (row.CMPLNT_FR_TM in crime_hourly_data) {
      crime_hourly_data[row.CMPLNT_FR_TM] += 1;
    } else {
      crime_hourly_data[row.CMPLNT_FR_TM] = 0;
    }

    // Process Crime Victim Race

    if (row.VIC_RACE in crime_victim_race) {
      crime_victim_race[row.VIC_RACE] += 1;
    } else {
      crime_victim_race[row.VIC_RACE] = 0;
    }
  });
  updateCrimesByLawChart(law_data);
  let top_location_data = Object.keys(location_data)
    .map((key) => {
      return [key, location_data[key]];
    })
    .sort((first, second) => {
      return second[1] - first[1];
    });
  updateCrimesBylocationChart(top_location_data.slice(0, 4));
  updateCrimesByHourChart(crime_hourly_data);
  if (updateMap == true) {
    updateCrimesOnMap(filtered);
  }
}

// Loading the data in a JS Promise
function loadData() {
  return new Promise((resolve, reject) => {
    d3.csv(DATASET_PATH).then(function (data) {
      resolve(data);
    });
  });
}

function initMap() {
  const accessToken =
    "pk.eyJ1IjoiamFuYXJvc21vbmFsaWV2IiwiYSI6ImNra2lkZmFqMzAzbzEydnM2ZWpjamJ5MnMifQ.0njPGy4UD3K-ZDq3M7e9ZA";

  var map = L.map("crime_map").setView([40.73, -73.99], 12.5);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
      accessToken,
    {
      id: "mapbox/dark-v9",
      tileSize: 512,
      zoomOffset: -1,
    }
  ).addTo(map);
}

function updateSuspectAge(value) {
  state.s_age = value;
  preprocess(dataset);
}
function updateVictimAge(value) {
  state.v_age = value;
  preprocess(dataset);
}
function updateSuspectSex(value) {
  state.s_sex = value;
  preprocess(dataset);
}
function updateVictimSex(value) {
  state.v_sex = value;
  preprocess(dataset);
}
function resetFilters() {
  law_data = {
    Felony: 0,
    Misdemeanor: 0,
    Violation: 0,
  };
  location_data = {};
  for (let i = 0; i < 24; i++) {
    crime_hourly_data[i] = 0;
  }
}

// NOTE Crimes on a map
const locationMap = {
  margin: {},
  width: 0,
  height: 0,
  svg: {},
  x: {},
  xAxis: {},
  y: {},
  yAxis: {},
  dots: {},
  brushedDots: {},
  selected: true,
};
locationMap.margin = { top: 10, right: 5, bottom: 20, left: 23 };
locationMap.width =
  document.getElementById("crime_map").clientWidth -
  locationMap.margin.left -
  locationMap.margin.right;
locationMap.height =
  document.getElementById("crime_map").clientHeight -
  (locationMap.margin.top + locationMap.margin.bottom);

// NOTE Crimes by Offence Category SVG
const locationChart = {
  margin: {},
  width: 0,
  height: 0,
  svg: {},
  x: {},
  xAxis: {},
  y: {},
  yAxis: {},
};

locationChart.margin = { top: 10, right: 5, bottom: 20, left: 23 };
locationChart.width =
  document.getElementById("crimes-by-location-chart").clientWidth -
  locationChart.margin.left -
  locationChart.margin.right;
locationChart.height =
  document.getElementById("crimes-by-location-chart").clientHeight -
  (locationChart.margin.top + locationChart.margin.bottom);

// NOTE Crimes by Law Category SVG
const lawChart = {
  margin: {},
  width: 0,
  height: 0,
  svg: {},
  x: {},
  xAxis: {},
  y: {},
  yAxis: {},
};

lawChart.margin = { top: 10, right: 5, bottom: 20, left: 23 };
lawChart.width =
  document.getElementById("crimes-by-law-chart").clientWidth -
  lawChart.margin.left -
  lawChart.margin.right;
lawChart.height =
  document.getElementById("crimes-by-law-chart").clientHeight -
  lawChart.margin.top -
  lawChart.margin.bottom;

// NOTE Crime rate by hours SVG
const hourlyChart = {
  margin: {},
  width: 0,
  height: 0,
  svg: {},
  x: {},
  xAxis: {},
  y: {},
  yAxis: {},
};

hourlyChart.margin = { top: 10, right: 5, bottom: 45, left: 23 };
hourlyChart.width =
  document.getElementById("crimes-by-hour-chart").clientWidth -
  hourlyChart.margin.left -
  hourlyChart.margin.right;
hourlyChart.height =
  document.getElementById("crimes-by-hour-chart").clientHeight -
  hourlyChart.margin.top -
  hourlyChart.margin.bottom;

// Create the SVG object for Hourly Chart
hourlyChart.svg = d3
  .select("#crimes-by-hour-chart")
  .append("svg")
  .attr(
    "width",
    hourlyChart.width + hourlyChart.margin.left + hourlyChart.margin.right
  )
  .attr(
    "height",
    hourlyChart.height + hourlyChart.margin.top + hourlyChart.margin.bottom
  )
  .append("g")
  .attr(
    "transform",
    `translate(${hourlyChart.margin.left},${hourlyChart.margin.top})`
  );

// Create X axis
hourlyChart.x = d3.scaleLinear().range([0, hourlyChart.width]);
hourlyChart.xAxis = hourlyChart.svg
  .append("g")
  .attr("transform", `translate(0,${hourlyChart.height})`);

//Create Y axis
hourlyChart.y = d3.scaleLinear().range([hourlyChart.height, 0]);
hourlyChart.yAxis = hourlyChart.svg
  .append("g")
  .attr("class", "yAxis")
  .style("font-size", "9px");

// NOTE Create the SVG object for Location Chart
locationChart.svg = d3
  .select("#crimes-by-location-chart")
  .append("svg")
  .attr(
    "width",
    locationChart.width + locationChart.margin.left + locationChart.margin.right
  )
  .attr(
    "height",
    locationChart.height +
      locationChart.margin.top +
      locationChart.margin.bottom
  )
  .append("g")
  .attr(
    "transform",
    `translate(${locationChart.margin.left},${locationChart.margin.top})`
  );

// Create X axis
locationChart.x = d3.scaleBand().range([0, locationChart.width]).padding(0.2);
locationChart.xAxis = locationChart.svg
  .append("g")
  .attr("transform", `translate(0,${locationChart.height})`);

//Create Y axis
locationChart.y = d3.scaleLinear().range([locationChart.height, 0]);
locationChart.yAxis = locationChart.svg
  .append("g")
  .attr("class", "yAxis")
  .style("font-size", "9px");

// Update
function updateCrimesByHourChart(filteredData) {
  let data = [];
  for (let key in filteredData) {
    data.push({ attr: parseInt(key), value: filteredData[key] });
  }

  // data = data.slice(8).concat(data.slice(0, 8));
  // X axis
  hourlyChart.x.domain([
    0,
    d3.max(data, (d) => {
      return d.attr;
    }),
  ]);
  hourlyChart.xAxis.call(d3.axisBottom(hourlyChart.x).scale(hourlyChart.x));

  // Y axis
  hourlyChart.y.domain([0, d3.max(data, (d) => +d.value)]);
  hourlyChart.yAxis.call(
    d3.axisLeft(hourlyChart.y).tickSize(1).scale(hourlyChart.y)
  );

  // Create a update selection: bind to the new data
  const u = hourlyChart.svg.selectAll(".lineTest").data([data], function (d) {
    return d.attr;
  });

  // Update the line
  u.join("path")
    .attr("class", "lineTest")
    .attr("stroke-width", 1.5)
    .attr("stroke", "#C9BEFF")
    .transition()
    .duration(1000)
    .attr(
      "d",
      d3
        .area()
        // .curve(d3.curveCatmullRom)
        .curve(d3.curveMonotoneX)
        .x(function (d) {
          return hourlyChart.x(d.attr);
        })
        .y0(hourlyChart.y(0))
        .y1(function (d) {
          return hourlyChart.y(d.value);
        })
    )
    .attr("fill", "url(#line-gradient)")
    .attr("stroke", "#7259FF")
    .attr("stroke-width", 1.5);

  hourlyChart.svg
    .append("linearGradient")
    .attr("id", "line-gradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", hourlyChart.y(0))
    .attr("x2", 0)
    .attr("y2", hourlyChart.y(d3.max(data, (d) => +d.value)))
    .selectAll("stop")
    .data([
      { offset: "10%", color: "rgba(114, 89, 255, 0)" },
      { offset: "100%", color: "#7259FF" },
    ])
    .enter()
    .append("stop")
    .attr("offset", function (d) {
      return d.offset;
    })
    .attr("stop-color", function (d) {
      return d.color;
    });
}

// Update
function updateCrimesBylocationChart(filteredData) {
  let data = filteredData.map((entry) => {
    return { attr: entry[0], value: entry[1] };
  });
  // X axis
  locationChart.x.domain(data.map((d) => d.attr));
  locationChart.xAxis
    .transition()
    .duration(1000)
    .call(d3.axisBottom(locationChart.x));

  // Y axis
  locationChart.y.domain([0, d3.max(data, (d) => +d.value)]);
  locationChart.yAxis.call(
    d3
      .axisLeft(locationChart.y)
      .scale(locationChart.y)
      .tickSize(1)
      .tickFormat(function (d) {
        if (d / 1000 >= 1) {
          d = d / 1000 + "K";
        }
        return d;
      })
  );

  const k = locationChart.svg.selectAll("rect").data(data);
  k.join("rect")
    .attr("x", (d) => locationChart.x(d.attr))
    .attr("width", locationChart.x.bandwidth())
    .attr("fill", "#C9BEFF")
    .transition()
    .duration(1000)
    .attr("y", (d) => locationChart.y(d.value))
    .attr("height", (d) => locationChart.height - locationChart.y(d.value))
    .attr("fill", "#7259FF");
}

// Create the SVG object
lawChart.svg = d3
  .select("#crimes-by-law-chart")
  .append("svg")
  .attr("width", lawChart.width + lawChart.margin.left + lawChart.margin.right)
  .attr(
    "height",
    lawChart.height + lawChart.margin.top + lawChart.margin.bottom
  )
  .append("g")
  .attr(
    "transform",
    `translate(${lawChart.margin.left},${lawChart.margin.top})`
  );

// Create X axis
lawChart.x = d3.scaleBand().range([0, lawChart.width]).padding(0.2);
lawChart.xAxis = lawChart.svg
  .append("g")
  .attr("transform", `translate(0,${lawChart.height})`);

//Create Y axis
lawChart.y = d3.scaleLinear().range([lawChart.height, 0]);
lawChart.yAxis = lawChart.svg
  .append("g")
  .attr("class", "yAxis")
  .style("font-size", "9px");

// Update
function updateCrimesByLawChart(filteredData) {
  let data = [];
  for (let key in filteredData) {
    data.push({ attr: key, value: filteredData[key] });
  }
  // X axis
  lawChart.x.domain(data.map((d) => d.attr));
  lawChart.xAxis.call(d3.axisBottom(lawChart.x));

  // Y axis
  lawChart.y.domain([0, d3.max(data, (d) => +d.value)]);
  lawChart.yAxis
    // .transition()
    // .duration(1000)
    .call(
      d3
        .axisLeft(lawChart.y)
        .scale(lawChart.y)
        .tickSize(1)
        .tickFormat(function (d) {
          if (d / 1000 >= 1) {
            d = d / 1000 + "K";
          }
          return d;
        })
    );

  const u = lawChart.svg.selectAll("rect").data(data);
  u.join("rect")
    .attr("x", (d) => lawChart.x(d.attr))
    .attr("width", lawChart.x.bandwidth())
    .attr("fill", "#C9BEFF")
    .transition()
    .duration(1000)
    .attr("y", (d) => lawChart.y(d.value))
    .attr("height", (d) => lawChart.height - lawChart.y(d.value))
    .attr("fill", "#7259FF");
}

// NOTE Create the SVG object for Location Map
locationMap.svg = d3
  .select("#crime_map")
  .append("svg")
  .attr(
    "width",
    locationMap.width + locationMap.margin.left + locationMap.margin.right
  )
  .attr(
    "height",
    locationMap.height + locationMap.margin.top + locationMap.margin.bottom
  )
  .append("g")
  .attr(
    "transform",
    `translate(${locationMap.margin.left},${locationMap.margin.top})`
  );

// Create X axis
locationMap.x = d3.scaleLinear().range([0, locationMap.width]);
locationMap.xAxis = locationMap.svg
  .append("g")
  .attr("transform", `translate(0,${locationMap.height})`);

//Create Y axis
locationMap.y = d3.scaleLinear().range([locationMap.height, 0]);
locationMap.yAxis = locationMap.svg
  .append("g")
  .attr("class", "yAxis")
  .style("font-size", "9px");

locationMap.svg.call(
  d3
    .brush()
    .extent([
      [0, 0],
      [locationMap.width, locationMap.height],
    ])
    .on("brush start", (event, d) => {
      updateMap(event);
    })
    .on("end", updateMapBrushing)
);

// FIXME
function updateMapBrushing() {
  if (locationMap.brushedDots.data().length > 0) {
    preprocess(locationMap.brushedDots.data(), false);
  } else {
    preprocess(dataset);
  }
}

function updateMap(e) {
  locationMap.dots.attr("class", "dot-not-selected");

  if (e.selection != null) {
    locationMap.selected = true;
    const extent = e.selection;

    locationMap.brushedDots = locationMap.dots
      .filter((d) => {
        return isBrushed(
          extent,
          locationMap.x(d.X_COORD_CD),
          locationMap.y(d.Y_COORD_CD)
        );
      })
      .attr("class", "dot-selected");
  }
}

function isBrushed(location, cx, cy) {
  var x0 = location[0][0],
    x1 = location[1][0],
    y0 = location[0][1],
    y1 = location[1][1];
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
}

function updateCrimesOnMap(filteredData) {
  // let data = getSampleSizeN(filteredData, filteredData.length / 2);
  let data = filteredData;
  locationMap.x.domain([979216, 1008513]);
  locationMap.xAxis
    .transition()
    .duration(1000)
    .call(
      d3
        .axisBottom(locationMap.x)
        .scale(locationMap.x)
        .tickSize(1)
        .tickFormat(function (d) {
          if (d / 10000 >= 1) {
            d = d / 10000 + "K";
          }
          return d;
        })
    );

  // Y axis
  locationMap.y.domain([194845, 257172]);
  locationMap.yAxis
    .transition()
    .duration(1000)
    .call(
      d3
        .axisLeft(locationMap.y)
        .scale(locationMap.y)
        .tickSize(1)
        .tickFormat(function (d) {
          if (d / 10000 >= 1) {
            d = d / 10000 + "K";
          }
          return d;
        })
    );

  locationMap.svg.selectAll("circle").remove();
  locationMap.dots = locationMap.svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return locationMap.x(d.X_COORD_CD);
    })
    .attr("cy", function (d) {
      return locationMap.y(d.Y_COORD_CD);
    })
    .style("fill", "#01FA91")
    .style("opacity", "0.3")
    .attr("r", 2);
}

function getSampleSizeN(arr, n) {
  var shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, n);
}