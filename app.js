"use strict";

const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

const runAnalysisButton =
  document.getElementById("runAnalysis");

const consensusElement =
  document.getElementById("consensus");

const biasElement =
  document.getElementById("bias");

const analysisTextElement =
  document.getElementById("analysisText");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetSection = button.dataset.section;

    if (!targetSection) {
      return;
    }

    navButtons.forEach((item) => {
      item.classList.remove("active");
    });

    pages.forEach((page) => {
      page.classList.remove("active");
    });

    button.classList.add("active");

    const targetPage =
      document.getElementById(targetSection);

    if (targetPage) {
      targetPage.classList.add("active");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});

if (runAnalysisButton) {
  runAnalysisButton.addEventListener(
    "click",
    runDemoAnalysis
  );
}

async function runDemoAnalysis() {
  runAnalysisButton.disabled = true;
  runAnalysisButton.textContent = "Analyzing...";

  consensusElement.textContent = "Scanning";
  biasElement.textContent = "ANALYZING";

  analysisTextElement.textContent =
    "Super Analyzer is preparing market data, technical structure, liquidity, news and multi-timeframe context.";

  await wait(1200);

  consensusElement.textContent = "Neutral";
  biasElement.textContent = "NEUTRAL";

  analysisTextElement.textContent =
    "Demo analysis complete. The production version will combine real-time market data, technical studies, market structure, liquidity, fundamentals, current news and multiple AI opinions.";

  runAnalysisButton.disabled = false;
  runAnalysisButton.textContent = "Run AI Analysis";
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function initializeSuperAnalyzer() {
  console.log("Super Analyzer initialized.");
  console.log("AI Market Intelligence interface ready.");
}

initializeSuperAnalyzer();
