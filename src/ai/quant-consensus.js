"use strict";

const QuantConsensus = {
  calculate(data = {}) {
    const signals = [];

    if (data.trend) {
      signals.push(data.trend);
    }

    if (data.momentum) {
      signals.push(data.momentum);
    }

    if (data.structure) {
      signals.push(data.structure);
    }

    if (data.liquidity) {
      signals.push(data.liquidity);
    }

    let bullish = 0;
    let bearish = 0;

    signals.forEach((signal) => {
      const value =
        typeof signal === "string"
          ? signal
          : signal.direction;

      if (value === "bullish") {
        bullish += 1;
      }

      if (value === "bearish") {
        bearish += 1;
      }
    });

    let direction = "neutral";

    if (bullish > bearish) {
      direction = "bullish";
    }

    if (bearish > bullish) {
      direction = "bearish";
    }

    return {
      direction,
      bullishSignals: bullish,
      bearishSignals: bearish,
      totalSignals: signals.length
    };
  }
};

if (typeof window !== "undefined") {
  window.QuantConsensus =
    QuantConsensus;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = QuantConsensus;
    }
