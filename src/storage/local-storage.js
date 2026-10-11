"use strict";

const SuperAnalyzerStorage = {
  prefix: "super-analyzer:",

  save(key, value) {
    try {
      localStorage.setItem(
        this.prefix + key,
        JSON.stringify(value)
      );

      return true;
    } catch (error) {
      console.error("Storage save failed.");
      return false;
    }
  },

  load(key, fallback = null) {
    try {
      const raw = localStorage.getItem(
        this.prefix + key
      );

      if (raw === null) {
        return fallback;
      }

      return JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  },

  remove(key) {
    localStorage.removeItem(
      this.prefix + key
    );
  },

  clearAll() {
    const keys = [];

    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);

      if (
        key &&
        key.startsWith(this.prefix)
      ) {
        keys.push(key);
      }
    }

    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  }
};

if (typeof window !== "undefined") {
  window.SuperAnalyzerStorage = SuperAnalyzerStorage;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = SuperAnalyzerStorage;
  }
