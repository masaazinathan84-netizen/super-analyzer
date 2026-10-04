"use strict";

const CandleEngine = {
  version: "1.0.0",

  body(candle) {
    return Math.abs(
      candle.close - candle.open
    );
  },

  range(candle) {
    return candle.high - candle.low;
  },

  upperWick(candle) {
    return (
      candle.high -
      Math.max(candle.open, candle.close)
    );
  },

  lowerWick(candle) {
    return (
      Math.min(candle.open, candle.close) -
      candle.low
    );
  },

  isBullish(candle) {
    return candle.close > candle.open;
  },

  isBearish(candle) {
    return candle.close < candle.open;
  },

  isDoji(candle) {
    const range = this.range(candle);

    if (range <= 0) {
      return false;
    }

    return (
      this.body(candle) / range <= 0.1
    );
  },

  isHammer(candle) {
    const body = this.body(candle);
    const lower = this.lowerWick(candle);
    const upper = this.upperWick(candle);

    return (
      lower >= body * 2 &&
      upper <= body &&
      body > 0
    );
  },

  isShootingStar(candle) {
    const body = this.body(candle);
    const upper = this.upperWick(candle);
    const lower = this.lowerWick(candle);

    return (
      upper >= body * 2 &&
      lower <= body &&
      body > 0
    );
  },

  isBullishEngulfing(previous, current) {
    return (
      this.isBearish(previous) &&
      this.isBullish(current) &&
      current.open <= previous.close &&
      current.close >= previous.open
    );
  },

  isBearishEngulfing(previous, current) {
    return (
      this.isBullish(previous) &&
      this.isBearish(current) &&
      current.open >= previous.close &&
      current.close <= previous.open
    );
  },

  analyze(candles = []) {
    if (!Array.isArray(candles) || candles.length === 0) {
      return [];
    }

    return candles.map((candle, index) => {
      const previous =
        candles[index - 1];

      const patterns = [];

      if (this.isDoji(candle)) {
        patterns.push("doji");
      }

      if (this.isHammer(candle)) {
        patterns.push("hammer");
      }

      if (this.isShootingStar(candle)) {
        patterns.push("shooting_star");
      }

      if (
        previous &&
        this.isBullishEngulfing(
          previous,
          candle
        )
      ) {
        patterns.push("bullish_engulfing");
      }

      if (
        previous &&
        this.isBearishEngulfing(
          previous,
          candle
        )
      ) {
        patterns.push("bearish_engulfing");
      }

      return {
        timestamp: candle.timestamp,
        patterns
      };
    });
  }
};

if (typeof window !== "undefined") {
  window.CandleEngine = CandleEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = CandleEngine;
  }
