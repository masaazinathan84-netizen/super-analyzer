"use strict";

const AIProviderManager = {
  providers: {},

  register(name, provider) {
    if (!name || !provider) {
      throw new Error(
        "AI provider name and provider are required."
      );
    }

    this.providers[name] = {
      ...provider,
      name
    };

    return this.providers[name];
  },

  get(name) {
    return this.providers[name] || null;
  },

  list() {
    return Object.values(
      this.providers
    ).map((provider) => ({
      name: provider.name,
      model: provider.model || "",
      status:
        provider.status ||
        "not_connected"
    }));
  },

  async analyze(name, request) {
    const provider =
      this.get(name);

    if (!provider) {
      return {
        status: "not_registered"
      };
    }

    if (
      typeof provider.analyze !==
      "function"
    ) {
      return {
        status: "unsupported"
      };
    }

    try {
      return await provider.analyze(
        request
      );
    } catch (error) {
      return {
        status: "error",
        error: error.message
      };
    }
  }
};

if (typeof window !== "undefined") {
  window.AIProviderManager =
    AIProviderManager;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    AIProviderManager;
  }
