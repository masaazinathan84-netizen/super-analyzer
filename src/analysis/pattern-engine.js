"use strict";

const PatternEngine = {
  version: "1.0.0",

  detectDoubleTop(
    candles = []
  ) {
    if (candles.length < 5) {
      return null;
    }

    const highs =
      candles.map(
        (candle) => candle.high
      );

    const first =
      highs[highs.length - 5];

    const second =
      highs[highs.length - 1];

    const middle =
      Math.min(
        ...highs.slice(
          highs.length - 4,
          highs.length - 1
        )
      );

    const tolerance =
      Math.abs(first) *
      0.01;

    if (
      Math.abs(
        first - second
      ) <= tolerance &&
      middle < first
    ) {
      return {
        type: "double_top",
        resistance:
          (first + second) /
          2
      };
    }

    return null;
  },

  detectDoubleBottom(
    candles = []
  ) {
    if (candles.length < 5) {
      return null;
    }

    const lows =
      candles.map(
        (candle) => candle.low
      );

    const first =
      lows[lows.length - 5];

    const second =
      lows[lows.length - 1];

    const middle =
      Math.max(
        ...lows.slice(
          lows.length - 4,
          lows.length - 1
        )
      );

    const tolerance =
      Math.abs(first) *
      0.01;

    if (
      Math.abs(
        first - second
      ) <= tolerance &&
      middle > first
    ) {
      return {
        type: "double_bottom",
        support:
          (first + second) /
          2
      };
    }

    return null;
  },

  detectChannel(
    candles = []
  ) {
    if (candles.length < 10) {
      return null;
    }

    const first =
      candles[0];

    const last =
      candles[
        candles.length - 1
      ];

    const priceChange =
      last.close -
      first.close;

    const direction =
      priceChange > 0
        ? "ascending"
        : priceChange < 0
          ? "descending"
          : "flat";

    return {
      type: "price_channel",
      direction
    };
  },

  detectBreakout(
    candles = [],
    lookback = 20
  ) {
    if (
      candles.length <=
      lookback
    ) {
      return null;
    }

    const current =
      candles[
        candles.length - 1
      ];

    const previous =
      candles.slice(
        -lookback - 1,
        -1
      );

    const resistance =
      Math.max(
        ...previous.map(
          (candle) =>
            candle.high
        )
      );

    const support =
      Math.min(
        ...previous.map(
          (candle) =>
            candle.low
        )
      );

    if (
      current.close >
      resistance
    ) {
      return {
        type: "bullish_breakout",
        level: resistance
      };
    }

    if (
      current.close <
      support
    ) {
      return {
        type: "bearish_breakdown",
        level: support
      };
    }

    return null;
  },

  analyze(candles = []) {
    return {
      doubleTop:
        this.detectDoubleTop(
          candles
        ),

      doubleBottom:
        this.detectDoubleBottom(
          candles
        ),

      channel:
        this.detectChannel(
          candles
        ),

      breakout:
        this.detectBreakout(
          candles
        )
    };
  }
};

if (typeof window !== "undefined") {
  window.PatternEngine =
    PatternEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    PatternEngine;
  }
