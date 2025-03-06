const express = require("express");
const router = express.Router();
const { getRequestById } = require("../controller/detailsController");

router.get("/:id", getRequestById);

module.exports = router;