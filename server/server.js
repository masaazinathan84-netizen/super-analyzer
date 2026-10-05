"use strict";

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT =
  process.env.PORT || 3000;

const ROOT =
  path.join(__dirname, "..");

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const server =
  http.createServer(
    (request, response) => {

      let requestPath =
        request.url.split("?")[0];

      if (requestPath === "/") {
        requestPath = "/index.html";
      }

      const filePath =
        path.normalize(
          path.join(
            ROOT,
            requestPath
          )
        );

      if (
        !filePath.startsWith(ROOT)
      ) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
      }

      fs.readFile(
        filePath,
        (error, data) => {

          if (error) {
            response.writeHead(404);
            response.end("Not found");
            return;
          }

          const extension =
            path.extname(filePath);

          response.writeHead(
            200,
            {
              "Content-Type":
                MIME_TYPES[
                  extension
                ] ||
                "application/octet-stream"
            }
          );

          response.end(data);
        }
      );
    }
  );

server.listen(
  PORT,
  () => {
    console.log(
      `Super Analyzer server running on port ${PORT}`
    );
  }
);
