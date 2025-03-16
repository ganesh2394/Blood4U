const mongoose = require("mongoose");
const Inventory = require("../models/inventoryModel");
const User = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
  try {
    const { email, inventoryType, bloodGroup, quantity, userId } = req.body;
    if (!email || !inventoryType || !bloodGroup || !quantity || !userId) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    if (inventoryType === "out") {
      const organisation = new mongoose.Types.ObjectId(userId);
      const totalIn = await getTotalBlood(organisation, bloodGroup, "in");
      const totalOut = await getTotalBlood(organisation, bloodGroup, "out");
      const availableQuantity = totalIn - totalOut;

      if (availableQuantity < quantity) {
        return res.status(400).send({
          success: false,
          message: `Only ${availableQuantity}ML of ${bloodGroup.toUpperCase()} is available`,
        });
      }
      req.body.hospital = user._id;
    } else {
      req.body.donar = user._id;
    }

    const inventory = new Inventory(req.body);
    await inventory.save();
    return res.status(201).send({
      success: true,
      message: "New Blood Record Added Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Inventory API",
      error: error.message,
    });
  }
};

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
      .populate("donar")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({ success: true, inventory });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error fetching inventory",
      error: error.message,
    });
  }
};

// GET DONORS
const getDonarsController = async (req, res) => {
  try {
    const donorId = await Inventory.distinct("donar", {
      organisation: req.body.userId,
    });
    const donars = await User.find({ _id: { $in: donorId } });
    return res.status(200).send({ success: true, donars });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error fetching donors",
      error: error.message,
    });
  }
};

// GET HOSPITAL RECORDS
const getHospitalController = async (req, res) => {
  try {
    const hospitalId = await Inventory.distinct("hospital", {
      organisation: req.body.userId,
    });
    const hospitals = await User.find({ _id: { $in: hospitalId } });
    return res.status(200).send({ success: true, hospitals });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error fetching hospitals",
      error: error.message,
    });
  }
};

// GET ORGANIZATION PROFILES
const getOrgnaisationController = async (req, res) => {
  try {
    const orgId = await Inventory.distinct("organisation", {
      donar: req.body.userId,
    });
    const organisations = await User.find({ _id: { $in: orgId } });
    return res.status(200).send({ success: true, organisations });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error fetching organizations",
      error: error.message,
    });
  }
};

// GET ORGANIZATION FOR HOSPITAL
const getOrgnaisationForHospitalController = async (req, res) => {
  try {
    const orgId = await Inventory.distinct("organisation", {
      hospital: req.body.userId,
    });
    const organisations = await User.find({ _id: { $in: orgId } });
    return res.status(200).send({ success: true, organisations });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
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
      .populate("donar hospital organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({ success: true, inventory });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
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
    return res.status(200).send({ success: true, inventory });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error fetching recent inventory",
      error: error.message,
    });
  }
};

module.exports = {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrgnaisationController,
  getOrgnaisationForHospitalController,
  getInventoryHospitalController,
  getRecentInventoryController,
};
