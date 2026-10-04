"use strict";

const InstrumentRegistry = {
  version: "1.0.0",

  instruments: [],

  assetTypes: [
    "forex",
    "crypto",
    "stock",
    "index",
    "commodity",
    "future",
    "metal",
    "etf"
  ],

  addInstrument(data = {}) {
    const instrument = {
      id:
        data.id ||
        this.createId(
          data.symbol || "",
          data.assetType || ""
        ),

      symbol:
        data.symbol || "",

      name:
        data.name || "",

      assetType:
        data.assetType || "",

      exchange:
        data.exchange || "",

      country:
        data.country || "",

      sector:
        data.sector || "",

      baseCurrency:
        data.baseCurrency || "",

      quoteCurrency:
        data.quoteCurrency || "",

      active:
        data.active !== false,

      supportedTimeframes:
        Array.isArray(
          data.supportedTimeframes
        )
          ? data.supportedTimeframes
          : [
              "1m",
              "5m",
              "15m",
              "1h",
              "4h",
              "1d"
            ]
    };

    const existingIndex =
      this.instruments.findIndex(
        (item) =>
          item.id === instrument.id
      );

    if (existingIndex >= 0) {
      this.instruments[
        existingIndex
      ] = instrument;
    } else {
      this.instruments.push(
        instrument
      );
    }

    return instrument;
  },

  createId(symbol, assetType) {
    return (
      String(assetType)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") +
      "-" +
      String(symbol)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
    );
  },

  getBySymbol(symbol) {
    if (!symbol) {
      return null;
    }

    const normalized =
      String(symbol).toUpperCase();

    return (
      this.instruments.find(
        (instrument) =>
          instrument.symbol.toUpperCase() ===
          normalized
      ) || null
    );
  },

  getByType(assetType) {
    if (!assetType) {
      return [];
    }

    return this.instruments.filter(
      (instrument) =>
        instrument.assetType ===
        assetType
    );
  },

  search(query = "") {
    const searchTerm =
      String(query)
        .trim()
        .toLowerCase();

    if (!searchTerm) {
      return this.instruments;
    }

    return this.instruments.filter(
      (instrument) => {
        return (
          instrument.symbol
            .toLowerCase()
            .includes(searchTerm) ||
          instrument.name
            .toLowerCase()
            .includes(searchTerm) ||
          instrument.assetType
            .toLowerCase()
            .includes(searchTerm) ||
          instrument.exchange
            .toLowerCase()
            .includes(searchTerm)
        );
      }
    );
  },

  remove(symbol) {
    const normalized =
      String(symbol).toUpperCase();

    const before =
      this.instruments.length;

    this.instruments =
      this.instruments.filter(
        (instrument) =>
          instrument.symbol.toUpperCase() !==
          normalized
      );

    return (
      this.instruments.length <
      before
    );
  },

  clear() {
    this.instruments = [];
  },

  count() {
    return this.instruments.length;
  },

  loadDefaults() {
    this.clear();

    const defaults = [
      {
        symbol: "EUR/USD",
        name: "Euro / US Dollar",
        assetType: "forex",
        exchange: "FX",
        baseCurrency: "EUR",
        quoteCurrency: "USD"
      },

      {
        symbol: "GBP/USD",
        name: "British Pound / US Dollar",
        assetType: "forex",
        exchange: "FX",
        baseCurrency: "GBP",
        quoteCurrency: "USD"
      },

      {
        symbol: "USD/JPY",
        name: "US Dollar / Japanese Yen",
        assetType: "forex",
        exchange: "FX",
        baseCurrency: "USD",
        quoteCurrency: "JPY"
      },

      {
        symbol: "BTC/USD",
        name: "Bitcoin / US Dollar",
        assetType: "crypto",
        exchange: "Crypto",
        baseCurrency: "BTC",
        quoteCurrency: "USD"
      },

      {
        symbol: "ETH/USD",
        name: "Ethereum / US Dollar",
        assetType: "crypto",
        exchange: "Crypto",
        baseCurrency: "ETH",
        quoteCurrency: "USD"
      },

      {
        symbol: "AAPL",
        name: "Apple Inc.",
        assetType: "stock",
        exchange: "NASDAQ",
        country: "US",
        sector: "Technology",
        quoteCurrency: "USD"
      },

      {
        symbol: "MSFT",
        name: "Microsoft Corporation",
        assetType: "stock",
        exchange: "NASDAQ",
        country: "US",
        sector: "Technology",
        quoteCurrency: "USD"
      },

      {
        symbol: "NVDA",
        name: "NVIDIA Corporation",
        assetType: "stock",
        exchange: "NASDAQ",
        country: "US",
        sector: "Technology",
        quoteCurrency: "USD"
      },

      {
        symbol: "SPX",
        name: "S&P 500 Index",
        assetType: "index",
        exchange: "INDEX",
        country: "US",
        quoteCurrency: "USD"
      },

      {
        symbol: "NDX",
        name: "Nasdaq 100 Index",
        assetType: "index",
        exchange: "INDEX",
        country: "US",
        quoteCurrency: "USD"
      },

      {
        symbol: "XAU/USD",
        name: "Gold / US Dollar",
        assetType: "metal",
        exchange: "COMEX",
        baseCurrency: "XAU",
        quoteCurrency: "USD"
      },

      {
        symbol: "XAG/USD",
        name: "Silver / US Dollar",
        assetType: "metal",
        exchange: "COMEX",
        baseCurrency: "XAG",
        quoteCurrency: "USD"
      },

      {
        symbol: "WTI",
        name: "WTI Crude Oil",
        assetType: "commodity",
        exchange: "NYMEX",
        quoteCurrency: "USD"
      },

      {
        symbol: "BRENT",
        name: "Brent Crude Oil",
        assetType: "commodity",
        exchange: "ICE",
        quoteCurrency: "USD"
      }
    ];

    defaults.forEach(
      (instrument) => {
        this.addInstrument(
          instrument
        );
      }
    );

    return this.instruments;
  }
};

if (
  typeof window !== "undefined"
) {
  window.InstrumentRegistry =
    InstrumentRegistry;

  InstrumentRegistry.loadDefaults();
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    InstrumentRegistry;
  }
