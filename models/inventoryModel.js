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
      default: 1,
    },

    // Org/Donor/Hospital are all Users with different roles
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // organization role
      required: [true, "Organization is required"],
    },

    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // hospital role
      default: null,
      validate: {
        validator: function (value) {
          return this.inventoryType === "out" ? !!value : true;
        },
        message: "Hospital is required for 'out' inventory",
      },
    },

    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // donor role
      default: null,
      validate: {
        validator: function (value) {
          return this.inventoryType === "in" ? !!value : true;
        },
        message: "Donor is required for 'in' inventory",
      },
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // whoever submitted the form
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware to ensure case consistency
inventorySchema.pre("save", function (next) {
  if (this.inventoryType) {
    this.inventoryType = this.inventoryType.toLowerCase();
  }
  if (this.bloodGroup) {
    this.bloodGroup = this.bloodGroup.toUpperCase();
  }
  next();
});

module.exports = mongoose.model("Inventory", inventorySchema);
