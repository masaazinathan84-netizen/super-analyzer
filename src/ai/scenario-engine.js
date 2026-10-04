"use strict";

const ScenarioEngine = {
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

      conviction:
        Number(data.conviction || 0),

      status:
        data.status || "watching"
    };
  },

  createAnalysis(data = {}) {
    return {
      instrument:
        data.instrument || null,

      timeframe:
        data.timeframe || null,

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
        "These are scenario-based market projections, not guaranteed predictions."
    };
  }
};

if (typeof window !== "undefined") {
  window.ScenarioEngine =
    ScenarioEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = ScenarioEngine;
      }
