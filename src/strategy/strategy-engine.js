"use strict";

const StrategyEngine = {
  modes: {
    scalping: {
      timeframes: [
        "1m",
        "3m",
        "5m",
        "15m"
      ]
    },

    dayTrading: {
      timeframes: [
        "5m",
        "15m",
        "30m",
        "1h"
      ]
    },

    swingTrading: {
      timeframes: [
        "1h",
        "4h",
        "1d"
      ]
    },

    positionTrading: {
      timeframes: [
        "4h",
        "1d",
        "1w"
      ]
    },

    longTerm: {
      timeframes: [
        "1d",
        "1w",
        "1M"
      ]
    }
  },

  getMode(name) {
    return (
      this.modes[name] ||
      this.modes.swingTrading
    );
  },

  createSetup(data = {}) {
    return {
      mode:
        data.mode ||
        "swingTrading",

      symbol:
        data.symbol || null,

      direction:
        data.direction ||
        "neutral",

      timeframe:
        data.timeframe || null,

      trigger:
        data.trigger || null,

      confirmation:
        data.confirmation || null,

      entry:
        data.entry || null,

      stop:
        data.stop || null,

      targets:
        data.targets || [],

      invalidation:
        data.invalidation || null
    };
  }
};

if (typeof window !== "undefined") {
  window.StrategyEngine =
    StrategyEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = StrategyEngine;
        }
