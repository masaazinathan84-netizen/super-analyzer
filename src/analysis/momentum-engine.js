"use strict";

const TrendEngine = {
  version: "1.0.0",

  sma(values = [], period = 20) {
    if (values.length < period) {
      return null;
    }

    const slice = values.slice(-period);

    return slice.reduce(
      (sum, value) =>
        sum + Number(value || 0),
      0
    ) / period;
  },

  ema(values = [], period = 20) {
    if (values.length < period) {
      return null;
    }

    const multiplier =
      2 / (period + 1);

    let ema =
      this.sma(
        values.slice(0, period),
        period
      );

    for (
      let i = period;
      i < values.length;
      i += 1
    ) {
      ema =
        (Number(values[i]) - ema) *
          multiplier +
        ema;
    }

    return ema;
  },

  wma(values = [], period = 20) {
    if (values.length < period) {
      return null;
    }

    const slice =
      values.slice(-period);

    let weightedSum = 0;
    let weightTotal = 0;

    slice.forEach(
      (value, index) => {
        const weight = index + 1;

        weightedSum +=
          Number(value) * weight;

        weightTotal += weight;
      }
    );

    return weightedSum / weightTotal;
  },

  hma(values = [], period = 20) {
    if (values.length < period) {
      return null;
    }

    const halfPeriod =
      Math.max(
        1,
        Math.floor(period / 2)
      );

    const sqrtPeriod =
      Math.max(
        1,
        Math.floor(Math.sqrt(period))
      );

    const halfWma =
      this.wma(
        values,
        halfPeriod
      );

    const fullWma =
      this.wma(
        values,
        period
      );

    if (
      halfWma === null ||
      fullWma === null
    ) {
      return null;
    }

    const rawHma =
      2 * halfWma -
      fullWma;

    return rawHma;
  },

  adx(candles = [], period = 14) {
    if (
      candles.length <
      period + 1
    ) {
      return null;
    }

    let plusDM = 0;
    let minusDM = 0;
    let trueRange = 0;

    for (
      let i = 1;
      i <= period;
      i += 1
    ) {
      const current =
        candles[i];

      const previous =
        candles[i - 1];

      const upMove =
        current.high -
        previous.high;

      const downMove =
        previous.low -
        current.low;

      if (
        upMove > downMove &&
        upMove > 0
      ) {
        plusDM += upMove;
      }

      if (
        downMove > upMove &&
        downMove > 0
      ) {
        minusDM += downMove;
      }

      trueRange +=
        Math.max(
          current.high -
            current.low,
          Math.abs(
            current.high -
              previous.close
          ),
          Math.abs(
            current.low -
              previous.close
          )
        );
    }

    if (trueRange === 0) {
      return 0;
    }

    const plusDI =
      (plusDM / trueRange) *
      100;

    const minusDI =
      (minusDM / trueRange) *
      100;

    const denominator =
      plusDI + minusDI;

    if (denominator === 0) {
      return 0;
    }

    return (
      Math.abs(
        plusDI - minusDI
      ) /
        denominator
    ) * 100;
  },

  aroon(candles = [], period = 25) {
    if (candles.length < period) {
      return null;
    }

    const slice =
      candles.slice(-period);

    let highestIndex = 0;
    let lowestIndex = 0;

    slice.forEach(
      (candle, index) => {
        if (
          candle.high >
          slice[highestIndex].high
        ) {
          highestIndex = index;
        }

        if (
          candle.low <
          slice[lowestIndex].low
        ) {
          lowestIndex = index;
        }
      }
    );

    return {
      up:
        ((highestIndex + 1) /
          period) *
        100,

      down:
        ((lowestIndex + 1) /
          period) *
        100
    };
  },

  supertrend(
    candles = [],
    period = 10,
    multiplier = 3
  ) {
    if (
      candles.length <
      period
    ) {
      return null;
    }

    const recent =
      candles.slice(-period);

    const highest = Math.max(
      ...recent.map(
        (candle) => candle.high
      )
    );

    const lowest = Math.min(
      ...recent.map(
        (candle) => candle.low
      )
    );

    const atr =
      (highest - lowest) /
      period;

    const last =
      recent[
        recent.length - 1
      ];

    const middle =
      (last.high + last.low) /
      2;

    const upper =
      middle + multiplier * atr;

    const lower =
      middle - multiplier * atr;

    return {
      upper,
      lower,
      value:
        last.close >= middle
          ? lower
          : upper,

      direction:
        last.close >= middle
          ? "bullish"
          : "bearish"
    };
  },

  parabolicSAR(
    candles = [],
    step = 0.02,
    maximum = 0.2
  ) {
    if (candles.length < 2) {
      return null;
    }

    let bullish = true;
    let sar = candles[0].low;
    let extreme =
      candles[0].high;

    let acceleration =
      step;

    for (
      let i = 1;
      i < candles.length;
      i += 1
    ) {
      const candle =
        candles[i];

      if (bullish) {
        sar =
          sar +
          acceleration *
            (extreme - sar);

        if (
          candle.low < sar
        ) {
          bullish = false;
          sar = extreme;
          extreme =
            candle.low;
          acceleration = step;
        } else if (
          candle.high > extreme
        ) {
          extreme =
            candle.high;

          acceleration =
            Math.min(
              acceleration + step,
              maximum
            );
        }
      } else {
        sar =
          sar +
          acceleration *
            (extreme - sar);

        if (
          candle.high > sar
        ) {
          bullish = true;
          sar = extreme;
          extreme =
            candle.high;
          acceleration = step;
        } else if (
          candle.low < extreme
        ) {
          extreme =
            candle.low;

          acceleration =
            Math.min(
              acceleration + step,
              maximum
            );
        }
      }
    }

    return {
      value: sar,
      direction: bullish
        ? "bullish"
        : "bearish"
    };
  },

  analyze(candles = []) {
    const closes =
      candles.map(
        (candle) =>
          Number(candle.close)
      );

    return {
      sma20:
        this.sma(closes, 20),

      sma50:
        this.sma(closes, 50),

      ema20:
        this.ema(closes, 20),

      ema50:
        this.ema(closes, 50),

      wma20:
        this.wma(closes, 20),

      hma20:
        this.hma(closes, 20),

      adx:
        this.adx(candles, 14),

      aroon:
        this.aroon(candles, 25),

      supertrend:
        this.supertrend(
          candles,
          10,
          3
        ),

      parabolicSAR:
        this.parabolicSAR(
          candles
        )
    };
  }
};

if (typeof window !== "undefined") {
  window.TrendEngine =
    TrendEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    TrendEngine;
      }
