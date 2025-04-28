/**
 * @file Defines the stock Router
 * @module routes/api/stockRouter
 * @author Hao Chen
 * @version 1.0.0
 */

import express from "express";
import { StockController } from "../../controllers/stockController.js";

export const router = express.Router();
const controller = new StockController();

// Stock routes
router.get("/", (req, res, next) => {
  controller.getAllStocks(req, res, next);
});
router.get("/paginated", (req, res, next) => {
  controller.getPaginatedStocks(req, res, next);
});
router.get("/symbols", (req, res, next) => {
  controller.getAvailableStockSymbols(req, res, next);
});
router.get("/symbol/:symbol", (req, res, next) => {
  controller.getStockBySymbol(req, res, next);
});
router.get("/symbol/:symbol/paginated", (req, res, next) => {
  controller.getPaginatedStocksBySymbol(req, res, next);
});

