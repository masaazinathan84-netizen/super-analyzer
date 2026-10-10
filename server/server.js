"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const {
  analyzeChartImage
} = require("./chart-analysis");

const PORT =
  Number(process.env.PORT) || 3000;

const ROOT =
  path.resolve(__dirname, "..");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

function sendJson(
  response,
  status,
  data
) {
  response.writeHead(
    status,
    {
      "Content-Type":
        "application/json; charset=utf-8"
    }
  );

  response.end(
    JSON.stringify(data)
  );
}

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    let size = 0;
    let finished = false;

    const maxBytes = 15 * 1024 * 1024;

    request.on("data", (chunk) => {
      if (finished) return;

      size += chunk.length;

      if (size > maxBytes) {
        finished = true;

        reject(
          new Error("Request body exceeds the size limit.")
        );

        request.destroy();
        return;
      }

      body += chunk.toString("utf8");
    });

    request.on("end", () => {
      if (!finished) {
        finished = true;
        resolve(body);
      }
    });

    request.on("error", (error) => {
      if (!finished) {
        finished = true;
        reject(error);
      }
    });
  });
}

function serveStatic(
  request,
  response
) {
  let requestedPath =
    decodeURIComponent(
      request.url.split("?")[0]
    );

  if (
    requestedPath === "/" ||
    requestedPath === ""
  ) {
    requestedPath = "/index.html";
  }

  const filePath =
    path.resolve(
      ROOT,
      "." + requestedPath
    );

  if (
    !filePath.startsWith(ROOT)
  ) {
    sendJson(
      response,
      403,
      {
        error:
          "Access denied."
      }
    );

    return;
  }

  fs.stat(
    filePath,
    (error, stats) => {
      if (error || !stats.isFile()) {
        sendJson(
          response,
          404,
          {
            error:
              "File not found."
          }
        );

        return;
      }

      const extension =
        path.extname(filePath)
          .toLowerCase();

      const contentType =
        MIME_TYPES[extension] ||
        "application/octet-stream";

      response.writeHead(
        200,
        {
          "Content-Type":
            contentType
        }
      );

      fs.createReadStream(
        filePath
      ).pipe(response);
    }
  );
}

const server =
  http.createServer(
    async (request, response) => {
      try {
        if (
          request.method === "POST" &&
          request.url ===
            "/api/vision/chart-analysis"
        ) {
          const body =
            await readRequestBody(
              request
            );

          let data;

          try {
            data =
              JSON.parse(body);
          } catch {
            sendJson(
              response,
              400,
              {
                error:
                  "Invalid JSON request."
              }
            );

            return;
          }

          const result =
            await analyzeChartImage(
              data
            );

          sendJson(
            response,
            200,
            result
          );

          return;
        }

        if (
          request.method !== "GET" &&
          request.method !== "HEAD"
        ) {
          sendJson(
            response,
            405,
            {
              error:
                "Method not allowed."
            }
          );

          return;
        }

        serveStatic(
          request,
          response
        );

      } catch (error) {
        console.error(
          "Server error:",
          error
        );

        sendJson(
          response,
          500,
          {
            success: false,
            error:
              error.message ||
              "Internal server error."
          }
        );
      }
    }
  );

server.listen(
  PORT,
  () => {
    console.log(
      `Super Analyzer running on port ${PORT}`
    );
  }
);
