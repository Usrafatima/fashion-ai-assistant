// recommendationEngine.js
// Extracts search filters from natural language via LangChain, then queries
// productRepository (mock data for now).

const model = require("../config/openai");
const { SystemMessage, HumanMessage } = require("@langchain/core/messages");
const productRepository = require("./productRepository");

const SYSTEM_PROMPT = `You extract product search filters from a customer's message for a clothing brand.
Respond ONLY with valid JSON, no markdown, no extra text, in this exact format:
{
  "category": "<string or null>",
  "color": "<string or null>",
  "maxPrice": <number or null>,
  "tags": [<array of relevant lowercase keywords like "formal", "casual", "trending", "bestseller", "eid", "summer", "winter", or empty array>]
}
Only include a field value if you are reasonably confident it applies. Use null / empty array otherwise.`;

async function extractFilters(customerMessage) {
  const response = await model.invoke([
    new SystemMessage(SYSTEM_PROMPT),
    new HumanMessage(customerMessage)
  ]);

  const raw = response.content.trim();

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("Recommendation engine: failed to parse filter extraction:", raw);
    return { category: null, color: null, maxPrice: null, tags: [] };
  }
}

async function recommendProducts(customerMessage, { limit = 5 } = {}) {
  const filters = await extractFilters(customerMessage);
  let results = await productRepository.filterProducts(filters);

  if (results.length === 0) {
    results = await productRepository.filterProducts({ tags: ["trending", "bestseller"] });
  }

  return results.slice(0, limit);
}

async function getUpsellSuggestions(productId, { limit = 3 } = {}) {
  const product = await productRepository.getProductById(productId);
  if (!product) return [];

  const all = await productRepository.getAllProducts();
  const upsellTag = product.tags.find((t) => t.startsWith("upsell-"));

  const suggestions = all.filter(
    (p) => p.id !== productId && upsellTag && p.tags.includes(upsellTag)
  );

  return suggestions.slice(0, limit);
}

module.exports = { recommendProducts, getUpsellSuggestions, extractFilters };