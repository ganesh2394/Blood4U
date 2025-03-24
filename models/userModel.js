const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["admin", "organization", "donor", "hospital"],
    },
    name: {
      type: String,
      required: function () {
        return this.role === "admin" || this.role === "donor";
      },
      default: "",
    },
    organizationName: {
      type: String,
      required: function () {
        return this.role === "organization";
      },
      default: "",
    },
    hospitalName: {
      type: String,
      required: function () {
        return this.role === "hospital";
      },
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    website: {
      type: String,
      match: [
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
        "Please enter a valid URL",
      ],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
