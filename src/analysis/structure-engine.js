"use strict";

const StructureEngine = {
  version: "1.0.0",

  findSwingPoints(candles = [], strength = 2) {
    const highs = [];
    const lows = [];

    for (
      let i = strength;
      i < candles.length - strength;
      i += 1
    ) {
      const current = candles[i];

      let isHigh = true;
      let isLow = true;

      for (
        let j = i - strength;
        j <= i + strength;
        j += 1
      ) {
        if (j === i) {
          continue;
        }

        if (
          candles[j].high >= current.high
        ) {
          isHigh = false;
        }

        if (
          candles[j].low <= current.low
        ) {
          isLow = false;
        }
      }

      if (isHigh) {
        highs.push({
          index: i,
          price: current.high,
          timestamp: current.timestamp
        });
      }

      if (isLow) {
        lows.push({
          index: i,
          price: current.low,
          timestamp: current.timestamp
        });
      }
    }

    return {
      highs,
      lows
    };
  },

  classifyTrend(candles = []) {
    const swings =
      this.findSwingPoints(candles);

    const highs = swings.highs;
    const lows = swings.lows;

    if (
      highs.length < 2 ||
      lows.length < 2
    ) {
      return "insufficient_data";
    }

    const previousHigh =
      highs[highs.length - 2].price;

    const latestHigh =
      highs[highs.length - 1].price;

    const previousLow =
      lows[lows.length - 2].price;

    const latestLow =
      lows[lows.length - 1].price;

    if (
      latestHigh > previousHigh &&
      latestLow > previousLow
    ) {
      return "bullish";
    }

    if (
      latestHigh < previousHigh &&
      latestLow < previousLow
    ) {
      return "bearish";
    }

    return "range";
  },

  analyze(candles = []) {
    const swings =
      this.findSwingPoints(candles);

    return {
      trend: this.classifyTrend(candles),
      swingHighs: swings.highs,
      swingLows: swings.lows,
      latestHigh:
        swings.highs.length > 0
          ? swings.highs[
              swings.highs.length - 1
            ]
          : null,
      latestLow:
        swings.lows.length > 0
          ? swings.lows[
              swings.lows.length - 1
            ]
          : null
    };
  }
};

if (typeof window !== "undefined") {
  window.StructureEngine = StructureEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = StructureEngine;
          }
