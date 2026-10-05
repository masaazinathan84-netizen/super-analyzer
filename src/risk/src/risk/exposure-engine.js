"use strict";

const ExposureEngine = {
  version: "1.0.0",

  calculate(
    positions = []
  ) {
    const result = {
      totalValue: 0,
      longValue: 0,
      shortValue: 0,
      byAssetType: {}
    };

    positions.forEach(
      (position) => {
        const value =
          Number(
            position.value || 0
          );

        result.totalValue +=
          Math.abs(value);

        if (
          position.side ===
          "long"
        ) {
          result.longValue +=
            Math.abs(value);
        }

        if (
          position.side ===
          "short"
        ) {
          result.shortValue +=
            Math.abs(value);
        }

        const type =
          position.assetType ||
          "unknown";

        if (
          !result.byAssetType[
            type
          ]
        ) {
          result.byAssetType[
            type
          ] = 0;
        }

        result.byAssetType[
          type
        ] += Math.abs(value);
      }
    );

    return result;
  }
};

if (typeof window !== "undefined") {
  window.ExposureEngine =
    ExposureEngine;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    ExposureEngine;
        }
