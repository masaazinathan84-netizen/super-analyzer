"use strict";

const ConfidenceEngine = {
  version: "1.0.0",

  calculate(data = {}) {
    const scores = [];

    if (
      typeof data.aiAgreement ===
      "number"
    ) {
      scores.push(
        data.aiAgreement * 100
      );
    }

    if (
      typeof data.confluence ===
      "number"
    ) {
      scores.push(
        data.confluence * 100
      );
    }

    if (
      typeof data.quantScore ===
      "number"
    ) {
      scores.push(
        data.quantScore
      );
    }

    if (
      typeof data.dataQuality ===
      "number"
    ) {
      scores.push(
        data.dataQuality
      );
    }

    if (scores.length === 0) {
      return {
        score: 0,
        label: "unknown"
      };
    }

    const score =
      scores.reduce(
        (sum, value) =>
          sum + value,
        0
      ) / scores.length;

    let label =
      "low";

    if (score >= 75) {
      label = "high";
    } else if (
      score >= 55
    ) {
      label = "moderate";
    }

    return {
      score,
      label
    };
  }
};

if (typeof window !== "undefined") {
  window.ConfidenceEngine =
    ConfidenceEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    ConfidenceEngine;
  }
