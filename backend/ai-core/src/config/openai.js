// openai.js
// LangChain wrapper around Groq's chat models (switched from OpenAI).
// Verified against @langchain/groq@1.3.1's own README during this session.
// Model "openai/gpt-oss-20b" is Groq's recommended replacement for the now-
// deprecated llama-3.3-70b-versatile, per Groq's deprecation docs (checked
// this session, June 2026). Groq's model lineup can change again — worth a
// quick check at console.groq.com if this stops working.

require("dotenv").config();
const { ChatGroq } = require("@langchain/groq");

if (!process.env.GROQ_API_KEY) {
  console.warn(
    "⚠️  GROQ_API_KEY is not set in .env — the server will boot, but any AI " +
    "endpoint call will fail with an auth error until you add a real key."
  );
}

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY || "placeholder-key-set-real-key-in-env",
  model: "openai/gpt-oss-20b"
});

module.exports = model;