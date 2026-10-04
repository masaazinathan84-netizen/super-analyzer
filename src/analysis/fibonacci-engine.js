"use strict";

const FibonacciEngine = {
  version: "1.0.0",

  retracementRatios: [
    0,
    0.236,
    0.382,
    0.5,
    0.618,
    0.786,
    1
  ],

  extensionRatios: [
    1.272,
    1.414,
    1.618,
    2,
    2.618
  ],

  calculateRetracement(
    high,
    low
  ) {
    const range =
      high - low;

    const levels = {};

    this.retracementRatios.forEach(
      (ratio) => {
        levels[
          String(ratio)
        ] =
          high -
          range * ratio;
      }
    );

    return levels;
  },

  calculateExtension(
    low,
    high
  ) {
    const range =
      high - low;

    const levels = {};

    this.extensionRatios.forEach(
      (ratio) => {
        levels[
          String(ratio)
        ] =
          low +
          range * ratio;
      }
    );

    return levels;
  },

  calculateSwing(
    swingHigh,
    swingLow,
    direction = "bullish"
  ) {
    if (
      direction ===
      "bearish"
    ) {
      return {
        direction,
        retracement:
          this.calculateRetracement(
            swingHigh,
            swingLow
          ),

        extension:
          this.calculateExtension(
            swingHigh,
            swingLow
          )
      };
    }

    return {
      direction,
      retracement:
        this.calculateRetracement(
          swingHigh,
          swingLow
        ),

      extension:
        this.calculateExtension(
          swingLow,
          swingHigh
        )
    };
  },

  premiumDiscount(
    high,
    low,
    price
  ) {
    const midpoint =
      (high + low) / 2;

    return {
      midpoint,

      zone:
        price > midpoint
          ? "premium"
          : "discount"
    };
  }
};

if (typeof window !== "undefined") {
  window.FibonacciEngine =
    FibonacciEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    FibonacciEngine;
  }
