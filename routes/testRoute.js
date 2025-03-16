const express = require("express");

const { testResponse, testError } = require("../controllers/testController");

const router = express.Router();

router.get("/success", testResponse);
router.get("/error", testError);

module.exports = router;
