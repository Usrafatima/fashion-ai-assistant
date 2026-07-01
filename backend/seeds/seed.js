require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const Order = require("../models/Order");

const products = [
  {
    name: "Black Embroidered Maxi",
    category: "Women's Collection",
    price: 4999,
    description: "Elegant black embroidered maxi dress, perfect for Eid and formal occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    stock: { S: 5, M: 10, L: 8, XL: 3 },
    images: [],
    discount: 0,
    rating: 4.5,
    tags: ["dress", "formal", "eid", "black"],
    isTrending: true,
  },
  {
    name: "Black Chiffon Dress",
    category: "Women's Collection",
    price: 5499,
    description: "Flowy black chiffon dress with delicate detailing.",
    sizes: ["S", "M", "L"],
    colors: ["Black"],
    stock: { S: 4, M: 6, L: 4 },
    images: [],
    discount: 10,
    rating: 4.3,
    tags: ["dress", "formal", "eid", "black"],
  },
  {
    name: "Classic Black Jeans",
    category: "Men's Collection",
    price: 3299,
    description: "Slim-fit black denim jeans.",
    sizes: ["M", "L", "XL"],
    colors: ["Black"],
    stock: { M: 12, L: 15, XL: 7 },
    images: [],
    tags: ["jeans", "casual", "black"],
    isBestSeller: true,
  },
  {
    name: "Leather Belt",
    category: "Accessories",
    price: 1499,
    description: "Genuine leather belt with metal buckle.",
    sizes: [],
    colors: ["Black", "Brown"],
    stock: { M: 20 },
    images: [],
    tags: ["belt", "accessory"],
  },
  {
    name: "White Sneakers",
    category: "Shoes",
    price: 2999,
    description: "Comfortable everyday white sneakers.",
    sizes: [],
    colors: ["White"],
    stock: { M: 10 },
    images: [],
    tags: ["shoes", "sneakers", "casual"],
    isTrending: true,
  },
];

const customers = [
  {
    name: "Ayesha Khan",
    phone: "+923001234567",
    instagramId: "ayesha.khan",
    addresses: [
      { label: "Home", fullAddress: "House 12, Street 5, F-10", city: "Islamabad", isDefault: true },
    ],
    preferences: {
      gender: "Women",
      favoriteColors: ["Black", "Beige"],
      favoriteCategories: ["Women's Collection"],
      budgetRange: { min: 2000, max: 6000 },
      preferredSize: "M",
    },
    language: "ur",
  },
  {
    name: "Bilal Ahmed",
    phone: "+923007654321",
    whatsappId: "+923007654321",
    addresses: [
      { label: "Home", fullAddress: "Flat 4B, Gulberg III", city: "Lahore", isDefault: true },
    ],
    preferences: {
      gender: "Men",
      favoriteColors: ["Black", "Navy"],
      favoriteCategories: ["Men's Collection"],
      budgetRange: { min: 1000, max: 4000 },
      preferredSize: "L",
    },
    language: "en",
  },
];

async function seed() {
  await connectDB();

  await Promise.all([
    Product.deleteMany({}),
    Customer.deleteMany({}),
    Order.deleteMany({}),
  ]);

  const createdProducts = await Product.insertMany(products);
  const createdCustomers = await Customer.insertMany(customers);

  const order = await Order.create({
    customer: createdCustomers[0]._id,
    products: [
      {
        product: createdProducts[0]._id,
        quantity: 1,
        size: "M",
        color: "Black",
        priceAtOrder: createdProducts[0].price,
      },
    ],
    totalAmount: createdProducts[0].price,
    shippingAddress: {
      fullAddress: createdCustomers[0].addresses[0].fullAddress,
      city: createdCustomers[0].addresses[0].city,
    },
    status: "Confirmed",
    paymentStatus: "Unpaid",
    paymentMethod: "COD",
    trackingNumber: "TRK1001",
    source: "Instagram",
  });

  createdCustomers[0].orderHistory.push(order._id);
  await createdCustomers[0].save();

  console.log(`Seeded ${createdProducts.length} products, ${createdCustomers.length} customers, 1 order.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
