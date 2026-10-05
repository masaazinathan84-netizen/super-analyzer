"use strict";

const InvalidationEngine = {
  version: "1.0.0",

  check(
    prediction,
    currentPrice
  ) {
    if (
      !prediction ||
      prediction.invalidation ===
        null
    ) {
      return {
        invalidated: false
      };
    }

    const level =
      Number(
        prediction.invalidation
      );

    const direction =
      prediction.direction;

    const invalidated =
      direction === "bullish"
        ? currentPrice < level
        : direction === "bearish"
          ? currentPrice > level
          : false;

    return {
      invalidated,
      level,
      currentPrice
    };
  }
};

if (typeof window !== "undefined") {
  window.InvalidationEngine =
    InvalidationEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    InvalidationEngine;
      }
