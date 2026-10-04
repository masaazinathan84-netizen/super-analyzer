"use strict";

const MarketData = {
  version: "1.0.0",

  supportedAssetTypes: [
    "forex",
    "crypto",
    "stock",
    "index",
    "commodity",
    "future",
    "metal",
    "etf"
  ],

  supportedTimeframes: [
    "1m",
    "3m",
    "5m",
    "15m",
    "30m",
    "1h",
    "2h",
    "4h",
    "6h",
    "12h",
    "1d",
    "1w",
    "1M"
  ],

  createInstrument(data = {}) {
    return {
      symbol: data.symbol || "",
      name: data.name || "",
      assetType: data.assetType || "",
      exchange: data.exchange || "",
      currency: data.currency || "",
      quoteCurrency: data.quoteCurrency || "",
      active: data.active !== false
    };
  },

  createCandle(data = {}) {
    return {
      timestamp: Number(data.timestamp || Date.now()),
      open: Number(data.open || 0),
      high: Number(data.high || 0),
      low: Number(data.low || 0),
      close: Number(data.close || 0),
      volume: Number(data.volume || 0),
      timeframe: data.timeframe || "1h"
    };
  },

  createQuote(data = {}) {
    return {
      symbol: data.symbol || "",
      bid: Number(data.bid || 0),
      ask: Number(data.ask || 0),
      last: Number(data.last || 0),
      timestamp: Number(data.timestamp || Date.now())
    };
  },

  normalizeCandles(candles = []) {
    if (!Array.isArray(candles)) {
      return [];
    }

    return candles
      .map((candle) => this.createCandle(candle))
      .filter((candle) => {
        return (
          candle.open >= 0 &&
          candle.high >= 0 &&
          candle.low >= 0 &&
          candle.close >= 0
        );
      })
      .sort((a, b) => a.timestamp - b.timestamp);
  },

  getLatestCandle(candles = []) {
    const normalized = this.normalizeCandles(candles);

    if (normalized.length === 0) {
      return null;
    }

    return normalized[normalized.length - 1];
  },

  calculateSpread(quote = {}) {
    const bid = Number(quote.bid || 0);
    const ask = Number(quote.ask || 0);

    if (!bid || !ask) {
      return 0;
    }

    return ask - bid;
  },

  calculateMidPrice(quote = {}) {
    const bid = Number(quote.bid || 0);
    const ask = Number(quote.ask || 0);

    if (!bid || !ask) {
      return Number(quote.last || 0);
    }

    return (bid + ask) / 2;
  }
};

if (typeof window !== "undefined") {
  window.MarketData = MarketData;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = MarketData;
    }
