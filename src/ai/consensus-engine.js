"use strict";

const ConsensusEngine = {
  version: "1.0.0",

  calculate(primary = {}, secondary = {}, quant = {}) {
    const signals = [
      primary,
      secondary,
      quant
    ];

    let bullish = 0;
    let bearish = 0;
    let neutral = 0;

    signals.forEach((signal) => {
      const direction =
        signal.direction ||
        "neutral";

      if (direction === "bullish") {
        bullish += 1;
      } else if (
        direction === "bearish"
      ) {
        bearish += 1;
      } else {
        neutral += 1;
      }
    });

    let direction = "neutral";

    if (
      bullish > bearish &&
      bullish > neutral
    ) {
      direction = "bullish";
    }

    if (
      bearish > bullish &&
      bearish > neutral
    ) {
      direction = "bearish";
    }

    const total =
      signals.length || 1;

    return {
      direction,
      bullishVotes: bullish,
      bearishVotes: bearish,
      neutralVotes: neutral,
      agreement:
        Math.max(
          bullish,
          bearish,
          neutral
        ) / total,

      components: {
        primary,
        secondary,
        quant
      }
    };
  }
};

if (typeof window !== "undefined") {
  window.ConsensusEngine =
    ConsensusEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = ConsensusEngine;
      }
