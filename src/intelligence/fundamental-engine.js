"use strict";

const FundamentalEngine = {
  version: "1.0.0",

  analyze(data = {}) {
    const factors = [];

    if (data.earnings) {
      factors.push({
        category: "earnings",
        value: data.earnings
      });
    }

    if (data.revenueGrowth !== undefined) {
      factors.push({
        category: "revenue_growth",
        value: data.revenueGrowth
      });
    }

    if (data.profitMargin !== undefined) {
      factors.push({
        category: "profit_margin",
        value: data.profitMargin
      });
    }

    if (data.debt !== undefined) {
      factors.push({
        category: "debt",
        value: data.debt
      });
    }

    if (data.valuation !== undefined) {
      factors.push({
        category: "valuation",
        value: data.valuation
      });
    }

    return {
      symbol: data.symbol || null,
      factors,
      status:
        factors.length
          ? "analyzed"
          : "awaiting_data"
    };
  }
};

if (typeof window !== "undefined") {
  window.FundamentalEngine =
    FundamentalEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = FundamentalEngine;
        }
