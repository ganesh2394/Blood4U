const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "Inventory type is required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      required: [true, "Blood quantity is required"],
    },
    email: {
      type: String,
      required: [true, "Donor email is required"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Organisation is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.inventoryType === "out" ? true : false;
      },
    },
    donar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.inventoryType === "in" ? true : false;
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
