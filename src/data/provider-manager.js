"use strict";

/*
 * SUPER ANALYZER
 * Market Data Provider Manager
 *
 * This layer keeps market-data providers separate
 * from the rest of the application.
 *
 * Providers can later supply:
 * - live quotes
 * - historical candles
 * - WebSocket streams
 * - symbols
 * - market status
 * - news
 */

const MarketDataProviderManager = {
  version: "1.0.0",

  providers: {},

  activeProviders: {},

  defaultProvider: null,

  /**
   * Register a market-data provider.
   */
  registerProvider(name, provider) {
    if (!name || !provider) {
      throw new Error(
        "Provider name and provider object are required."
      );
    }

    this.providers[name] = {
      ...provider,
      name
    };

    return this.providers[name];
  },

  /**
   * Remove a provider.
   */
  unregisterProvider(name) {
    if (!name) {
      return false;
    }

    if (!this.providers[name]) {
      return false;
    }

    delete this.providers[name];

    if (this.defaultProvider === name) {
      this.defaultProvider = null;
    }

    return true;
  },

  /**
   * Get a registered provider.
   */
  getProvider(name) {
    if (!name) {
      return null;
    }

    return this.providers[name] || null;
  },

  /**
   * Set the default provider.
   */
  setDefaultProvider(name) {
    const provider = this.getProvider(name);

    if (!provider) {
      throw new Error(
        `Market data provider "${name}" is not registered.`
      );
    }

    this.defaultProvider = name;

    return provider;
  },

  /**
   * Get the default provider.
   */
  getDefaultProvider() {
    if (!this.defaultProvider) {
      return null;
    }

    return this.getProvider(
      this.defaultProvider
    );
  },

  /**
   * Enable a provider for an asset type.
   *
   * Example:
   *
   * enableForAsset("crypto", "providerName")
   */
  enableForAsset(assetType, providerName) {
    const provider =
      this.getProvider(providerName);

    if (!provider) {
      throw new Error(
        `Provider "${providerName}" is not registered.`
      );
    }

    this.activeProviders[assetType] =
      providerName;

    return provider;
  },

  /**
   * Get the provider selected for an asset.
   */
  getProviderForAsset(assetType) {
    const providerName =
      this.activeProviders[assetType];

    if (providerName) {
      return this.getProvider(providerName);
    }

    return this.getDefaultProvider();
  },

  /**
   * List all registered providers.
   */
  listProviders() {
    return Object.values(
      this.providers
    ).map((provider) => {
      return {
        name: provider.name,
        status:
          provider.status ||
          "not_connected",
        supportedAssets:
          provider.supportedAssets || [],
        supportsRealtime:
          provider.supportsRealtime === true,
        supportsHistorical:
          provider.supportsHistorical === true,
        supportsWebSocket:
          provider.supportsWebSocket === true
      };
    });
  },

  /**
   * Test provider readiness.
   */
  async checkProvider(name) {
    const provider =
      this.getProvider(name);

    if (!provider) {
      return {
        name,
        available: false,
        status: "not_registered"
      };
    }

    if (
      typeof provider.healthCheck !==
      "function"
    ) {
      return {
        name,
        available: false,
        status:
          provider.status ||
          "health_check_not_available"
      };
    }

    try {
      const result =
        await provider.healthCheck();

      return {
        name,
        available:
          result !== false,
        status:
          result === false
            ? "unavailable"
            : "online"
      };
    } catch (error) {
      return {
        name,
        available: false,
        status: "error",
        error: error.message
      };
    }
  },

  /**
   * Request a quote.
   */
  async getQuote(symbol, options = {}) {
    const assetType =
      options.assetType || null;

    const provider =
      assetType
        ? this.getProviderForAsset(
            assetType
          )
        : this.getDefaultProvider();

    if (!provider) {
      return {
        status: "no_provider",
        symbol,
        quote: null
      };
    }

    if (
      typeof provider.getQuote !==
      "function"
    ) {
      return {
        status: "unsupported",
        symbol,
        quote: null
      };
    }

    try {
      const quote =
        await provider.getQuote(
          symbol,
          options
        );

      return {
        status: "success",
        provider: provider.name,
        symbol,
        quote
      };
    } catch (error) {
      return {
        status: "error",
        provider: provider.name,
        symbol,
        quote: null,
        error: error.message
      };
    }
  },

  /**
   * Request historical candles.
   */
  async getCandles(
    symbol,
    timeframe,
    options = {}
  ) {
    const assetType =
      options.assetType || null;

    const provider =
      assetType
        ? this.getProviderForAsset(
            assetType
          )
        : this.getDefaultProvider();

    if (!provider) {
      return {
        status: "no_provider",
        symbol,
        timeframe,
        candles: []
      };
    }

    if (
      typeof provider.getCandles !==
      "function"
    ) {
      return {
        status: "unsupported",
        symbol,
        timeframe,
        candles: []
      };
    }

    try {
      const candles =
        await provider.getCandles(
          symbol,
          timeframe,
          options
        );

      return {
        status: "success",
        provider: provider.name,
        symbol,
        timeframe,
        candles:
          Array.isArray(candles)
            ? candles
            : []
      };
    } catch (error) {
      return {
        status: "error",
        provider: provider.name,
        symbol,
        timeframe,
        candles: [],
        error: error.message
      };
    }
  },

  /**
   * Start a real-time stream.
   */
  subscribe(symbol, options = {}, callback) {
    const assetType =
      options.assetType || null;

    const provider =
      assetType
        ? this.getProviderForAsset(
            assetType
          )
        : this.getDefaultProvider();

    if (!provider) {
      return {
        status: "no_provider",
        unsubscribe: () => {}
      };
    }

    if (
      typeof provider.subscribe !==
      "function"
    ) {
      return {
        status: "unsupported",
        unsubscribe: () => {}
      };
    }

    return provider.subscribe(
      symbol,
      options,
      callback
    );
  },

  /**
   * Get an overview of the data system.
   */
  getSystemStatus() {
    const providers =
      this.listProviders();

    const connected =
      providers.filter(
        (provider) =>
          provider.status === "online" ||
          provider.status === "connected"
      ).length;

    return {
      version: this.version,

      providerCount:
        providers.length,

      connectedProviders:
        connected,

      defaultProvider:
        this.defaultProvider,

      activeProviders:
        {
          ...this.activeProviders
        },

      status:
        connected > 0
          ? "connected"
          : "waiting_for_provider"
    };
  }
};


/*
 * Browser access
 */
if (typeof window !== "undefined") {
  window.MarketDataProviderManager =
    MarketDataProviderManager;
}


/*
 * Node.js access
 */
if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    MarketDataProviderManager;
}
