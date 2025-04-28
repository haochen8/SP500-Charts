/**
 * @file Defines the company model.
 * @module models/companyModel
 * @author Hao Chen
 * @version 1.0.0
 */

import mongoose from "mongoose";
import { BASE_SCHEMA } from "./baseSchema.js";

const schema = new mongoose.Schema({
  exchange: String,
  symbol: { type: String, unique: true },
  shortname: String,
  longname: String,
  sector: String,
  industry: String,
  currentPrice: Number,
  marketCap: Number,
  ebitda: Number,
  revenueGrowth: Number,
  city: String,
  state: String,
  country: String,
  fullTimeEmployees: Number,
  longBusinessSummary: String,
  weight: Number,
});

schema.add(BASE_SCHEMA);

export const CompanyModel = mongoose.model("Company", schema);