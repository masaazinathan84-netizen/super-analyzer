"use strict";

const PredictionEngine = {
  version: "1.0.0",

  createScenario(data = {}) {
    return {
      direction:
        data.direction || "neutral",

      trigger:
        data.trigger || null,

      confirmation:
        data.confirmation || null,

      entry:
        data.entry || null,

      targets:
        Array.isArray(data.targets)
          ? data.targets
          : [],

      invalidation:
        data.invalidation || null,

      evidence:
        Array.isArray(data.evidence)
          ? data.evidence
          : [],

      confidence:
        Number(data.confidence || 0),

      status:
        data.status || "watching"
    };
  },

  generate(data = {}) {
    return {
      instrument:
        data.instrument || null,

      timeframe:
        data.timeframe || null,

      createdAt: Date.now(),

      bull: this.createScenario({
        direction: "bullish",
        ...data.bull
      }),

      base: this.createScenario({
        direction: "neutral",
        ...data.base
      }),

      bear: this.createScenario({
        direction: "bearish",
        ...data.bear
      }),

      disclaimer:
        "Scenarios are not guaranteed predictions or investment advice."
    };
  }
};

if (typeof window !== "undefined") {
  window.PredictionEngine =
    PredictionEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    PredictionEngine;
      }
