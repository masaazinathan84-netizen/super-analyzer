"use strict";

const AIEngine = {
  version: "1.0.0",

  providers: {
    primary: {
      name: "OpenAI",
      model: "gpt-6-astra",
      status: "not_connected"
    },

    secondary: {
      name: "Google Gemini",
      model: "gemini",
      status: "not_connected"
    }
  },

  buildAnalysisContext(data = {}) {
    return {
      instrument:
        data.instrument || null,

      marketData:
        data.marketData || null,

      technical:
        data.technical || null,

      candles:
        data.candles || null,

      structure:
        data.structure || null,

      liquidity:
        data.liquidity || null,

      multiTimeframe:
        data.multiTimeframe || null,

      fundamentals:
        data.fundamentals || null,

      news:
        data.news || null,

      macro:
        data.macro || null,

      sentiment:
        data.sentiment || null,

      tradingMode:
        data.tradingMode ||
        "swingTrading"
    };
  },

  createPrompt(context = {}) {
    return {
      role: "market_analysis",

      instruction:
        "Analyze the supplied market information using evidence, uncertainty and scenario-based reasoning. Do not claim certainty about future prices.",

      context
    };
  },

  async analyze(data = {}) {
    const context =
      this.buildAnalysisContext(data);

    const prompt =
      this.createPrompt(context);

    return {
      status: "ready_for_provider",
      provider: null,
      prompt,
      result: null
    };
  }
};

if (typeof window !== "undefined") {
  window.AIEngine = AIEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = AIEngine;
      }
