// ai.routes.js
// Exposes the AI Core module's endpoints for other modules (Backend API, n8n) to call.

const express = require("express");
const router = express.Router();

const { detectIntent } = require("../services/intentDetection");
const { analyzeSentiment } = require("../services/sentimentAnalysis");
const { recommendProducts, getUpsellSuggestions } = require("../services/recommendationEngine");

// POST /api/ai/detect-intent
// body: { message: string }
router.post("/detect-intent", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });

    const result = await detectIntent(message);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Intent detection failed" });
  }
});

// POST /api/ai/sentiment
// body: { message: string }
router.post("/sentiment", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });

    const result = await analyzeSentiment(message);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sentiment analysis failed" });
  }
});

// POST /api/ai/recommend
// body: { message: string, limit?: number }
router.post("/recommend", async (req, res) => {
  try {
    const { message, limit } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });

    const results = await recommendProducts(message, { limit });
    res.json({ products: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Recommendation failed" });
  }
});

// GET /api/ai/upsell/:productId
router.get("/upsell/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const results = await getUpsellSuggestions(productId);
    res.json({ products: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upsell lookup failed" });
  }
});

module.exports = router;
