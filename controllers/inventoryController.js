const Inventory = require("../models/inventoryModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// ===============================
// CREATE INVENTORY CONTROLLER
// ===============================
exports.createInventoryController = async (req, res) => {
  try {
    const { inventoryType, bloodGroup, quantity } = req.body;
    const userId = req.body.userId;
    const role = req.body.role;

    // Validate input
    if (!inventoryType || !bloodGroup || !quantity) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Role-based validations
    const inventoryData = {
      inventoryType: inventoryType.toLowerCase(),
      bloodGroup: bloodGroup.toUpperCase(),
      quantity,
    };

    if (role === "donor" && inventoryType === "in") {
      inventoryData.donor = userId;

      if (!req.body.organization) {
        return res.status(400).json({
          success: false,
          message: "Organization is required for donor",
        });
      }

      inventoryData.organization = req.body.organization;
    } else if (role === "hospital" && inventoryType === "out") {
      inventoryData.hospital = userId;

      if (!req.body.organization) {
        return res.status(400).json({
          success: false,
          message: "Organization is required for hospital",
        });
      }

      inventoryData.organization = req.body.organization;
    } else if (role === "organization" || role === "admin") {
      if (!req.body.organization) {
        return res.status(400).json({
          success: false,
          message: "Organization ID is required",
        });
      }

      inventoryData.organization = req.body.organization;

      if (inventoryType === "in") {
        if (!req.body.donor) {
          return res.status(400).json({
            success: false,
            message: "Donor ID is required for 'in' inventory",
          });
        }
        inventoryData.donor = req.body.donor;
      } else {
        if (!req.body.hospital) {
          return res.status(400).json({
            success: false,
            message: "Hospital ID is required for 'out' inventory",
          });
        }
        inventoryData.hospital = req.body.hospital;
      }
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to create this inventory",
      });
    }

    // ✅ Important: Add createdBy
    inventoryData.createdBy = userId;

    const inventory = await Inventory.create(inventoryData);
    return res.status(201).json({
      success: true,
      message: "Inventory created successfully",
      inventory,
    });
  } catch (error) {
    console.error("Create Inventory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating inventory",
      error,
    });
  }
};

// ===============================
// GET INVENTORY RECORDS
// ===============================
exports.getInventoryController = async (req, res) => {
  try {
    const role = req.body.role;
    const userId = req.body.userId;

    let filters = {};
    if (role === "organization") {
      filters.organization = userId;
    } else if (role === "hospital") {
      filters.hospital = userId;
    } else if (role === "donor") {
      filters.donor = userId;
    }

    const records = await Inventory.find(filters)
      .populate("organization", "organizationName")
      .populate("hospital", "hospitalName")
      .populate("donor", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Inventory records fetched",
      inventory: records,
    });
  } catch (error) {
    console.error("Get Inventory Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching inventory",
      error,
    });
  }
};

// ===============================
// GET RECENT INVENTORY RECORDS
// ===============================
exports.getRecentInventoryController = async (req, res) => {
  try {
    const recent = await Inventory.find({})
      .populate("organization hospital donor", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      message: "Recent inventory records",
      inventory: recent,
    });
  } catch (error) {
    console.error("Recent Inventory Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recent inventory",
      error,
    });
  }
};

// ===============================
// GET DONORS LIST
// ===============================
exports.getDonorsController = async (req, res) => {
  try {
    const donors = await User.find({ role: "donor" }).select("-password");
    console.log("List of Donors : ", donors);
    res.status(200).json({
      success: true,
      message: "Donor list fetched",
      donors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching donors",
      error,
    });
  }
};

// ===============================
// GET HOSPITALS LIST
// ===============================
exports.getHospitalController = async (req, res) => {
  try {
    const hospitals = await User.find({ role: "hospital" }).select("-password");
    console.log("List of Hos : ", hospitals);
    res.status(200).json({
      success: true,
      message: "Hospital list fetched",
      hospitals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching hospitals",
      error,
    });
  }
};

// ===============================
// GET ORGANIZATION LIST
// ===============================
exports.getOrganizationController = async (req, res) => {
  try {
    const orgs = await User.find({ role: "organization" }).select("-password");
    console.log("List of Orgs : ", orgs);
    res.status(200).json({
      success: true,
      message: "Organizations fetched",
      organizations: orgs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching organizations",
      error,
    });
  }
};

// ===============================
// GET ORGANIZATION FOR HOSPITAL
// ===============================
exports.getOrganizationForHospitalController = async (req, res) => {
  try {
    const orgs = await User.find({ role: "organization" }).select("-password");
    res.status(200).json({
      success: true,
      message: "Organizations available for hospital",
      organizations: orgs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching organizations",
      error,
    });
  }
};

// ===============================
// HOSPITAL INVENTORY RECORDS
// ===============================
exports.getInventoryHospitalController = async (req, res) => {
  try {
    const { hospitalId } = req.body;
    if (!hospitalId) {
      return res.status(400).json({
        success: false,
        message: "Hospital ID is required",
      });
    }

    const inventory = await Inventory.find({ hospital: hospitalId })
      .populate("organization", "name email")
      .populate("donor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Hospital inventory records fetched",
      inventory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching hospital inventory",
      error,
    });
  }
};

// ===============================
// UPDATE INVENTORY
// ===============================
exports.updateInventoryController = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Inventory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Inventory updated successfully",
      inventory: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating inventory",
      error,
    });
  }
};

// ===============================
// DELETE INVENTORY
// ===============================
exports.deleteInventoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await Inventory.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Inventory deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting inventory",
      error,
    });
  }
};

// ===============================
// Hospital Request for Blood
// ===============================
exports.getHospitalRequestsController = async (req, res) => {
  try {
    const hospitalEmail = req.body.email || req.user.email;
    console.log("Hos email : ", hospitalEmail);

    const requests = await Inventory.find({
      inventoryType: "out",
      email: hospitalEmail,
    }).populate("organization"); // if you're storing org ID
    console.log("User Req : ", requests);

    res.status(200).json({ success: true, requests });
  } catch (error) {
    console.error("Error fetching hospital blood requests", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
