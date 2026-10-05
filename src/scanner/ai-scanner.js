"use strict";

const AIScanner = {
  scan(instruments = [], analyzer) {
    if (
      !Array.isArray(instruments) ||
      typeof analyzer !== "function"
    ) {
      return [];
    }

    return instruments
      .map((instrument) => {
        try {
          return analyzer(instrument);
        } catch (error) {
          return {
            symbol:
              instrument.symbol ||
              null,

            status: "error",

            error: error.message
          };
        }
      })
      .filter(Boolean);
  },

  rank(results = []) {
    return [...results].sort(
      (a, b) =>
        Number(
          b.score || 0
        ) -
        Number(
          a.score || 0
        )
    );
  }
};

if (typeof window !== "undefined") {
  window.AIScanner = AIScanner;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = AIScanner;
  }
