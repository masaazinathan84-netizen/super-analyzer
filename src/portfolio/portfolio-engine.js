"use strict";

const PortfolioEngine = {
  positions: [],

  addPosition(position = {}) {
    const record = {
      id:
        position.id ||
        `${Date.now()}-${Math.random()}`,

      symbol:
        position.symbol || "",

      side:
        position.side || "long",

      quantity:
        Number(position.quantity || 0),

      entry:
        Number(position.entry || 0),

      stop:
        Number(position.stop || 0),

      target:
        Number(position.target || 0),

      createdAt:
        Date.now()
    };

    this.positions.push(record);

    return record;
  },

  removePosition(id) {
    this.positions =
      this.positions.filter(
        (position) =>
          position.id !== id
      );
  },

  getPositions() {
    return [...this.positions];
  },

  exposure() {
    return this.positions.reduce(
      (total, position) =>
        total +
        Math.abs(
          position.quantity *
          position.entry
        ),
      0
    );
  }
};

if (typeof window !== "undefined") {
  window.PortfolioEngine =
    PortfolioEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    PortfolioEngine;
      }
