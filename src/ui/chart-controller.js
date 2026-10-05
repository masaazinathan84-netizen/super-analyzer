"use strict";

const ChartController = {
  charts: {},

  create(id, configuration = {}) {
    this.charts[id] = {
      id,

      symbol:
        configuration.symbol || null,

      timeframe:
        configuration.timeframe ||
        "1h",

      candles:
        configuration.candles || [],

      indicators:
        configuration.indicators || [],

      overlays:
        configuration.overlays || []
    };

    return this.charts[id];
  },

  update(id, data = {}) {
    if (!this.charts[id]) {
      return null;
    }

    this.charts[id] = {
      ...this.charts[id],
      ...data
    };

    return this.charts[id];
  },

  get(id) {
    return this.charts[id] || null;
  },

  remove(id) {
    delete this.charts[id];
  }
};

if (typeof window !== "undefined") {
  window.ChartController =
    ChartController;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    ChartController;
        }
