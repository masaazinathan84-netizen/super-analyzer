savePersistent() {
  if (!window.SuperAnalyzerStorage) {
    return false;
  }

  return window.SuperAnalyzerStorage.save(
    "ai-journal",
    this.entries
  );
},

loadPersistent() {
  if (!window.SuperAnalyzerStorage) {
    return [];
  }

  const saved =
    window.SuperAnalyzerStorage.load(
      "ai-journal",
      []
    );

  this.entries =
    Array.isArray(saved) ? saved : [];

  return this.entries;
},this.savePersistent();"use strict";

const AIJournal = {
  entries: [],

  add(data = {}) {
    const entry = {
      id:
        `${Date.now()}-${Math.random()}`,

      timestamp:
        Date.now(),

      symbol:
        data.symbol || null,

      timeframe:
        data.timeframe || null,

      thesis:
        data.thesis || "",

      direction:
        data.direction || "neutral",

      evidence:
        Array.isArray(data.evidence)
          ? data.evidence
          : [],

      invalidation:
        data.invalidation || null,

      model:
        data.model || null
    };

    this.entries.push(entry);

    return entry;
  },

  forSymbol(symbol) {
    return this.entries.filter(
      (entry) =>
        entry.symbol === symbol
    );
  },

  history(symbol, limit = 100) {
    return this.forSymbol(symbol)
      .slice(-limit);
  },

  latest(symbol) {
    const items =
      this.forSymbol(symbol);

    return items.length
      ? items[items.length - 1]
      : null;
  }
};

if (typeof window !== "undefined") {
  window.AIJournal = AIJournal;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = AIJournal;
      }
