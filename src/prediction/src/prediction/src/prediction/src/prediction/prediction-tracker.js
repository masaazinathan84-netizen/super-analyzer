"use strict";

const PredictionTracker = {
  version: "1.0.0",

  predictions: [],

  add(prediction) {
    this.predictions.push(
      prediction
    );

    return prediction;
  },

  getActive() {
    return this.predictions.filter(
      (prediction) =>
        prediction.status ===
        "active"
    );
  },

  updateOutcome(
    id,
    outcome
  ) {
    const prediction =
      this.predictions.find(
        (item) =>
          item.id === id
      );

    if (!prediction) {
      return null;
    }

    prediction.outcome =
      outcome;

    prediction.status =
      "completed";

    prediction.completedAt =
      Date.now();

    return prediction;
  },

  statistics() {
    const completed =
      this.predictions.filter(
        (prediction) =>
          prediction.status ===
          "completed"
      );

    if (
      completed.length === 0
    ) {
      return {
        total: 0,
        successful: 0,
        unsuccessful: 0,
        accuracy: 0
      };
    }

    const successful =
      completed.filter(
        (prediction) =>
          prediction.outcome ===
          "successful"
      ).length;

    return {
      total:
        completed.length,

      successful,

      unsuccessful:
        completed.length -
        successful,

      accuracy:
        successful /
        completed.length
    };
  }
};

if (typeof window !== "undefined") {
  window.PredictionTracker =
    PredictionTracker;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    PredictionTracker;
      }
