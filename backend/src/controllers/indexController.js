/**
 * @file Defines the stock controller.
 * @module controllers/indexController
 * @author Hao Chen
 * @version 1.0.0
 */

import { logger } from "../config/winston.js";
import { IndexModel } from "../models/indexModel.js";

/**
 * @class IndexController
 * @description Controller for handling index-related requests.
 */
export class IndexController {
  /**
   * @method getAllIndeces
   * @description Retrieves all indexes from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getAllIndeces(req, res, next) {
    try {
      const indexData = await IndexModel.find().sort({ date: -1 });
      res.json(indexData);
    } catch (error) {
      logger.error(`Error fetching indexes: ${error}`);
      res.status(500).json({ error: "Internal error fetching index data" });
    }
  }
  /**
   * @method getAllPaginatedIndeces
   * @description Retrieves paginated indexes from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getPaginatedIndeces(req, res, next) {
    const limit = parseInt(req.query.limit) || 500;

    try {
      const indexData = await IndexModel.find().sort({ date: -1 }).limit(limit);
      res.json(indexData);
    } catch (error) {
      logger.error(`Error fetching indexes: ${error}`);
      res.status(500).json({ error: "Internal error fetching index data" });
    }
  }
  /**
   * @method getIndexByDateRange
   * @description Retrieves indexes within a specific date range.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getIndecesByDateRange(req, res, next) {
    const { from, to } = req.query;
    const query = {};

    if (from || to) {
      query.date = {};
      if (from) {
        query.date.$gte = new Date(from);
      }
      if (to) {
        query.date.$lte = new Date(to);
      }
    }

    try {
      const indexData = await IndexModel.find(query).sort({ date: 1 });
      res.json(indexData);
    } catch (error) {
      logger.error(`Error fetching index by date range: ${error}`);
      res.status(500).json({ error: "Internal error fetching index data" });
    }
  }
}
