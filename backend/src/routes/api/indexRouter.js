/**
 * @file Defines the index Router
 * @module routes/api/indexRouter
 * @author Hao Chen
 * @version 1.0.0
 */

import express from "express";
import { IndexController } from "../../controllers/indexController.js";

export const router = express.Router();
const controller = new IndexController();
// Index routes
router.get("/", (req, res, next) => {
  controller.getAllIndeces(req, res, next);
});
router.get("/paginated", (req, res, next) => {
  controller.getPaginatedIndeces(req, res, next);
});
router.get("/range", (req, res, next) => {
  controller.getIndecesByDateRange(req, res, next);
});
