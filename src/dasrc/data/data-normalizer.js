"use strict";

const DataNormalizer = {
  version: "1.0.0",

  normalizeQuote(data = {}) {
    return {
      symbol: String(
        data.symbol ||
        data.ticker ||
        ""
      ).toUpperCase(),

      bid: this.toNumber(
        data.bid
      ),

      ask: this.toNumber(
        data.ask
      ),

      last: this.toNumber(
        data.last ||
        data.price ||
        data.close
      ),

      volume: this.toNumber(
        data.volume
      ),

      timestamp:
        this.normalizeTimestamp(
          data.timestamp ||
          data.time ||
          data.datetime
        )
    };
  },

  normalizeCandle(data = {}) {
    return {
      timestamp:
        this.normalizeTimestamp(
          data.timestamp ||
          data.time ||
          data.datetime
        ),

      open: this.toNumber(
        data.open ||
        data.o
      ),

      high: this.toNumber(
        data.high ||
        data.h
      ),

      low: this.toNumber(
        data.low ||
        data.l
      ),

      close: this.toNumber(
        data.close ||
        data.c
      ),

      volume: this.toNumber(
        data.volume ||
        data.v
      ),

      timeframe:
        data.timeframe ||
        data.interval ||
        "1h"
    };
  },

  normalizeCandles(
    candles = []
  ) {
    if (!Array.isArray(candles)) {
      return [];
    }

    return candles
      .map((candle) =>
        this.normalizeCandle(
          candle
        )
      )
      .filter((candle) => {
        return (
          candle.timestamp > 0 &&
          candle.high >=
            candle.low
        );
      })
      .sort(
        (a, b) =>
          a.timestamp -
          b.timestamp
      );
  },

  normalizeInstrument(
    data = {}
  ) {
    return {
      symbol: String(
        data.symbol ||
        data.ticker ||
        ""
      ).toUpperCase(),

      name:
        data.name ||
        data.description ||
        "",

      assetType:
        data.assetType ||
        data.type ||
        "",

      exchange:
        data.exchange ||
        data.mic ||
        "",

      country:
        data.country ||
        "",

      currency:
        data.currency ||
        data.quoteCurrency ||
        "USD",

      active:
        data.active !== false
    };
  },

  normalizeNews(
    data = {}
  ) {
    return {
      id:
        data.id ||
        this.createNewsId(
          data
        ),

      title:
        data.title ||
        data.headline ||
        "",

      description:
        data.description ||
        data.summary ||
        "",

      source:
        data.source ||
        data.publisher ||
        "",

      url:
        data.url ||
        data.link ||
        "",

      publishedAt:
        this.normalizeTimestamp(
          data.publishedAt ||
          data.published_at ||
          data.datetime
        ),

      symbols:
        Array.isArray(
          data.symbols
        )
          ? data.symbols
          : [],

      sentiment:
        data.sentiment ||
        "neutral"
    };
  },

  createNewsId(
    data = {}
  ) {
    const text =
      data.title ||
      data.headline ||
      "news";

    return (
      text
        .toLowerCase()
        .replace(
          /[^a-z0-9]+/g,
          "-"
        )
        .slice(0, 80) +
      "-" +
      Date.now()
    );
  },

  normalizeTimestamp(
    value
  ) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return Date.now();
    }

    if (
      typeof value ===
      "number"
    ) {
      if (
        value < 10000000000
      ) {
        return value * 1000;
      }

      return value;
    }

    const parsed =
      Date.parse(value);

    if (
      Number.isNaN(parsed)
    ) {
      return Date.now();
    }

    return parsed;
  },

  toNumber(value) {
    const number =
      Number(value);

    if (
      Number.isFinite(number)
    ) {
      return number;
    }

    return 0;
  }
};

if (
  typeof window !== "undefined"
) {
  window.DataNormalizer =
    DataNormalizer;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    DataNormalizer;
  }
