"use strict";

const WebSocketManager = {
  version: "1.0.0",

  connections: {},

  subscribers: {},

  connect(name, url, options = {}) {
    if (!name || !url) {
      throw new Error("Connection name and URL are required.");
    }

    if (typeof WebSocket === "undefined") {
      return {
        status: "unsupported",
        name
      };
    }

    const socket = new WebSocket(url);

    this.connections[name] = {
      socket,
      name,
      url,
      status: "connecting",
      reconnect: options.reconnect !== false,
      reconnectDelay: options.reconnectDelay || 3000
    };

    socket.onopen = () => {
      this.connections[name].status = "connected";
      this.emit(name, {
        type: "connection",
        status: "connected"
      });
    };

    socket.onmessage = (event) => {
      let data = event.data;

      try {
        data = JSON.parse(event.data);
      } catch (_) {
        // Keep raw message.
      }

      this.emit(name, data);
    };

    socket.onerror = (error) => {
      this.connections[name].status = "error";

      this.emit(name, {
        type: "error",
        error
      });
    };

    socket.onclose = () => {
      if (this.connections[name]) {
        this.connections[name].status = "closed";
      }

      this.emit(name, {
        type: "connection",
        status: "closed"
      });
    };

    return {
      status: "connecting",
      name
    };
  },

  subscribe(name, callback) {
    if (!this.subscribers[name]) {
      this.subscribers[name] = [];
    }

    this.subscribers[name].push(callback);

    return () => {
      this.subscribers[name] =
        this.subscribers[name].filter(
          (item) => item !== callback
        );
    };
  },

  emit(name, data) {
    const listeners =
      this.subscribers[name] || [];

    listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(error);
      }
    });
  },

  send(name, data) {
    const connection =
      this.connections[name];

    if (
      !connection ||
      !connection.socket ||
      connection.socket.readyState !== WebSocket.OPEN
    ) {
      return false;
    }

    connection.socket.send(
      typeof data === "string"
        ? data
        : JSON.stringify(data)
    );

    return true;
  },

  disconnect(name) {
    const connection =
      this.connections[name];

    if (!connection) {
      return false;
    }

    connection.socket.close();

    delete this.connections[name];

    return true;
  },

  getStatus() {
    return Object.values(
      this.connections
    ).map((connection) => ({
      name: connection.name,
      url: connection.url,
      status: connection.status
    }));
  }
};

if (typeof window !== "undefined") {
  window.WebSocketManager =
    WebSocketManager;
}

if (
  typeof module !== "undefined" &&
  module.exports
) {
  module.exports = WebSocketManager;
  }
