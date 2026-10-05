"use strict";

const BacktestEngine = {
  run(candles = [], strategy) {
    if (
      !Array.isArray(candles) ||
      typeof strategy !== "function"
    ) {
      return {
        trades: [],
        statistics: {}
      };
    }

    const trades = [];

    candles.forEach(
      (candle, index) => {
        const signal =
          strategy(
            candle,
            index,
            candles
          );

        if (!signal) {
          return;
        }

        trades.push({
          index,
          timestamp:
            candle.timestamp,

          direction:
            signal.direction ||
            "neutral",

          entry:
            signal.entry ||
            candle.close,

          stop:
            signal.stop ||
            null,

          target:
            signal.target ||
            null
        });
      }
    );

    return {
      trades,

      statistics:
        this.statistics(trades)
    };
  },

  statistics(trades = []) {
    return {
      totalTrades:
        trades.length,

      completedTrades:
        trades.filter(
          (trade) =>
            trade.result !== undefined
        ).length
    };
  }
};

if (typeof window !== "undefined") {
  window.BacktestEngine =
    BacktestEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    BacktestEngine;
  }
