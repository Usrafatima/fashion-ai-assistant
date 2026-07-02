// sentimentAnalysis.js
// Detects customer sentiment per the spec: Happy / Angry / Frustrated / Interested Buyer.
// Rewritten to use LangChain's ChatOpenAI wrapper.

const model = require("../config/openai");
const { SystemMessage, HumanMessage } = require("@langchain/core/messages");

const SENTIMENTS = ["Happy Customer", "Angry Customer", "Frustrated Customer", "Interested Buyer"];

const SYSTEM_PROMPT = `You are a sentiment classification engine for a clothing brand's sales chatbot.
Classify the customer's message into EXACTLY ONE of these sentiments:
${SENTIMENTS.map((s) => `- ${s}`).join("\n")}

Respond ONLY with valid JSON in this exact format, no markdown, no extra text:
{"sentiment": "<one of the categories above>", "confidence": <number between 0 and 1>}`;

async function analyzeSentiment(customerMessage) {
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
    if (!SENTIMENTS.includes(parsed.sentiment)) {
      parsed.sentiment = "Interested Buyer";
      parsed.confidence = 0.3;
    }
    return parsed;
  } catch (err) {
    console.error("Sentiment analysis: failed to parse model output:", raw);
    return { sentiment: "Interested Buyer", confidence: 0 };
  }
}

module.exports = { analyzeSentiment, SENTIMENTS };