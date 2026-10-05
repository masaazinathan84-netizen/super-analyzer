"use strict";

const CandleStore = {
  storage: {},

  maxCandles: 5000,

  set(symbol, timeframe, candles = []) {
    if (!symbol || !timeframe) {
      return [];
    }

    const key =
      `${symbol}:${timeframe}`;

    this.storage[key] =
      candles
        .slice(-this.maxCandles)
        .map((candle) => ({
          timestamp: Number(candle.timestamp),
          open: Number(candle.open),
          high: Number(candle.high),
          low: Number(candle.low),
          close: Number(candle.close),
          volume: Number(candle.volume || 0),
          timeframe
        }));

    return this.storage[key];
  },

  append(symbol, timeframe, candle) {
    const key =
      `${symbol}:${timeframe}`;

    if (!this.storage[key]) {
      this.storage[key] = [];
    }

    this.storage[key].push(candle);

    if (
      this.storage[key].length >
      this.maxCandles
    ) {
      this.storage[key] =
        this.storage[key].slice(
          -this.maxCandles
        );
    }

    return candle;
  },

  get(symbol, timeframe) {
    return (
      this.storage[
        `${symbol}:${timeframe`
      ] || []
    );
  },

  latest(symbol, timeframe) {
    const candles =
      this.get(symbol, timeframe);

    return candles.length
      ? candles[candles.length - 1]
      : null;
  },

  clear(symbol, timeframe) {
    delete this.storage[`${symbol}:${timeframe}`] || []
     
    ];
  }
};

if (typeof window !== "undefined") {
  window.CandleStore = CandleStore;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = CandleStore;
                       }
