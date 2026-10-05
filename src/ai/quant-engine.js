"use strict";

const QuantEngine = {
  version: "1.0.0",

  scoreTrend(trend) {
    if (trend === "bullish") {
      return 100;
    }

    if (trend === "bearish") {
      return 0;
    }

    return 50;
  },

  scoreRSI(rsi) {
    if (rsi === null) {
      return 50;
    }

    if (rsi >= 70) {
      return 45;
    }

    if (rsi <= 30) {
      return 55;
    }

    return rsi;
  },

  scoreVolatility(
    regime
  ) {
    if (regime === "high") {
      return 40;
    }

    if (regime === "low") {
      return 60;
    }

    return 50;
  },

  calculate(data = {}) {
    const trend =
      data.trend || {};

    const momentum =
      data.momentum || {};

    const volatility =
      data.volatility || {};

    const structure =
      data.structure || {};

    const trendScore =
      this.scoreTrend(
        structure.trend ||
          "neutral"
      );

    const rsiScore =
      this.scoreRSI(
        momentum.rsi14
      );

    const volatilityScore =
      this.scoreVolatility(
        volatility.regime
      );

    const score =
      trendScore * 0.4 +
      rsiScore * 0.35 +
      volatilityScore * 0.25;

    let direction =
      "neutral";

    if (score >= 60) {
      direction = "bullish";
    }

    if (score <= 40) {
      direction = "bearish";
    }

    return {
      score,
      direction,
      components: {
        trendScore,
        rsiScore,
        volatilityScore
      }
    };
  }
};

if (typeof window !== "undefined") {
  window.QuantEngine =
    QuantEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    QuantEngine;
      }
