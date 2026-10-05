"use strict";

const SentimentEngine = {
  version: "1.0.0",

  bullishWords: [
    "surge",
    "rally",
    "growth",
    "strong",
    "bullish",
    "positive",
    "beats",
    "record",
    "upgrade",
    "optimistic",
    "recovery",
    "expansion"
  ],

  bearishWords: [
    "crash",
    "decline",
    "weak",
    "bearish",
    "negative",
    "misses",
    "downgrade",
    "recession",
    "risk",
    "loss",
    "fall",
    "contraction"
  ],

  analyze(text = "") {
    const normalized =
      String(text)
        .toLowerCase();

    let bullish = 0;
    let bearish = 0;

    this.bullishWords.forEach(
      (word) => {
        if (
          normalized.includes(word)
        ) {
          bullish += 1;
        }
      }
    );

    this.bearishWords.forEach(
      (word) => {
        if (
          normalized.includes(word)
        ) {
          bearish += 1;
        }
      }
    );

    let sentiment =
      "neutral";

    if (
      bullish > bearish
    ) {
      sentiment = "bullish";
    }

    if (
      bearish > bullish
    ) {
      sentiment = "bearish";
    }

    return {
      sentiment,
      bullishScore: bullish,
      bearishScore: bearish
    };
  }
};

if (typeof window !== "undefined") {
  window.SentimentEngine =
    SentimentEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    SentimentEngine;
    }
