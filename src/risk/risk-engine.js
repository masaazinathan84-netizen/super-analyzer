"use strict";

const RiskEngine = {
  version: "1.0.0",

  calculateTradeRisk(
    entry,
    stop,
    positionSize
  ) {
    const riskPerUnit =
      Math.abs(
        entry - stop
      );

    return (
      riskPerUnit *
      positionSize
    );
  },

  riskPercent(
    accountSize,
    riskAmount
  ) {
    if (
      accountSize <= 0
    ) {
      return 0;
    }

    return (
      riskAmount /
      accountSize *
      100
    );
  },

  validate(
    data = {}
  ) {
    const accountSize =
      Number(
        data.accountSize || 0
      );

    const riskAmount =
      Number(
        data.riskAmount || 0
      );

    const maximumRisk =
      Number(
        data.maximumRiskPercent ||
          1
      );

    const actual =
      this.riskPercent(
        accountSize,
        riskAmount
      );

    return {
      allowed:
        actual <=
        maximumRisk,

      actualRiskPercent:
        actual,

      maximumRiskPercent:
        maximumRisk
    };
  }
};

if (typeof window !== "undefined") {
  window.RiskEngine =
    RiskEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    RiskEngine;
  }
