"use strict";

const MultiTimeframeEngine = {
  version: "1.0.0",

  timeframeOrder: [
    "1m",
    "3m",
    "5m",
    "15m",
    "30m",
    "1h",
    "2h",
    "4h",
    "6h",
    "12h",
    "1d",
    "1w",
    "1M"
  ],

  analyze(timeframeData = {}) {
    const results = [];

    for (const timeframe of this.timeframeOrder) {
      const data =
        timeframeData[timeframe];

      if (!data) {
        continue;
      }

      results.push({
        timeframe,
        trend:
          data.trend ||
          "unknown",
        momentum:
          data.momentum ||
          "unknown",
        structure:
          data.structure ||
          "unknown",
        liquidity:
          data.liquidity ||
          "unknown"
      });
    }

    return {
      timeframes: results,
      alignment:
        this.calculateAlignment(results)
    };
  },

  calculateAlignment(results = []) {
    if (results.length === 0) {
      return {
        direction: "neutral",
        score: 0
      };
    }

    let bullish = 0;
    let bearish = 0;

    results.forEach((item) => {
      if (item.trend === "bullish") {
        bullish += 1;
      }

      if (item.trend === "bearish") {
        bearish += 1;
      }
    });

    const total =
      bullish + bearish;

    if (total === 0) {
      return {
        direction: "neutral",
        score: 0
      };
    }

    if (bullish > bearish) {
      return {
        direction: "bullish",
        score: bullish / total
      };
    }

    if (bearish > bullish) {
      return {
        direction: "bearish",
        score: bearish / total
      };
    }

    return {
      direction: "neutral",
      score: 0.5
    };
  }
};

if (typeof window !== "undefined") {
  window.MultiTimeframeEngine =
    MultiTimeframeEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = MultiTimeframeEngine;
  }
