"use strict";

const Watchtower = {
  monitored: {},

  add(symbol, configuration = {}) {
    this.monitored[symbol] = {
      symbol,

      enabled:
        configuration.enabled !== false,

      timeframes:
        configuration.timeframes ||
        ["1h", "4h", "1d"],

      monitorNews:
        configuration.monitorNews !== false,

      monitorStructure:
        configuration.monitorStructure !== false,

      monitorPrediction:
        configuration.monitorPrediction !== false,

      addedAt: Date.now()
    };

    return this.monitored[symbol];
  },

  remove(symbol) {
    delete this.monitored[symbol];
  },

  list() {
    return Object.values(
      this.monitored
    );
  },

  status() {
    const instruments =
      this.list();

    return {
      enabled: true,

      instrumentCount:
        instruments.length,

      monitoring:
        instruments.filter(
          (item) => item.enabled
        ).length
    };
  }
};

if (typeof window !== "undefined") {
  window.Watchtower = Watchtower;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = Watchtower;
  }
