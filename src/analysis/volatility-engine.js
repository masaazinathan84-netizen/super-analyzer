"use strict";

const VolatilityEngine = {
  version: "1.0.0",

  trueRange(
    current,
    previousClose
  ) {
    const high =
      Number(current.high);

    const low =
      Number(current.low);

    const previous =
      Number(previousClose);

    return Math.max(
      high - low,
      Math.abs(
        high - previous
      ),
      Math.abs(
        low - previous
      )
    );
  },

  atr(
    candles = [],
    period = 14
  ) {
    if (
      candles.length <= period
    ) {
      return null;
    }

    const ranges = [];

    for (
      let i = 1;
      i < candles.length;
      i += 1
    ) {
      ranges.push(
        this.trueRange(
          candles[i],
          candles[i - 1].close
        )
      );
    }

    const recent =
      ranges.slice(-period);

    return (
      recent.reduce(
        (sum, value) =>
          sum + value,
        0
      ) / recent.length
    );
  },

  standardDeviation(
    values = [],
    period = 20
  ) {
    if (
      values.length <
      period
    ) {
      return null;
    }

    const slice =
      values.slice(-period);

    const mean =
      slice.reduce(
        (sum, value) =>
          sum + Number(value),
        0
      ) / period;

    const variance =
      slice.reduce(
        (sum, value) =>
          sum +
          Math.pow(
            Number(value) -
              mean,
            2
          ),
        0
      ) / period;

    return Math.sqrt(
      variance
    );
  },

  bollingerBands(
    values = [],
    period = 20,
    multiplier = 2
  ) {
    if (
      values.length <
      period
    ) {
      return null;
    }

    const slice =
      values.slice(-period);

    const middle =
      slice.reduce(
        (sum, value) =>
          sum + Number(value),
        0
      ) / period;

    const deviation =
      this.standardDeviation(
        values,
        period
      );

    return {
      middle,

      upper:
        middle +
        multiplier *
          deviation,

      lower:
        middle -
        multiplier *
          deviation,

      width:
        middle !== 0
          ? ((2 *
              multiplier *
              deviation) /
              middle) *
            100
          : 0
    };
  },

  keltnerChannels(
    candles = [],
    period = 20,
    multiplier = 2
  ) {
    if (
      candles.length <
      period
    ) {
      return null;
    }

    const recent =
      candles.slice(-period);

    const middle =
      recent.reduce(
        (sum, candle) =>
          sum + candle.close,
        0
      ) / period;

    const atr =
      this.atr(
        candles,
        period
      );

    return {
      middle,

      upper:
        middle +
        multiplier * atr,

      lower:
        middle -
        multiplier * atr
    };
  },

  donchianChannels(
    candles = [],
    period = 20
  ) {
    if (
      candles.length <
      period
    ) {
      return null;
    }

    const recent =
      candles.slice(-period);

    const upper =
      Math.max(
        ...recent.map(
          (candle) =>
            candle.high
        )
      );

    const lower =
      Math.min(
        ...recent.map(
          (candle) =>
            candle.low
        )
      );

    return {
      upper,
      lower,
      middle:
        (upper + lower) / 2
    };
  },

  historicalVolatility(
    values = [],
    period = 20
  ) {
    if (
      values.length <= period
    ) {
      return null;
    }

    const returns = [];

    for (
      let i = 1;
      i < values.length;
      i += 1
    ) {
      if (
        values[i - 1] === 0
      ) {
        continue;
      }

      returns.push(
        Math.log(
          values[i] /
            values[i - 1]
        )
      );
    }

    const recent =
      returns.slice(-period);

    if (
      recent.length === 0
    ) {
      return null;
    }

    const mean =
      recent.reduce(
        (sum, value) =>
          sum + value,
        0
      ) / recent.length;

    const variance =
      recent.reduce(
        (sum, value) =>
          sum +
          Math.pow(
            value - mean,
            2
          ),
        0
      ) / recent.length;

    return (
      Math.sqrt(variance) *
      Math.sqrt(252) *
      100
    );
  },

  classifyRegime(
    atr,
    historicalVolatility
  ) {
    if (
      atr === null ||
      historicalVolatility ===
        null
    ) {
      return "unknown";
    }

    if (
      historicalVolatility >=
      40
    ) {
      return "high";
    }

    if (
      historicalVolatility <=
      15
    ) {
      return "low";
    }

    return "normal";
  },

  analyze(candles = []) {
    const closes =
      candles.map(
        (candle) =>
          Number(candle.close)
      );

    const atr =
      this.atr(
        candles,
        14
      );

    const historicalVolatility =
      this.historicalVolatility(
        closes,
        20
      );

    return {
      atr14: atr,

      bollinger20:
        this.bollingerBands(
          closes,
          20,
          2
        ),

      keltner20:
        this.keltnerChannels(
          candles,
          20,
          2
        ),

      donchian20:
        this.donchianChannels(
          candles,
          20
        ),

      historicalVolatility,

      regime:
        this.classifyRegime(
          atr,
          historicalVolatility
        )
    };
  }
};

if (typeof window !== "undefined") {
  window.VolatilityEngine =
    VolatilityEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    VolatilityEngine;
      }
