const express = require("express");
const app = express();
const PORT = 3000;

const invoicehive = require("./invoicehive/router");

app.use("/invoicehive", invoicehive);

app.listen(PORT, () => {
  console.log(`Home server listening on port: ${PORT}`);
});
