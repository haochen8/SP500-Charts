/**
 * @file Defines the stock controller.
 * @module controllers/stockController
 * @author Hao Chen
 * @version 1.0.0
 */

import { logger } from "../config/winston.js";
import { StockModel } from "../models/stockModel.js";

/**
 * @class StockController
 * @classdesc Controller for handling stock data.
 */
export class StockController {
  /**
   * @method getAllStocks
   * @description Get all stocks from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getAllStocks(req, res, next) {
    try {
      const stocks = await StockModel.find().sort({ date: -1 });
      res.json(stocks);
    } catch (error) {
      logger.error(`Error fetching stocks: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @method getAllPaginatedStocks
   * @description Get paginated stocks from the database.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getPaginatedStocks(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;
    try {
      const totalStocks = await StockModel.countDocuments();
      const stocks = await StockModel.find()
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
      const totalPages = Math.ceil(totalStocks / limit);
      res.json({
        page,
        totalPages,
        totalEntries: totalStocks,
        data: stocks,
      });
    } catch (error) {
      logger.error(`Error fetching stocks: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @method getStockBySymbol
   * @description Get a stock by its symbol.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getStockBySymbol(req, res, next) {
    const symbol = req.params.symbol.toUpperCase();
    try {
      const stocks = await StockModel.find({ symbol }).sort({ date: -1 });
      if (stocks.length === 0) {
        return res.status(404).json({ message: "Stock not found" });
      }
      res.json(stocks);
    } catch (error) {
      logger.error(`Error fetching stock by symbol: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  /**
   * @method getPaginatedStocksBySymbol
   * @description Get paginated stocks by symbol.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getPaginatedStocksBySymbol(req, res, next) {
    const symbol = req.params.symbol.toUpperCase();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;
    try {
      const totalStocks = await StockModel.countDocuments({ symbol });
      const stocks = await StockModel.find({ symbol })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);
      const totalPages = Math.ceil(totalStocks / limit);
      res.json({
        page,
        totalPages,
        totalEntries: totalStocks,
        data: stocks,
      });
    } catch (error) {
      logger.error(`Error fetching stocks by symbol: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  /**
   * @method getAvailableStockSymbols
   * @description Get all available stock symbols.
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getAvailableStockSymbols(req, res, next) {
    try {
      const symbols = await StockModel.distinct("symbol");
      res.json(symbols);
    } catch (error) {
      logger.error(`Error fetching available stock symbols: ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
