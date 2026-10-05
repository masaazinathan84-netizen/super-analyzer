"use strict";

const NewsEngine = {
  version: "1.0.0",

  articles: [],

  add(article = {}) {
    const normalized = {
      id:
        article.id ||
        `${Date.now()}-${Math.random()}`,

      title:
        article.title || "",

      source:
        article.source || "",

      url:
        article.url || "",

      timestamp:
        Number(article.timestamp) ||
        Date.now(),

      symbols:
        Array.isArray(article.symbols)
          ? article.symbols
          : [],

      sentiment:
        article.sentiment ||
        "neutral",

      importance:
        article.importance ||
        "normal",

      summary:
        article.summary || ""
    };

    this.articles.unshift(
      normalized
    );

    this.articles =
      this.articles.slice(0, 5000);

    return normalized;
  },

  getLatest(limit = 50) {
    return this.articles.slice(
      0,
      limit
    );
  },

  forSymbol(symbol) {
    return this.articles.filter(
      (article) =>
        article.symbols.includes(symbol)
    );
  },

  summarize(symbol) {
    const articles =
      this.forSymbol(symbol);

    let bullish = 0;
    let bearish = 0;
    let neutral = 0;

    articles.forEach((article) => {
      if (article.sentiment === "bullish") {
        bullish += 1;
      } else if (
        article.sentiment === "bearish"
      ) {
        bearish += 1;
      } else {
        neutral += 1;
      }
    });

    return {
      symbol,
      articleCount: articles.length,
      bullish,
      bearish,
      neutral
    };
  }
};

if (typeof window !== "undefined") {
  window.NewsEngine = NewsEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = NewsEngine;
  }
