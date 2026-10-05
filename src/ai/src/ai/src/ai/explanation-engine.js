"use strict";

const ExplanationEngine = {
  version: "1.0.0",

  create(data = {}) {
    const reasons = [];
    const conflicts = [];
    const invalidation = [];

    if (
      data.structure &&
      data.structure.trend
    ) {
      reasons.push(
        `Market structure is ${data.structure.trend}.`
      );
    }

    if (
      data.momentum &&
      data.momentum.rsi14 !==
        null
    ) {
      reasons.push(
        `RSI is ${Number(
          data.momentum.rsi14
        ).toFixed(2)}.`
      );
    }

    if (
      data.volatility &&
      data.volatility.regime
    ) {
      reasons.push(
        `Volatility regime is ${data.volatility.regime}.`
      );
    }

    if (
      data.conflicts &&
      Array.isArray(
        data.conflicts
      )
    ) {
      conflicts.push(
        ...data.conflicts
      );
    }

    if (
      data.invalidation
    ) {
      invalidation.push(
        data.invalidation
      );
    }

    return {
      summary:
        data.direction
          ? `Current analytical bias is ${data.direction}.`
          : "Current analytical bias is neutral.",

      reasons,

      conflicts,

      invalidation,

      disclaimer:
        "This analysis describes scenarios and evidence. It is not a guarantee of future market outcomes."
    };
  }
};

if (typeof window !== "undefined") {
  window.ExplanationEngine =
    ExplanationEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    ExplanationEngine;
      }
