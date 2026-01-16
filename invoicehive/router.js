const express = require("express");
const router = express.Router();

const invoice = require("./invoice/router");

router.use("/invoice", invoice);

module.exports = router;
