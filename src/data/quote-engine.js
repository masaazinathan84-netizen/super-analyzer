"use strict";

const QuoteEngine = {
  quotes: {},

  update(quote = {}) {
    if (!quote.symbol) {
      return null;
    }

    const previous =
      this.quotes[quote.symbol] || null;

    const last = Number(
      quote.last ?? quote.price ?? 0
    );

    const previousLast =
      previous
        ? Number(previous.last || 0)
        : last;

    const change =
      last - previousLast;

    const changePercent =
      previousLast
        ? (change / previousLast) * 100
        : 0;

    const normalized = {
      symbol: quote.symbol,
      bid: Number(quote.bid || 0),
      ask: Number(quote.ask || 0),
      last,
      change,
      changePercent,
      timestamp:
        Number(quote.timestamp) ||
        Date.now()
    };

    this.quotes[quote.symbol] =
      normalized;

    return normalized;
  },

  get(symbol) {
    return this.quotes[symbol] || null;
  },

  getAll() {
    return {
      ...this.quotes
    };
  },

  clear(symbol) {
    if (symbol) {
      delete this.quotes[symbol];
      return;
    }

    this.quotes = {};
  }
};

if (typeof window !== "undefined") {
  window.QuoteEngine = QuoteEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = QuoteEngine;
        }
