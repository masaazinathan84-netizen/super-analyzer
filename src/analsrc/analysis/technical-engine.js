"use strict";

const TechnicalEngine = {
  version: "1.0.0",

  sma(values = [], period = 20) {
    if (!Array.isArray(values) || values.length < period) {
      return null;
    }

    const slice = values.slice(-period);

    return (
      slice.reduce((sum, value) => {
        return sum + Number(value || 0);
      }, 0) / period
    );
  },

  ema(values = [], period = 20) {
    if (!Array.isArray(values) || values.length < period) {
      return null;
    }

    const multiplier = 2 / (period + 1);

    let ema =
      values
        .slice(0, period)
        .reduce((sum, value) => {
          return sum + Number(value || 0);
        }, 0) / period;

    for (let i = period; i < values.length; i += 1) {
      const value = Number(values[i] || 0);

      ema =
        (value - ema) * multiplier +
        ema;
    }

    return ema;
  },

  trueRange(current, previousClose) {
    const high = Number(current.high || 0);
    const low = Number(current.low || 0);
    const previous = Number(previousClose || 0);

    if (!previous) {
      return high - low;
    }

    return Math.max(
      high - low,
      Math.abs(high - previous),
      Math.abs(low - previous)
    );
  },

  atr(candles = [], period = 14) {
    if (!Array.isArray(candles) || candles.length <= period) {
      return null;
    }

    const ranges = [];

    for (let i = 1; i < candles.length; i += 1) {
      ranges.push(
        this.trueRange(
          candles[i],
          candles[i - 1].close
        )
      );
    }

    return this.sma(ranges, period);
  },

  rsi(values = [], period = 14) {
    if (!Array.isArray(values) || values.length <= period) {
      return null;
    }

    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i += 1) {
      const change =
        Number(values[i]) -
        Number(values[i - 1]);

      if (change >= 0) {
        gains += change;
      } else {
        losses += Math.abs(change);
      }
    }

    let averageGain = gains / period;
    let averageLoss = losses / period;

    for (
      let i = period + 1;
      i < values.length;
      i += 1
    ) {
      const change =
        Number(values[i]) -
        Number(values[i - 1]);

      const gain = Math.max(change, 0);
      const loss = Math.max(-change, 0);

      averageGain =
        (averageGain * (period - 1) + gain) /
        period;

      averageLoss =
        (averageLoss * (period - 1) + loss) /
        period;
    }

    if (averageLoss === 0) {
      return 100;
    }

    const relativeStrength =
      averageGain / averageLoss;

    return (
      100 -
      100 / (1 + relativeStrength)
    );
  },

  bollingerBands(values = [], period = 20, multiplier = 2) {
    if (!Array.isArray(values) || values.length < period) {
      return null;
    }

    const slice = values.slice(-period);

    const middle = this.sma(slice, period);

    const variance =
      slice.reduce((sum, value) => {
        return (
          sum +
          Math.pow(
            Number(value) - middle,
            2
          )
        );
      }, 0) / period;

    const standardDeviation =
      Math.sqrt(variance);

    return {
      middle,
      upper:
        middle +
        multiplier * standardDeviation,
      lower:
        middle -
        multiplier * standardDeviation
    };
  },

  calculate(candles = {}) {
    const closes = candles.map(
      (candle) => Number(candle.close || 0)
    );

    return {
      sma20: this.sma(closes, 20),
      sma50: this.sma(closes, 50),
      ema20: this.ema(closes, 20),
      ema50: this.ema(closes, 50),
      rsi14: this.rsi(closes, 14),
      atr14: this.atr(candles, 14),
      bollinger20: this.bollingerBands(
        closes,
        20,
        2
      )
    };
  }
};

if (typeof window !== "undefined") {
  window.TechnicalEngine = TechnicalEngine;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = TechnicalEngine;
        }
