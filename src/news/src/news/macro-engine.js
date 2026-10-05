"use strict";

const MacroEngine = {
  version: "1.0.0",

  indicators: {},

  setIndicator(
    name,
    data = {}
  ) {
    this.indicators[name] = {
      name,
      value:
        Number(data.value || 0),

      previous:
        Number(
          data.previous || 0
        ),

      forecast:
        Number(
          data.forecast || 0
        ),

      timestamp:
        data.timestamp ||
        Date.now()
    };

    return this.indicators[
      name
    ];
  },

  getIndicator(name) {
    return (
      this.indicators[name] ||
      null
    );
  },

  surprise(name) {
    const indicator =
      this.getIndicator(name);

    if (!indicator) {
      return null;
    }

    return (
      indicator.value -
      indicator.forecast
    );
  },

  getMarketRegime() {
    const inflation =
      this.getIndicator(
        "inflation"
      );

    const growth =
      this.getIndicator(
        "gdp"
      );

    const rates =
      this.getIndicator(
        "interest_rate"
      );

    return {
      inflation:
        inflation
          ? inflation.value
          : null,

      growth:
        growth
          ? growth.value
          : null,

      interestRate:
        rates
          ? rates.value
          : null
    };
  }
};

if (typeof window !== "undefined") {
  window.MacroEngine =
    MacroEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    MacroEngine;
  }
