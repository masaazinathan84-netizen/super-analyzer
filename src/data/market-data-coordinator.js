"use strict";

const MarketDataCoordinator = {
  version: "1.0.0",

  async loadMarket(symbol, timeframe, options = {}) {
    if (
      typeof MarketDataProviderManager ===
      "undefined"
    ) {
      throw new Error(
        "MarketDataProviderManager is not loaded."
      );
    }

    const result =
      await MarketDataProviderManager
        .getCandles(
          symbol,
          timeframe,
          options
        );

    if (
      result.status === "success" &&
      typeof CandleStore !== "undefined"
    ) {
      CandleStore.set(
        symbol,
        timeframe,
        result.candles
      );
    }

    return result;
  },

  updateQuote(quote) {
    if (
      typeof QuoteEngine === "undefined"
    ) {
      return null;
    }

    return QuoteEngine.update(quote);
  },

  getMarketSnapshot(symbol, timeframe) {
    return {
      symbol,

      timeframe,

      quote:
        typeof QuoteEngine !== "undefined"
          ? QuoteEngine.get(symbol)
          : null,

      candles:
        typeof CandleStore !== "undefined"
          ? CandleStore.get(
              symbol,
              timeframe
            )
          : []
    };
  }
};

if (typeof window !== "undefined") {
  window.MarketDataCoordinator =
    MarketDataCoordinator;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    MarketDataCoordinator;
  }
