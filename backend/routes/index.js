let express = require("express");
let router = express.Router();
const path = require("path");
const crypto = require("crypto");

/* GET home page. */
router.get("/", function(req, res, next) {
  const id = crypto.randomBytes(16).toString("hex");
  res.cookie("u", id, { signed: true });
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});

module.exports = router;
