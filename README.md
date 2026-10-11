# Super Analyzer

Super Analyzer is an AI-powered multi-asset market analysis project.

## Planned features

- Chart-photo upload and AI vision analysis
- Technical indicator calculations
- Candlestick analysis
- Market structure and liquidity analysis
- Bull, base and bear scenarios
- Risk-management calculations
- AI journal and monitoring
- Multi-asset market data integration
- Android application packaging

## Requirements

- Node.js
- An OpenAI API key for server-side AI analysis
- A hosting environment for the backend
- A market-data provider for live prices

## Development

Install dependencies:

npm install

Start the server:

npm start

Open the application at:

http://localhost:3000

## Environment configuration

Set your secrets in your hosting provider or local environment.

Required for chart AI analysis:

OPENAI_API_KEY

Optional model selection:

OPENAI_VISION_MODEL

Do not commit real API keys to GitHub.

## Current limitations

Live market prices, news, database persistence,
automated monitoring and additional AI providers
require their own integrations and configuration.

The interface does not guarantee that a provider
is connected simply because its component exists.

## Financial risk

AI-generated analysis can be incorrect or incomplete.
Scenarios are not guaranteed outcomes and are not
a substitute for independent risk management.
