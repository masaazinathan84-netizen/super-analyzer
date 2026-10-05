"use strict";

const PortfolioRisk = {
  version: "1.0.0",

  calculate(
    accountSize,
    positions = []
  ) {
    let totalRisk = 0;

    positions.forEach(
      (position) => {
        totalRisk +=
          Number(
            position.riskAmount ||
              0
          );
      }
    );

    const percentage =
      accountSize > 0
        ? (totalRisk /
            accountSize) *
          100
        : 0;

    return {
      totalRisk,
      riskPercent:
        percentage,

      status:
        percentage <= 5
          ? "within_limit"
          : "above_limit"
    };
  }
};

if (typeof window !== "undefined") {
  window.PortfolioRisk =
    PortfolioRisk;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    PortfolioRisk;
      }
