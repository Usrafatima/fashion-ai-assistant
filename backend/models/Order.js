const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    size: { type: String },
    color: { type: String },
    priceAtOrder: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    products: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    shippingAddress: {
      fullAddress: { type: String, required: true },
      city: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled", "Returned"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Unpaid", "Paid", "Refunded"],
      default: "Unpaid",
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Card", "BankTransfer"],
      default: "COD",
    },
    trackingNumber: { type: String, trim: true },
    source: { type: String, enum: ["Instagram", "WhatsApp", "Website"], default: "WhatsApp" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
