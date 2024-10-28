let dataset = [];
const DATA_PATH = "data/crime_data.csv";

// Chicago Script
let law_data = {
  Felony: 0,
  Misdemenao: 0,
  Violation: 0,
};

let locatioo_data = {}
let crime_hourly_data = {}
let crime_monthly_data = {}
let crime_share = {}

let state = {
  s_age: "None",
  s_sex: "None",
}