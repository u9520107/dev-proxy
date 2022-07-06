const fs = require("fs");
const proxy = require("http-proxy");

// generic dev server
const server = proxy.createProxyServer({
  target: "http://192.168.50.202:8080",
  ws: true,
  secure: false,
});

server.on("error", (error) => {
  console.error(error);
});
server.listen("8080");

// generic dev server
const addinServer = proxy.createProxyServer({
  target: "https://192.168.50.202:3000",
  ws: true,
  secure: false,
  ssl: {
    cert: fs.readFileSync("cert.pem"),
    key: fs.readFileSync("key.pem"),
  },
});

addinServer.on("error", (error) => {
  console.error(error);
});
addinServer.listen("3000");

// brand config server

const brandConfigServer = proxy.createProxyServer({
  target: "https://192.168.50.202:8082",
  secure: false,
  ssl: {
    cert: fs.readFileSync("cert.pem"),
    key: fs.readFileSync("key.pem"),
  },
});
brandConfigServer.on("error", (error) => {
  console.error(error);
});
brandConfigServer.listen("8082");

const sfServer = proxy.createProxyServer({
  target: "https://192.168.50.202:8201",
  secure: false,
  ws: true,
  ssl: {
    cert: fs.readFileSync("cert.pem"),
    key: fs.readFileSync("key.pem"),
  },
});
sfServer.on("error", (error) => {
  console.error(error);
});
sfServer.listen("8201");
