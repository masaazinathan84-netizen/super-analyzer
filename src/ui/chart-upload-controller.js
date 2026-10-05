"use strict";

const ChartUploadController = {
  selectedImage: null,
  analysisResult: null,

  initialize() {
    const input =
      document.getElementById("chartImageInput");

    const uploadArea =
      document.getElementById("chartUploadArea");

    if (!input || !uploadArea) {
      return;
    }

    input.addEventListener(
      "change",
      (event) => {
        const file =
          event.target.files &&
          event.target.files[0];

        if (file) {
          this.handleFile(file);
        }
      }
    );

    uploadArea.addEventListener(
      "dragover",
      (event) => {
        event.preventDefault();
        uploadArea.classList.add("dragging");
      }
    );

    uploadArea.addEventListener(
      "dragleave",
      () => {
        uploadArea.classList.remove("dragging");
      }
    );

    uploadArea.addEventListener(
      "drop",
      (event) => {
        event.preventDefault();

        uploadArea.classList.remove(
          "dragging"
        );

        const file =
          event.dataTransfer.files &&
          event.dataTransfer.files[0];

        if (file) {
          this.handleFile(file);
        }
      }
    );
  },

  async handleFile(file) {
    const status =
      document.getElementById(
        "chartUploadStatus"
      );

    try {
      if (status) {
        status.textContent =
          "Preparing chart image...";
      }

      this.selectedImage =
        await ChartImageEngine.prepareImage(
          file
        );

      this.showPreview();

      if (status) {
        status.textContent =
          "Chart ready for AI analysis.";
      }

      const analyzeButton =
        document.getElementById(
          "analyzeChartImage"
        );

      if (analyzeButton) {
        analyzeButton.disabled = false;
      }

    } catch (error) {
      if (status) {
        status.textContent =
          error.message;
      }
    }
  },

  showPreview() {
    const preview =
      document.getElementById(
        "chartImagePreview"
      );

    const image =
      document.getElementById(
        "chartPreviewImage"
      );

    if (!preview || !image) {
      return;
    }

    image.src =
      this.selectedImage.dataUrl;

    preview.hidden = false;
  },

  async analyzeChart() {
    if (!this.selectedImage) {
      return;
    }

    const status =
      document.getElementById(
        "chartUploadStatus"
      );

    const analyzeButton =
      document.getElementById(
        "analyzeChartImage"
      );

    try {
      if (analyzeButton) {
        analyzeButton.disabled = true;
        analyzeButton.textContent =
          "AI Analyzing...";
      }

      if (status) {
        status.textContent =
          "AI is analyzing candles, structure, liquidity and chart patterns...";
      }

      const result =
        await ChartImageEngine.analyze(
          this.selectedImage,
          {
            symbol:
              document.getElementById(
                "chartSymbol"
              )?.value || null,

            timeframe:
              document.getElementById(
                "chartTimeframe"
              )?.value || null,

            tradingMode:
              document.getElementById(
                "chartTradingMode"
              )?.value || null
          }
        );

      this.analysisResult = result;

      this.displayResult(result);

    } catch (error) {
      if (status) {
        status.textContent =
          error.message;
      }
    } finally {
      if (analyzeButton) {
        analyzeButton.disabled = false;
        analyzeButton.textContent =
          "Analyze Chart With AI";
      }
    }
  },

  displayResult(result) {
    const resultBox =
      document.getElementById(
        "chartAnalysisResult"
      );

    const resultText =
      document.getElementById(
        "chartAnalysisText"
      );

    if (!resultBox || !resultText) {
      return;
    }

    resultText.textContent =
      typeof result === "string"
        ? result
        : JSON.stringify(
            result,
            null,
            2
          );

    resultBox.hidden = false;
  }
};

if (typeof window !== "undefined") {
  window.ChartUploadController =
    ChartUploadController;
}
