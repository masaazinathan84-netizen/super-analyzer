"use strict";

const APP_CONFIG = {
  name: "Super Analyzer",
  version: "1.0.0",
  environment: "development",

  markets: {
    forex: true,
    crypto: true,
    stocks: true,
    indices: true,
    commodities: true,
    futures: true,
    metals: true,
    etfs: true
  },

  tradingModes: {
    scalping: {
      name: "Scalping",
      primaryTimeframes: ["1m", "3m", "5m", "15m"]
    },

    dayTrading: {
      name: "Day Trading",
      primaryTimeframes: ["5m", "15m", "30m", "1h"]
    },

    swingTrading: {
      name: "Swing Trading",
      primaryTimeframes: ["1h", "4h", "1d"]
    },

    positionTrading: {
      name: "Position Trading",
      primaryTimeframes: ["4h", "1d", "1w"]
    },

    longTerm: {
      name: "Long Term",
      primaryTimeframes: ["1d", "1w", "1M"]
    }
  },

  timeframes: [
    "1m",
    "3m",
    "5m",
    "15m",
    "30m",
    "1h",
    "2h",
    "4h",
    "6h",
    "12h",
    "1d",
    "1w",
    "1M"
  ],

  analysis: {
    technicalAnalysis: true,
    candlestickAnalysis: true,
    marketStructure: true,
    liquidityAnalysis: true,
    volumeAnalysis: true,
    fibonacciAnalysis: true,
    multiTimeframeAnalysis: true,
    fundamentalAnalysis: true,
    newsAnalysis: true,
    macroAnalysis: true,
    sentimentAnalysis: true
  },

  ai: {
    primaryModel: "gpt-6-astra",
    secondOpinionModel: "gemini",
    useQuantEngine: true,
    useConsensusEngine: true,
    useScenarioEngine: true,
    requireEvidence: true
  },

  prediction: {
    scenarios: [
      "bull",
      "base",
      "bear"
    ],

    requireTrigger: true,
    requireConfirmation: true,
    requireTargets: true,
    requireInvalidation: true,

    disclaimer:
      "Predictions are scenarios based on available information and are not guaranteed outcomes."
  },

  risk: {
    enabled: true,
    maximumRiskPerTradePercent: 1,
    maximumPortfolioRiskPercent: 5,
    requireStopLoss: true,
    requireInvalidation: true
  },

  monitoring: {
    enabled: true,
    continuousMonitoring: true,
    thesisTracking: true,
    predictionTracking: true,
    newsMonitoring: true,
    structureChangeAlerts: true
  },

  scanner: {
    enabled: true,
    scanForex: true,
    scanCrypto: true,
    scanStocks: true,
    scanIndices: true,
    scanCommodities: true,
    scanFutures: true
  }
};

if (typeof window !== "undefined") {
  window.APP_CONFIG = APP_CONFIG;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = APP_CONFIG;
        }
