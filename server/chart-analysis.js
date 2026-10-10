"use strict";

async function analyzeChartImage(requestBody) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not configured on the server."
    );
  }

  if (!requestBody || !requestBody.image) {
    throw new Error(
      "No chart image was provided."
    );
  }

  const image =
    requestBody.image;

if (!image.dataUrl) {
  throw new Error("Chart image data is missing.");
}

const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp"
];

if (!allowedImageTypes.includes(image.type)) {
  throw new Error("Unsupported chart image type.");
}

const imagePrefix = `data:${image.type};base64,`;

if (!image.dataUrl.startsWith(imagePrefix)) {
  throw new Error("The chart image format is invalid.");
}

const base64Content = image.dataUrl.slice(imagePrefix.length);

if (
  !base64Content ||
  !/^[A-Za-z0-9+/]+={0,2}$/.test(base64Content)
) {
  throw new Error("The chart image encoding is invalid.");
}

const estimatedImageBytes =
  Math.floor(base64Content.length * 3 / 4);

if (estimatedImageBytes > 10 * 1024 * 1024) {
  throw new Error("The chart image must be smaller than 10 MB.");
}

  const context =
    requestBody.context || {};

  const symbol =
    context.symbol || "Unknown";

  const timeframe =
    context.timeframe || "Unknown";

  const tradingMode =
    context.tradingMode || "Unknown";

  const prompt = `
You are the visual chart-analysis specialist
inside Super Analyzer.

Analyze the uploaded trading chart carefully.

IMPORTANT:
- Only describe things that are actually visible
  or strongly supported by the chart.
- Do not invent prices, indicators, patterns,
  levels or market data that cannot be seen.
- If something cannot be determined from the image,
  explicitly say so.
- Do not present predictions as guaranteed outcomes.
- Treat all future price paths as scenarios.

Known context:

Symbol:
${symbol}

Timeframe:
${timeframe}

Trading style:
${tradingMode}

Analyze the chart in this structure:

1. CHART OVERVIEW
- What asset appears to be shown
- Visible timeframe
- General chart condition

2. PRICE ACTION
- Trend
- Momentum
- Expansion
- Retracement
- Consolidation
- Rejection candles
- Important visible candlestick formations

3. MARKET STRUCTURE
- Higher highs
- Higher lows
- Lower highs
- Lower lows
- Break of structure
- Change of character
- Range boundaries

4. SUPPORT AND RESISTANCE
Identify important visible zones.
Explain why each zone matters.

5. LIQUIDITY
Look for:
- Equal highs
- Equal lows
- Liquidity sweeps
- Stop-run behavior
- Visible imbalance
- Fair value gaps
- Order blocks
- Supply/demand areas

Only report these when supported by the image.

6. TECHNICAL INDICATORS
Identify visible indicators and explain
what they currently suggest.

7. CHART PATTERNS
Check for visible:
- triangles
- flags
- channels
- wedges
- double tops
- double bottoms
- head and shoulders
- inverse head and shoulders
- rectangles
- breakouts
- failed breakouts

8. MULTI-TIMEFRAME
If multiple timeframes are visible,
compare them.
Otherwise say that multi-timeframe analysis
cannot be confirmed from this image alone.

9. BULL SCENARIO
Provide:
- trigger
- confirmation
- possible target areas
- invalidation

10. BASE SCENARIO
Provide:
- expected condition
- confirmation
- important levels
- invalidation

11. BEAR SCENARIO
Provide:
- trigger
- confirmation
- possible target areas
- invalidation

12. RISK
Explain:
- what could invalidate the analysis
- where confirmation is important
- what information is missing

13. FINAL AI VIEW
Return one of:
BULLISH
BEARISH
NEUTRAL
WAIT

Then give a concise explanation.

Do not claim certainty.
Do not claim guaranteed profits.
`;

  const response =
    await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "Authorization":
            `Bearer ${apiKey}`
        },

        body: JSON.stringify({
          model:
            process.env.OPENAI_VISION_MODEL ||
            "gpt-6-astra",

          input: [
            {
              role: "user",

              content: [
                {
                  type: "input_text",
                  text: prompt
                },

                {
                  type: "input_image",
                  image_url:
                    image.dataUrl,
                  detail: "high"
                }
              ]
            }
          ]
        })
      }
    );

  if (!response.ok) {
    const errorText =
      await response.text();

    throw new Error(
      `OpenAI chart analysis failed: ${response.status} ${errorText}`
    );
  }

  const result =
    await response.json();

  return {
    success: true,

    model:
      process.env.OPENAI_VISION_MODEL ||
      "gpt-6-astra",

  analysis:
  typeof result.output_text === "string" &&
  result.output_text.trim()
    ? result.output_text
    : "The AI returned no readable analysis. Please try another chart image.",

    responseId:
      result.id || null,

    analyzedAt:
      Date.now()
  };
}

module.exports = {
  analyzeChartImage
};
