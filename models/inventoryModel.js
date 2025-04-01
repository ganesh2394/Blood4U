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
      min: [1, "Quantity must be a positive number"],
    },
    email: {
      type: String,
      required: [true, "Donor email is required"],
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Organization is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.inventoryType === "out" ? true : false; // Only required for "out" inventory
      },
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: function () {
        return this.inventoryType === "in" ? true : false; // Only required for "in" inventory
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", inventorySchema);
