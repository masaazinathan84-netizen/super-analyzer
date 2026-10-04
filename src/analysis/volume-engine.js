"use strict";

const VolumeEngine = {
  version: "1.0.0",

  averageVolume(
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

    return (
      recent.reduce(
        (sum, candle) =>
          sum +
          Number(
            candle.volume || 0
          ),
        0
      ) / period
    );
  },

  relativeVolume(
    candles = [],
    period = 20
  ) {
    if (
      candles.length <
      period + 1
    ) {
      return null;
    }

    const current =
      Number(
        candles[
          candles.length - 1
        ].volume || 0
      );

    const previous =
      candles.slice(
        -(period + 1),
        -1
      );

    const average =
      previous.reduce(
        (sum, candle) =>
          sum +
          Number(
            candle.volume || 0
          ),
        0
      ) / period;

    if (average === 0) {
      return 0;
    }

    return current / average;
  },

  obv(
    candles = []
  ) {
    if (candles.length < 2) {
      return 0;
    }

    let value = 0;

    for (
      let i = 1;
      i < candles.length;
      i += 1
    ) {
      const current =
        candles[i];

      const previous =
        candles[i - 1];

      const volume =
        Number(
          current.volume || 0
        );

      if (
        current.close >
        previous.close
      ) {
        value += volume;
      } else if (
        current.close <
        previous.close
      ) {
        value -= volume;
      }
    }

    return value;
  },

  vwap(
    candles = []
  ) {
    if (candles.length === 0) {
      return null;
    }

    let priceVolume = 0;
    let volumeTotal = 0;

    candles.forEach(
      (candle) => {
        const typicalPrice =
          (candle.high +
            candle.low +
            candle.close) /
          3;

        const volume =
          Number(
            candle.volume || 0
          );

        priceVolume +=
          typicalPrice *
          volume;

        volumeTotal +=
          volume;
      }
    );

    if (volumeTotal === 0) {
      return null;
    }

    return (
      priceVolume /
      volumeTotal
    );
  },

  volumeTrend(
    candles = [],
    period = 20
  ) {
    if (
      candles.length <
      period
    ) {
      return "unknown";
    }

    const recent =
      candles.slice(-period);

    const firstHalf =
      recent.slice(
        0,
        Math.floor(
          period / 2
        )
      );

    const secondHalf =
      recent.slice(
        Math.floor(
          period / 2
        )
      );

    const firstAverage =
      this.averageVolume(
        firstHalf,
        firstHalf.length
      );

    const secondAverage =
      this.averageVolume(
        secondHalf,
        secondHalf.length
      );

    if (
      firstAverage === null ||
      secondAverage === null
    ) {
      return "unknown";
    }

    if (
      secondAverage >
      firstAverage * 1.1
    ) {
      return "increasing";
    }

    if (
      secondAverage <
      firstAverage * 0.9
    ) {
      return "decreasing";
    }

    return "stable";
  },

  analyze(candles = []) {
    return {
      averageVolume20:
        this.averageVolume(
          candles,
          20
        ),

      relativeVolume:
        this.relativeVolume(
          candles,
          20
        ),

      obv:
        this.obv(candles),

      vwap:
        this.vwap(candles),

      volumeTrend:
        this.volumeTrend(
          candles,
          20
        )
    };
  }
};

if (typeof window !== "undefined") {
  window.VolumeEngine =
    VolumeEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    VolumeEngine;
  }
