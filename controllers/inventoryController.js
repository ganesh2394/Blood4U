const mongoose = require("mongoose");
const Inventory = require("../models/inventoryModel");
const User = require("../models/userModel");

// CREATE INVENTORY ENTRY
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, bloodGroup, quantity, userId } = req.body;
    if (!email || !inventoryType || !bloodGroup || !quantity || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (inventoryType === "out") {
      const organisation = new mongoose.Types.ObjectId(userId);
      const totalIn = await getTotalBlood(organisation, bloodGroup, "in");
      const totalOut = await getTotalBlood(organisation, bloodGroup, "out");
      const availableQuantity = totalIn - totalOut;

      if (availableQuantity < quantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${availableQuantity}ML of ${bloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user._id;
    } else {
      req.body.donor = user._id;
    }

    const inventory = new Inventory(req.body);
    await inventory.save();
    return res
      .status(201)
      .json({ success: true, message: "New blood record added successfully" });
  } catch (error) {
    console.error("Create Inventory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in Create Inventory API",
      error: error.message,
    });
  }
};

// Utility function to get total blood quantity
const getTotalBlood = async (organisation, bloodGroup, type) => {
  const total = await Inventory.aggregate([
    { $match: { organisation, inventoryType: type, bloodGroup } },
    { $group: { _id: "$bloodGroup", total: { $sum: "$quantity" } } },
  ]);
  return total[0]?.total || 0;
};

// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
  try {
    const inventory = await Inventory.find({ organisation: req.body.userId })
      .populate("donor hospital")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, inventory });
  } catch (error) {
    console.error("Fetch Inventory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching inventory",
      error: error.message,
    });
  }
};

// GET DONORS
const getDonorsController = async (req, res) => {
  try {
    const donorIds = await Inventory.distinct("donor", {
      organisation: req.body.userId,
    });
    const donors = await User.find({ _id: { $in: donorIds } });
    return res.status(200).json({ success: true, donors });
  } catch (error) {
    console.error("Fetch Donors Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching donors",
      error: error.message,
    });
  }
};

// GET HOSPITALS
const getHospitalController = async (req, res) => {
  try {
    const hospitalIds = await Inventory.distinct("hospital", {
      organisation: req.body.userId,
    });
    const hospitals = await User.find({ _id: { $in: hospitalIds } });
    return res.status(200).json({ success: true, hospitals });
  } catch (error) {
    console.error("Fetch Hospitals Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching hospitals",
      error: error.message,
    });
  }
};

// GET ORGANIZATIONS
const getOrganizationController = async (req, res) => {
  try {
    const orgIds = await Inventory.distinct("organisation", {
      donor: req.body.userId,
    });
    const organizations = await User.find({ _id: { $in: orgIds } });
    return res.status(200).json({ success: true, organizations });
  } catch (error) {
    console.error("Fetch Organizations Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching organizations",
      error: error.message,
    });
  }
};

// GET ORGANIZATIONS FOR A HOSPITAL
const getOrganizationForHospitalController = async (req, res) => {
  try {
    const orgIds = await Inventory.distinct("organisation", {
      hospital: req.body.userId,
    });
    const organizations = await User.find({ _id: { $in: orgIds } });
    return res.status(200).json({ success: true, organizations });
  } catch (error) {
    console.error("Fetch Hospital Organizations Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching hospital organizations",
      error: error.message,
    });
  }
};

// GET HOSPITAL BLOOD RECORDS
const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await Inventory.find(req.body.filters)
      .populate("donor hospital organisation")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, inventory });
  } catch (error) {
    console.error("Fetch Hospital Inventory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching hospital inventory",
      error: error.message,
    });
  }
};

// GET RECENT BLOOD RECORDS
const getRecentInventoryController = async (req, res) => {
  try {
    const inventory = await Inventory.find({ organisation: req.body.userId })
      .limit(5)
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, inventory });
  } catch (error) {
    console.error("Fetch Recent Inventory Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching recent inventory",
      error: error.message,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonorsController,
  getHospitalController,
  getOrganizationController,
  getOrganizationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
