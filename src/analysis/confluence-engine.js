"use strict";

const ConfluenceEngine = {
  version: "1.0.0",

  scoreSignal(
    condition,
    weight
  ) {
    return condition
      ? weight
      : 0;
  },

  analyze(data = {}) {
    let bullish = 0;
    let bearish = 0;

    const evidence = [];

    const trend =
      data.trend || {};

    const momentum =
      data.momentum || {};

    const structure =
      data.structure || {};

    const liquidity =
      data.liquidity || {};

    const multiTimeframe =
      data.multiTimeframe || {};

    if (
      trend.supertrend &&
      trend.supertrend.direction ===
        "bullish"
    ) {
      bullish += 10;
      evidence.push(
        "Supertrend is bullish."
      );
    }

    if (
      trend.supertrend &&
      trend.supertrend.direction ===
        "bearish"
    ) {
      bearish += 10;
      evidence.push(
        "Supertrend is bearish."
      );
    }

    if (
      momentum.rsi14 !== null &&
      momentum.rsi14 > 50
    ) {
      bullish += 8;
      evidence.push(
        "RSI momentum is above 50."
      );
    }

    if (
      momentum.rsi14 !== null &&
      momentum.rsi14 < 50
    ) {
      bearish += 8;
      evidence.push(
        "RSI momentum is below 50."
      );
    }

    if (
      structure.trend ===
      "bullish"
    ) {
      bullish += 15;
      evidence.push(
        "Market structure is bullish."
      );
    }

    if (
      structure.trend ===
      "bearish"
    ) {
      bearish += 15;
      evidence.push(
        "Market structure is bearish."
      );
    }

    if (
      multiTimeframe.alignment &&
      multiTimeframe.alignment
        .direction ===
        "bullish"
    ) {
      bullish += 15;
      evidence.push(
        "Multiple timeframes align bullishly."
      );
    }

    if (
      multiTimeframe.alignment &&
      multiTimeframe.alignment
        .direction ===
        "bearish"
    ) {
      bearish += 15;
      evidence.push(
        "Multiple timeframes align bearishly."
      );
    }

    if (
      liquidity &&
      Array.isArray(
        liquidity.fairValueGaps
      )
    ) {
      liquidity.fairValueGaps.forEach(
        (gap) => {
          if (
            gap.type ===
            "bullish_fvg"
          ) {
            bullish += 3;
          }

          if (
            gap.type ===
            "bearish_fvg"
          ) {
            bearish += 3;
          }
        }
      );
    }

    const total =
      bullish + bearish;

    let direction =
      "neutral";

    if (
      bullish > bearish
    ) {
      direction = "bullish";
    }

    if (
      bearish > bullish
    ) {
      direction = "bearish";
    }

    const agreement =
      total > 0
        ? Math.max(
            bullish,
            bearish
          ) / total
        : 0;

    return {
      direction,
      bullishScore: bullish,
      bearishScore: bearish,
      agreement,
      evidence
    };
  }
};

if (typeof window !== "undefined") {
  window.ConfluenceEngine =
    ConfluenceEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    ConfluenceEngine;
      }
