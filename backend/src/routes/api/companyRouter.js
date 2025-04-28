/**
 * @file Defines the company Router
 * @module routes/api/companyRouter
 * @author Hao Chen
 * @version 1.0.0
 */

import express from "express";
import { CompanyController } from "../../controllers/companyController.js";

export const router = express.Router();
const controller = new CompanyController();

// Company routes
router.get("/", (req, res, next) => {
  controller.getAllCompanies(req, res, next);
});
router.get("/paginated", (req, res, next) => {
  controller.getPaginatedCompanies(req, res, next);
});
router.get("/symbol/:symbol", (req, res, next) => {
  controller.getCompanySymbol(req, res, next);
});
router.get("/sector/:sector", (req, res, next) => {
  controller.getCompanySector(req, res, next);
});
router.get("/valid", (req, res, next) => {
  controller.getCompaniesWithStockData(req, res, next);
});
