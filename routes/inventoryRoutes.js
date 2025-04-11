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
  deleteInventoryController,
  updateInventoryController,
  getHospitalRequestsController,
  getInventoryAnalytics,
} = require("../controllers/inventoryController");

const router = express.Router();

// -----------------------------
// Create Inventory Routes
// -----------------------------

// Donor creates IN inventory (blood donation)
router.post(
  "/create-in",
  authMiddleware,
  roleMiddleware(["donor"]),
  createInventoryController
);

// Hospital creates OUT inventory (blood request)
router.post(
  "/create-out",
  authMiddleware,
  roleMiddleware(["hospital"]),
  createInventoryController
);

// Admin and organization can also create inventory (in or out)
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin", "organization"]),
  createInventoryController
);

// -----------------------------
// Get Inventory Records
// -----------------------------

// Get all inventory records (for all roles with respective filters)
router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["admin", "hospital", "organization", "donor"]),
  getInventoryController
);

// Get hospital-specific inventory
router.post(
  "/hospital-inventory",
  authMiddleware,
  roleMiddleware(["admin", "hospital"]),
  getInventoryHospitalController
);

// Get recent inventory activity (admin, hospital, org)
router.get(
  "/recent",
  authMiddleware,
  roleMiddleware(["admin", "hospital", "organization"]),
  getRecentInventoryController
);

// -----------------------------
// Get User Roles Related
// -----------------------------

// Get donor list for admin/org
router.get(
  "/donors",
  authMiddleware,
  roleMiddleware(["admin", "organization"]),
  getDonorsController
);

// Get hospital list for admin/org
router.get(
  "/hospitals",
  authMiddleware,
  roleMiddleware(["admin", "organization"]),
  getHospitalController
);

// Get organization list (for donor/admin)
router.get(
  "/organizations",
  authMiddleware,
  roleMiddleware(["admin", "donor"]),
  getOrganizationController
);

// Get organizations allowed for a hospital (hospital/admin)
router.get(
  "/organizations/hospital",
  authMiddleware,
  roleMiddleware(["admin", "hospital"]),
  getOrganizationForHospitalController
);

// -----------------------------
// Modify Inventory
// -----------------------------

// Update inventory (admin, hospital, organization)
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["admin", "hospital", "organization"]),
  updateInventoryController
);

// Delete inventory
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin", "hospital", "organization"]),
  deleteInventoryController
);

router.get(
  "/hospital-requests",
  authMiddleware,
  roleMiddleware(["hospital"]),
  getHospitalRequestsController
);
// Analytics route to get in/out quantity and available stock per blood group
router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware(["admin", "organization"]),
  getInventoryAnalytics
);

module.exports = router;
