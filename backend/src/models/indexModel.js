/**
 * @file Defines the index model.
 * @module models/indexModel
 * @author Hao Chen
 * @version 1.0.0
 */

import mongoose from "mongoose";
import { BASE_SCHEMA } from "./baseSchema.js";

const schema = new mongoose.Schema({
  date: Date,
  value: Number, // "S&P500" column
});

schema.add(BASE_SCHEMA);

export const IndexModel = mongoose.model("Index", schema);