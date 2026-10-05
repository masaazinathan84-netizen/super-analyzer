"use strict";

/*
 * Database abstraction layer.
 *
 * The production database connection will be
 * configured through DATABASE_URL on the server.
 */

const Database = {
  status: "not_connected",

  connectionString: null,

  configure(connectionString) {
    this.connectionString =
      connectionString || null;

    this.status =
      this.connectionString
        ? "configured"
        : "not_configured";

    return this.status;
  },

  getStatus() {
    return {
      status: this.status
    };
  }
};

if (typeof window !== "undefined") {
  window.Database =
    Database;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = Database;
}
