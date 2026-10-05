"use strict";

const TargetEngine = {
  version: "1.0.0",

  calculate(
    entry,
    stop,
    riskRewardRatios = [
      1,
      2,
      3
    ]
  ) {
    const risk =
      Math.abs(
        entry - stop
      );

    return riskRewardRatios.map(
      (ratio) => ({
        ratio,

        price:
          entry > stop
            ? entry +
              risk * ratio
            : entry -
              risk * ratio
      })
    );
  }
};

if (typeof window !== "undefined") {
  window.TargetEngine =
    TargetEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    TargetEngine;
}
