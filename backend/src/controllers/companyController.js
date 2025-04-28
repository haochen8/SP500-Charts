/**
 * @file Defines the company controller.
 * @module controllers/companyController
 * @author Hao Chen
 * @version 1.0.0
 */

import { logger } from "../config/winston.js";
import { CompanyModel } from "../models/companyModel.js";
import { StockModel } from "../models/stockModel.js";

/**
 * CompanyController class
 * @class
 * @description - This class handles the company-related operations.
 */
export class CompanyController {
  /**
   * Fetches all companies from the database.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getAllCompanies(req, res, next) {
    try {
      const companies = await CompanyModel.find();
      res.status(200).json(companies);
    } catch (error) {
      logger.error("Error fetching companies: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  /**
   * Fetches paginated companies from the database.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getPaginatedCompanies(req, res, next) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const skip = (page - 1) * limit;

    try {
      const totalCompanies = await CompanyModel.countDocuments();
      const totalPages = Math.ceil(totalCompanies / limit);
      const companies = await CompanyModel.find().skip(skip).limit(limit);
      res.status(200).json({
        page,
        totalPages: totalPages,
        totalEntries: totalCompanies,
        data: companies,
      });
    } catch (error) {
      logger.error("Error fetching companies: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Fetches a company by its symbol.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getCompanySymbol(req, res, next) {
    try {
      const company = await CompanyModel.findOne({ symbol: req.params.symbol });
      if (!company) {
        return res.status(404).json({ message: "Symbol not found" });
      }
      res.status(200).json(company);
    } catch (error) {
      logger.error("Error fetching company by symbol: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Fetches a company by its sector
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getCompanySector(req, res, next) {
    try {
      const company = await CompanyModel.find({ sector: req.params.sector });
      if (!company) {
        return res.status(404).json({ message: "Sector not found" });
      }
      res.status(200).json(company);
    } catch (error) {
      logger.error("Error fetching company by sector: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  /**
   * Fetches companies data with stock data. 
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @param {Function} next - The next middleware function.
   */
  async getCompaniesWithStockData(req, res, next) {
    try {
      const validSymbols = await StockModel.distinct("symbol", {
        close: { $ne: null },
      })
      const companies = await CompanyModel.find({
        symbol: { $in: validSymbols },
      });
      res.status(200).json(companies);
    } catch (error) {
      logger.error("Error fetching companies with stock data: ", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
