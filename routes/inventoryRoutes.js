const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

// Create Inventory Entry (Add Blood) - POST
router.post("/create", authMiddleware, createInventoryController);

//Get All Blood Inventory Records - GET
router.get("/all", authMiddleware, getInventoryController);

//Get All Donors - GET
router.get("/donors", authMiddleware, getDonarsController);

//Get All Hospitals - GET
router.get("/hospitals", authMiddleware, getHospitalController);

//Get All Organizations - GET
router.get("/organizations", authMiddleware, getOrgnaisationController);

//Get Organizations for a Specific Hospital - GET
router.get(
  "/organizations-for-hospital",
  authMiddleware,
  getOrgnaisationForHospitalController
);

//Get Recent Inventory Records - GET
router.get("/recent", authMiddleware, getRecentInventoryController);

//Get Blood Inventory for a Specific Hospital - GET
router.get(
  "/hospital-inventory",
  authMiddleware,
  getInventoryHospitalController
);

module.exports = router;
