/**
 * @file This module seeds the database with data from CSV files.
 * @module services/seedData.js
 * @author Hao Chen
 * @version 3.1.0
 */

import fs from "fs";
import path from "path";
import csv from "csv-parser";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { connectToDatabase } from "../src/config/mongoose.js";
import { CompanyModel } from "../src/models/companyModel.js";
import { StockModel } from "../src/models/stockModel.js";
import { IndexModel } from "../src/models/indexModel.js";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
await connectToDatabase(process.env.MONGODB_URI);
console.log("Connected to MongoDB");

const safeParseFloat = (value) => {
  const parsedValue = parseFloat(value);
  return isNaN(parsedValue) ? null : parsedValue;
};

const safeParseInt = (value) => {
  const parsedValue = parseInt(value);
  return isNaN(parsedValue) ? null : parsedValue;
};

// Seed company data
const loadCompanies = () => {
  return new Promise((resolve) => {
    const companies = [];

    fs.createReadStream(path.join(__dirname, "../data/sp500_companies.csv"))
      .pipe(csv())
      .on("data", (row) => {
        companies.push({
          exchange: row.Exchange,
          symbol: row.Symbol,
          shortname: row.Shortname,
          longname: row.Longname,
          sector: row.Sector,
          industry: row.Industry,
          currentPrice: safeParseFloat(row.Currentprice),
          marketCap: safeParseFloat(row.Marketcap),
          ebitda: safeParseFloat(row.Ebitda),
          revenueGrowth: safeParseFloat(row.Revenuegrowth),
          city: row.City,
          state: row.State,
          country: row.Country,
          fullTimeEmployees: safeParseInt(row.Fulltimeemployees),
          longBusinessSummary: row.Longbusinesssummary,
          weight: safeParseFloat(row.Weight),
        });
      })
      .on("end", async () => {
        await CompanyModel.deleteMany({});
        const seededCompanies = await CompanyModel.insertMany(companies);
        console.log(`Seeded ${companies.length} companies`);
        resolve(seededCompanies);
      });
  });
};

// Seed stock data
const loadStocks = () => {
  return new Promise((resolve) => {
    const stocks = [];

    fs.createReadStream(path.join(__dirname, "../data/sp500_stocks.csv"))
      .pipe(csv())
      .on("data", (row) => {
        // Skip rows with missing data
        const close = safeParseFloat(row.Close);
        const adjClose = safeParseFloat(row["Adj Close"]);
        const open = safeParseFloat(row.Open);
        const high = safeParseFloat(row.High);
        const low = safeParseFloat(row.Low);
        const volume = safeParseInt(row.Volume);
        const date = new Date(row.Date);
        const symbol = row.Symbol;
        if (
          !symbol ||
          !date ||
          date.toString() === "Invalid Date" ||
          isNaN(close) ||
          isNaN(open) ||
          isNaN(high) ||
          isNaN(low) ||
          isNaN(volume)
        ) {
          return;
        }

        stocks.push({
          symbol,
          date,
          adjClose,
          close,
          open,
          high,
          low,
          volume,
        });
      })
      .on("end", async () => {
        await StockModel.deleteMany({});
        const seededStocks = await StockModel.insertMany(stocks);
        console.log(`Seeded ${stocks.length} stocks`);
        resolve(seededStocks);
      });
  });
};

// Seed index data
const loadIndex = () => {
  return new Promise((resolve) => {
    const indexData = [];

    fs.createReadStream(path.join(__dirname, "../data/sp500_index.csv"))
      .pipe(csv())
      .on("data", (row) => {
        indexData.push({
          date: row.Date,
          value: safeParseFloat(row["S&P500"]),
        });
      })
      .on("end", async () => {
        await IndexModel.deleteMany({});
        const seededIndex = await IndexModel.insertMany(indexData);
        console.log(`Seeded ${indexData.length} index data`);
        resolve(seededIndex);
      });
  });
};

// Main function to load data
(async () => {
  try {
    // Load data
    const companies = await loadCompanies();
    const stocks = await loadStocks();
    const indexData = await loadIndex();
    console.log("All data loaded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error loading companies data:", error);
    process.exit(1);
  }
})();
