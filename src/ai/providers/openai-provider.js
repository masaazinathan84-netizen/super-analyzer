"use strict";

/*
 * API keys must NEVER be stored in this file.
 *
 * Production requests should go through
 * the Super Analyzer backend.
 */

const OpenAIProvider = {
  name: "OpenAI",

  model: "gpt-6-astra",

  status: "backend_required",

  async analyze(request = {}) {
    const response =
      await fetch(
        "/api/ai/openai",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify(request)
        }
      );

    if (!response.ok) {
      throw new Error(
        `OpenAI request failed: ${response.status}`
      );
    }

    return response.json();
  }
};

if (typeof window !== "undefined") {
  window.OpenAIProvider =
    OpenAIProvider;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    OpenAIProvider;
  }
