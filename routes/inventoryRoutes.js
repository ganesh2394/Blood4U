const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonorsController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
} = require("../controllers/inventoryController");

const router = express.Router();

//Only Admin, Hospital, and Organization can create inventory
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin", "hospital", "organization"]),
  createInventoryController
);

//Any authenticated user can view inventory
router.get("/all", authMiddleware, getInventoryController);

//Only Admin can view donors
router.get(
  "/donors",
  authMiddleware,
  roleMiddleware(["admin"]),
  getDonorsController
);

//Only Admin can view hospitals
router.get(
  "/hospitals",
  authMiddleware,
  roleMiddleware(["admin"]),
  getHospitalController
);

//Only Admin can view organizations
router.get(
  "/organizations",
  authMiddleware,
  roleMiddleware(["admin"]),
  getOrganizationController
);

//Organizations assigned to a hospital
router.get(
  "/organizations-for-hospital",
  authMiddleware,
  roleMiddleware(["admin", "hospital"]),
  getOrganizationForHospitalController
);

//Only hospitals can view their inventory
router.get(
  "/hospital-inventory",
  authMiddleware,
  roleMiddleware(["hospital"]),
  getInventoryHospitalController
);

// Any authenticated user can view recent inventory
router.get("/recent", authMiddleware, getRecentInventoryController);

module.exports = router;
