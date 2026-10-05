"use strict";

const DashboardController = {
  state: {
    activeSymbol: null,
    activeTimeframe: "1h",
    mode: "swingTrading",
    lastAnalysis: null
  },

  setSymbol(symbol) {
    this.state.activeSymbol =
      symbol;

    return this.state;
  },

  setTimeframe(timeframe) {
    this.state.activeTimeframe =
      timeframe;

    return this.state;
  },

  setMode(mode) {
    this.state.mode =
      mode;

    return this.state;
  },

  setAnalysis(result) {
    this.state.lastAnalysis =
      result;

    return this.state;
  },

  getState() {
    return {
      ...this.state
    };
  }
};

if (typeof window !== "undefined") {
  window.DashboardController =
    DashboardController;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    DashboardController;
  }
