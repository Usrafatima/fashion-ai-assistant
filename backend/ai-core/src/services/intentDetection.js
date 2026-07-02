// intentDetection.js
// Classifies an incoming customer message into one of the spec's defined intents.
// Rewritten to use LangChain's ChatOpenAI wrapper instead of the raw OpenAI SDK.

const model = require("../config/openai");
const { SystemMessage, HumanMessage } = require("@langchain/core/messages");

const INTENTS = [
  "Greeting",
  "Product Search",
  "Order Placement",
  "Delivery Inquiry",
  "Complaint",
  "Return Request",
  "Discount Inquiry"
];

const SYSTEM_PROMPT = `You are an intent classification engine for a clothing brand's sales chatbot.
Classify the customer's message into EXACTLY ONE of these intents:
${INTENTS.map((i) => `- ${i}`).join("\n")}

Respond ONLY with valid JSON in this exact format, no markdown, no extra text:
{"intent": "<one of the categories above>", "confidence": <number between 0 and 1>}`;

async function detectIntent(customerMessage) {
  if (!customerMessage || typeof customerMessage !== "string") {
    throw new Error("customerMessage must be a non-empty string");
  }

  const response = await model.invoke([
    new SystemMessage(SYSTEM_PROMPT),
    new HumanMessage(customerMessage)
  ]);

  const raw = response.content.trim();

  try {
    const parsed = JSON.parse(raw);
    if (!INTENTS.includes(parsed.intent)) {
      parsed.intent = "Product Search"; // safe fallback
      parsed.confidence = 0.3;
    }
    return parsed;
  } catch (err) {
    console.error("Intent detection: failed to parse model output:", raw);
    return { intent: "Product Search", confidence: 0 };
  }
}

module.exports = { detectIntent, INTENTS };