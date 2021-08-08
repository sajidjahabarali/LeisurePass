const express = require("express");
const data = require("./data/products.json");
const app = express();
const port = 5000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Leisure Pass Product Manager API");
});

app.get("/get-data", (req, res) => res.send(data));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
