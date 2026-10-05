"use strict";

const MonitoringService = {
  running: false,

  interval: null,

  start(callback, intervalMs = 60000) {
    if (this.running) {
      return;
    }

    this.running = true;

    this.interval =
      setInterval(
        () => {

          if (
            typeof callback ===
            "function"
          ) {
            callback();
          }

        },
        intervalMs
      );
  },

  stop() {
    if (this.interval) {
      clearInterval(
        this.interval
      );
    }

    this.interval = null;

    this.running = false;
  },

  status() {
    return {
      running:
        this.running,

      intervalActive:
        Boolean(this.interval)
    };
  }
};

if (typeof window !== "undefined") {
  window.MonitoringService =
    MonitoringService;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports =
    MonitoringService;
      }
