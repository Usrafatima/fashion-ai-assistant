const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    label: { type: String, default: "Home" },
    fullAddress: { type: String, required: true },
    city: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const customerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    instagramId: { type: String, trim: true, sparse: true },
    whatsappId: { type: String, trim: true, sparse: true },
    addresses: { type: [addressSchema], default: [] },
    orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    preferences: {
      gender: { type: String, enum: ["Men", "Women", "Unisex"] },
      favoriteColors: { type: [String], default: [] },
      favoriteCategories: { type: [String], default: [] },
      budgetRange: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
      },
      preferredSize: { type: String },
    },
    language: { type: String, enum: ["en", "ur"], default: "en" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
