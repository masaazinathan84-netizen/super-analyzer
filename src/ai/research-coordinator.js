"use strict";

const AIResearchCoordinator = {
  async analyze(context = {}) {
    const request = {
      timestamp: Date.now(),

      instrument:
        context.instrument || null,

      market:
        context.market || null,

      technical:
        context.technical || null,

      structure:
        context.structure || null,

      liquidity:
        context.liquidity || null,

      news:
        context.news || null,

      fundamentals:
        context.fundamentals || null,

      macro:
        context.macro || null,

      multiTimeframe:
        context.multiTimeframe || null,

      instruction:
        "Produce evidence-based market analysis. Explain uncertainty. Do not claim certainty about future prices."
    };

    const results = {};

    if (
      typeof AIProviderManager !==
      "undefined"
    ) {
      results.primary =
        await AIProviderManager.analyze(
          "openai",
          request
        );

      results.secondary =
        await AIProviderManager.analyze(
          "gemini",
          request
        );
    }

    return {
      request,
      results
    };
  }
};

if (typeof window !== "undefined") {
  window.AIResearchCoordinator =
    AIResearchCoordinator;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    AIResearchCoordinator;
  }
