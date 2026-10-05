"use strict";

const MacroEngine = {
  analyze(data = {}) {
    const factors = [
      "interestRates",
      "inflation",
      "employment",
      "gdp",
      "centralBankPolicy",
      "bondYields",
      "currencyStrength",
      "commodityPrices",
      "geopoliticalRisk"
    ];

    const available =
      factors.filter(
        (factor) =>
          data[factor] !== undefined
      );

    return {
      timestamp: Date.now(),
      availableFactors: available,
      missingFactors:
        factors.filter(
          (factor) =>
            data[factor] === undefined
        ),
      status:
        available.length
          ? "partial"
          : "awaiting_data"
    };
  }
};

if (typeof window !== "undefined") {
  window.MacroEngine = MacroEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = MacroEngine;
        }
