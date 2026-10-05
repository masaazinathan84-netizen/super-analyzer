"use strict";

const SymbolRegistry = {
  symbols: {},

  register(symbol) {
    if (!symbol.symbol) {
      return null;
    }

    this.symbols[symbol.symbol] = {
      symbol: symbol.symbol,
      name: symbol.name || symbol.symbol,
      assetType: symbol.assetType || "unknown",
      exchange: symbol.exchange || "",
      currency: symbol.currency || "",
      active: symbol.active !== false
    };

    return this.symbols[symbol.symbol];
  },

  get(symbol) {
    return this.symbols[symbol] || null;
  },

  all() {
    return Object.values(this.symbols);
  },

  byAssetType(assetType) {
    return this.all().filter(
      (item) =>
        item.assetType === assetType
    );
  },

  search(query) {
    const value =
      String(query || "").toLowerCase();

    return this.all().filter(
      (item) =>
        item.symbol
          .toLowerCase()
          .includes(value) ||
        item.name
          .toLowerCase()
          .includes(value)
    );
  }
};

if (typeof window !== "undefined") {
  window.SymbolRegistry =
    SymbolRegistry;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = SymbolRegistry;
  }
