"use strict";

const RiskEngine = {
  maximumRiskPerTrade: 0.01,

  maximumPortfolioRisk: 0.05,

  calculatePositionSize(data = {}) {
    const account =
      Number(data.accountBalance || 0);

    const riskPercent =
      Number(
        data.riskPercent ||
        this.maximumRiskPerTrade * 100
      );

    const entry =
      Number(data.entry || 0);

    const stop =
      Number(data.stop || 0);

    if (
      account <= 0 ||
      entry <= 0 ||
      stop <= 0 ||
      entry === stop
    ) {
      return {
        positionSize: 0,
        riskAmount: 0,
        status: "invalid_input"
      };
    }

    const riskAmount =
      account *
      (riskPercent / 100);

    const distance =
      Math.abs(entry - stop);

    return {
      riskAmount,
      stopDistance: distance,

      positionSize:
        riskAmount / distance,

      status: "calculated"
    };
  },

  validateTrade(data = {}) {
    const riskPercent =
      Number(data.riskPercent || 0);

    const hasStop =
      Number(data.stop || 0) > 0;

    return {
      approved:
        riskPercent <=
          this.maximumRiskPerTrade * 100 &&
        hasStop,

      hasStop,

      riskPercent,

      maximumRiskPercent:
        this.maximumRiskPerTrade * 100
    };
  }
};

if (typeof window !== "undefined") {
  window.RiskEngine = RiskEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = RiskEngine;
      }
