/**
 * @file Defines the stock model.
 * @module models/stockModel
 * @author Hao Chen
 * @version 1.0.0
 */

import mongoose from "mongoose";
import { BASE_SCHEMA } from "./baseSchema.js";

const schema = new mongoose.Schema({
  date: Date,
  symbol: String,
  adjClose: Number,
  close: Number,
  high: Number,
  low: Number,
  open: Number,
  volume: Number,
});

schema.add(BASE_SCHEMA);

export const StockModel = mongoose.model("Stock", schema);