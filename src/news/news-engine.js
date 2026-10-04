"use strict";

const NewsEngine = {
  version: "1.0.0",

  articles: [],

  addArticle(article = {}) {
    const item = {
      id:
        article.id ||
        Date.now() +
          "-" +
          Math.random()
            .toString(36)
            .slice(2),

      title:
        article.title || "",

      description:
        article.description || "",

      source:
        article.source || "",

      url:
        article.url || "",

      publishedAt:
        article.publishedAt ||
        Date.now(),

      symbols:
        Array.isArray(
          article.symbols
        )
          ? article.symbols
          : [],

      sentiment:
        article.sentiment ||
        "neutral",

      impact:
        article.impact ||
        "low"
    };

    this.articles.push(item);

    return item;
  },

  getLatest(limit = 20) {
    return this.articles
      .slice()
      .sort(
        (a, b) =>
          b.publishedAt -
          a.publishedAt
      )
      .slice(0, limit);
  },

  getForSymbol(
    symbol,
    limit = 20
  ) {
    const normalized =
      String(symbol)
        .toUpperCase();

    return this.articles
      .filter(
        (article) =>
          article.symbols
            .map((item) =>
              String(item)
                .toUpperCase()
            )
            .includes(normalized)
      )
      .sort(
        (a, b) =>
          b.publishedAt -
          a.publishedAt
      )
      .slice(0, limit);
  },

  filterByImpact(
    impact
  ) {
    return this.articles.filter(
      (article) =>
        article.impact ===
        impact
    );
  },

  clear() {
    this.articles = [];
  }
};

if (typeof window !== "undefined") {
  window.NewsEngine =
    NewsEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    NewsEngine;
      }
