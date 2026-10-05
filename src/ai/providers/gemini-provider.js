"use strict";

/*
 * Gemini credentials belong on the server.
 * Never expose a production API key in browser code.
 */

const GeminiProvider = {
  name: "Google Gemini",

  model: "gemini",

  status: "backend_required",

  async analyze(request = {}) {
    const response =
      await fetch(
        "/api/ai/gemini",
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
        `Gemini request failed: ${response.status}`
      );
    }

    return response.json();
  }
};

if (typeof window !== "undefined") {
  window.GeminiProvider =
    GeminiProvider;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    GeminiProvider;
  }
