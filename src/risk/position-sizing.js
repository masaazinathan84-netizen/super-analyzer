"use strict";

const PositionSizing = {
  version: "1.0.0",

  calculate(
    accountSize,
    riskPercent,
    entry,
    stop
  ) {
    const riskAmount =
      accountSize *
      (riskPercent / 100);

    const riskPerUnit =
      Math.abs(
        entry - stop
      );

    if (
      riskPerUnit === 0
    ) {
      return 0;
    }

    return (
      riskAmount /
      riskPerUnit
    );
  }
};

if (typeof window !== "undefined") {
  window.PositionSizing =
    PositionSizing;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    PositionSizing;
}
