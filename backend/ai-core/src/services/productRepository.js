// productRepository.js
// This is the ONLY file that should change when we swap mock data for real MongoDB.
// Every function here returns a Promise so the swap to async Mongoose calls is seamless.

const mockProducts = require("../data/mockProducts");

async function getAllProducts() {
  return mockProducts;
}

async function getProductById(id) {
  return mockProducts.find((p) => p.id === id) || null;
}

async function filterProducts({ category, color, maxPrice, tags } = {}) {
  return mockProducts.filter((p) => {
    if (category && p.category.toLowerCase() !== category.toLowerCase()) return false;
    if (color && !p.colors.some((c) => c.toLowerCase() === color.toLowerCase())) return false;
    if (maxPrice && p.price > maxPrice) return false;
    if (tags && tags.length > 0) {
      const hasTag = tags.some((t) => p.tags.includes(t));
      if (!hasTag) return false;
    }
    return true;
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  filterProducts
};
