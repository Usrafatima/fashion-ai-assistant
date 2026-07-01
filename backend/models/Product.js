const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Women's Collection",
        "Men's Collection",
        "New Arrivals",
        "Handbags",
        "Shoes",
        "Accessories",
      ],
    },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    sizes: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      default: [],
    },
    colors: { type: [String], default: [] },
    stock: {
      type: Map,
      of: Number,
      default: {},
      // Stock per size, e.g. { "M": 10, "L": 5 }
    },
    images: { type: [String], default: [] },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    tags: { type: [String], default: [] },
    isTrending: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.virtual("finalPrice").get(function () {
  return this.discount > 0
    ? Math.round(this.price * (1 - this.discount / 100))
    : this.price;
});

productSchema.set("toJSON", { virtuals: true });
productSchema.index({ name: "text", category: "text", tags: "text" });

module.exports = mongoose.model("Product", productSchema);
