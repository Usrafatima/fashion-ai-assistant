// Mock product data — stand-in until Database Designer's MongoDB schema is live.
// Field names intentionally mirror the spec's Products collection so the swap
// to real Mongo later only requires changing productRepository.js, not this shape.

const mockProducts = [
  {
    id: "p001",
    name: "Black Embroidered Maxi",
    category: "Women's Dresses",
    price: 4999,
    description: "Elegant black maxi dress with embroidered detailing, suitable for formal occasions.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    stock: 12,
    images: [],
    discount: 0,
    rating: 4.5,
    tags: ["formal", "eid", "trending"]
  },
  {
    id: "p002",
    name: "Black Chiffon Dress",
    category: "Women's Dresses",
    price: 5499,
    description: "Flowy black chiffon dress, lightweight and breathable.",
    sizes: ["S", "M", "L"],
    colors: ["Black"],
    stock: 8,
    images: [],
    discount: 10,
    rating: 4.2,
    tags: ["formal", "eid", "summer"]
  },
  {
    id: "p003",
    name: "Beige Casual Kurti",
    category: "Women's Casual",
    price: 2499,
    description: "Comfortable everyday kurti in beige, cotton blend.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige"],
    stock: 20,
    images: [],
    discount: 0,
    rating: 4.0,
    tags: ["casual", "summer"]
  },
  {
    id: "p004",
    name: "Men's Formal Black Shirt",
    category: "Men's Shirts",
    price: 2999,
    description: "Classic fit formal shirt in black, wrinkle-resistant fabric.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Black", "White"],
    stock: 15,
    images: [],
    discount: 0,
    rating: 4.3,
    tags: ["formal", "bestseller", "upsell-shirt"]
  },
  {
    id: "p005",
    name: "Black Jeans",
    category: "Men's Bottoms",
    price: 3499,
    description: "Slim fit black denim jeans.",
    sizes: ["30", "32", "34", "36"],
    colors: ["Black"],
    stock: 25,
    images: [],
    discount: 0,
    rating: 4.4,
    tags: ["casual", "upsell-shirt"]
  },
  {
    id: "p006",
    name: "Leather Belt",
    category: "Accessories",
    price: 1499,
    description: "Genuine leather belt, black.",
    sizes: ["Free Size"],
    colors: ["Black", "Brown"],
    stock: 30,
    images: [],
    discount: 0,
    rating: 4.1,
    tags: ["accessory", "upsell-shirt"]
  },
  {
    id: "p007",
    name: "Sneakers",
    category: "Shoes",
    price: 2799,
    description: "Casual white sneakers, unisex.",
    sizes: ["38", "39", "40", "41", "42"],
    colors: ["White"],
    stock: 18,
    images: [],
    discount: 0,
    rating: 4.6,
    tags: ["casual", "under-3000", "upsell-shirt"]
  }
];

module.exports = mockProducts;