"use strict";

const LiquidityEngine = {
  version: "1.0.0",

  findEqualHighs(candles = [], tolerance = 0.001) {
    const levels = [];

    for (let i = 1; i < candles.length; i += 1) {
      const previous = candles[i - 1];
      const current = candles[i];

      const difference =
        Math.abs(
          current.high - previous.high
        );

      const reference =
        Math.max(
          Math.abs(current.high),
          0.00000001
        );

      if (
        difference / reference <=
        tolerance
      ) {
        levels.push({
          type: "buy_side_liquidity",
          price:
            (current.high +
              previous.high) /
            2,
          timestamp:
            current.timestamp
        });
      }
    }

    return levels;
  },

  findEqualLows(candles = [], tolerance = 0.001) {
    const levels = [];

    for (let i = 1; i < candles.length; i += 1) {
      const previous = candles[i - 1];
      const current = candles[i];

      const difference =
        Math.abs(
          current.low - previous.low
        );

      const reference =
        Math.max(
          Math.abs(current.low),
          0.00000001
        );

      if (
        difference / reference <=
        tolerance
      ) {
        levels.push({
          type: "sell_side_liquidity",
          price:
            (current.low +
              previous.low) /
            2,
          timestamp:
            current.timestamp
        });
      }
    }

    return levels;
  },

  findLiquidityLevels(candles = []) {
    return [
      ...this.findEqualHighs(candles),
      ...this.findEqualLows(candles)
    ];
  },

  findFairValueGaps(candles = []) {
    const gaps = [];

    for (
      let i = 2;
      i < candles.length;
      i += 1
    ) {
      const first = candles[i - 2];
      const third = candles[i];

      if (third.low > first.high) {
        gaps.push({
          type: "bullish_fvg",
          lower: first.high,
          upper: third.low,
          timestamp: third.timestamp
        });
      }

      if (third.high < first.low) {
        gaps.push({
          type: "bearish_fvg",
          lower: third.high,
          upper: first.low,
          timestamp: third.timestamp
        });
      }
    }

    return gaps;
  },

  analyze(candles = []) {
    return {
      liquidityLevels:
        this.findLiquidityLevels(
          candles
        ),

      fairValueGaps:
        this.findFairValueGaps(
          candles
        )
    };
  }
};

if (typeof window !== "undefined") {
  window.LiquidityEngine = LiquidityEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = LiquidityEngine;
    }
