# AI Core Module — Setup & Run Instructions

**Module:** AI Core Developer (Module 2)
**Owner:** Fajar Warriach
**Responsibilities:** OpenAI/LangChain integration, Intent Detection, Sentiment Analysis, Recommendation Engine

---

## ⚠️ Deviation from spec — please read

The original spec lists **"OpenAI + LangChain"** as the required stack. This module uses
**Groq + LangChain** instead (via `@langchain/groq`), due to an OpenAI account billing/quota
issue during development. The LangChain integration itself is real and matches the spec's
architecture intent — only the underlying model provider differs. Flagging this here so
whoever reviews the module sees it explicitly rather than discovering it in the code.

---

## Prerequisites

- **Node.js** (v18 or later recommended) and npm — verify with:
  ```powershell
  node -v
  npm -v
  ```
- A **Groq API key** — get one free at [console.groq.com](https://console.groq.com) → API Keys.
  (Groq's free-tier terms may have changed since this was written — verify current limits
  on their site rather than assuming.)

---

## Setup

1. Clone/pull the repo, then navigate into this module's folder:
   ```powershell
   cd ai-core
   ```

2. Install dependencies:
   ```powershell
   npm install
   ```

3. Create your local environment file:
   ```powershell
   copy .env.example .env
   ```

4. Open `.env` and add your real Groq API key:
   ```
   GROQ_API_KEY=your_real_key_here
   PORT=5001
   ```
   **Never commit `.env` to git** — it's already in `.gitignore`, but double-check before pushing.

---

## Running the server

**Development mode** (auto-restarts on file changes):
```powershell
npm run dev
```

**Production mode:**
```powershell
npm start
```

You should see:
```
AI Core service running on http://localhost:5001
```

---

## Testing the endpoints

Use a **second terminal** (leave the server running in the first). PowerShell users: use
`Invoke-RestMethod`, not `curl` — PowerShell aliases `curl` to `Invoke-WebRequest`, which
doesn't accept curl-style `-H`/`-d` flags.

**Health check:**
```powershell
Invoke-RestMethod -Uri http://localhost:5001/health -Method Get
```

**Intent detection:**
```powershell
Invoke-RestMethod -Uri http://localhost:5001/api/ai/detect-intent -Method Post -ContentType "application/json" -Body '{"message":"hi"}'
```
Returns one of: Greeting, Product Search, Order Placement, Delivery Inquiry, Complaint,
Return Request, Discount Inquiry — plus a confidence score.

**Sentiment analysis:**
```powershell
Invoke-RestMethod -Uri http://localhost:5001/api/ai/sentiment -Method Post -ContentType "application/json" -Body '{"message":"This is unacceptable, my order never arrived!"}'
```
Returns one of: Happy Customer, Angry Customer, Frustrated Customer, Interested Buyer —
plus a confidence score.

**Product recommendation:**
```powershell
Invoke-RestMethod -Uri http://localhost:5001/api/ai/recommend -Method Post -ContentType "application/json" -Body '{"message":"I need a black dress for Eid"}'
```
Returns a list of matching products from the current data source (see note below).

**Upsell suggestions:**
```powershell
Invoke-RestMethod -Uri http://localhost:5001/api/ai/upsell/p004 -Method Get
```
Returns related "customers also bought" products for the given product ID.

---

## Project structure

```
ai-core/
├── src/
│   ├── config/
│   │   └── openai.js          # LangChain ChatGroq model init (name kept for now — see note)
│   ├── data/
│   │   └── mockProducts.js    # Mock product data, temporary
│   ├── services/
│   │   ├── productRepository.js     # Data access layer — swap point for real MongoDB
│   │   ├── intentDetection.js
│   │   ├── sentimentAnalysis.js
│   │   └── recommendationEngine.js
│   ├── routes/
│   │   └── ai.routes.js
│   └── server.js
├── .env                # local only, never committed
├── .env.example
├── .gitignore
└── package.json
```

---

## Known limitations / not yet done

- **Mock data, not real MongoDB.** `src/data/mockProducts.js` currently stands in for the
  Database Designer module's schema. Once that module's MongoDB schema is available,
  `src/services/productRepository.js` is the only file that needs to change to connect to
  real data — the AI services don't need to change.
- **`config/openai.js` is misnamed** — it configures Groq, not OpenAI, after the provider
  switch. Left as-is for now to avoid touching every import across the service files;
  worth renaming to `config/model.js` or similar before final submission if time allows.
- Model used: `openai/gpt-oss-20b` via Groq. Groq's available models can change —
  check [console.groq.com](https://console.groq.com) if this stops working.

---

## Dependencies installed

| Package | Version | Purpose |
|---|---|---|
| express | ^5.2.1 | HTTP server / routing |
| cors | ^2.8.6 | Cross-origin requests |
| dotenv | ^17.4.2 | Load `.env` variables |
| langchain | ^1.5.2 | LangChain core |
| @langchain/core | ^1.2.1 | LangChain message types |
| @langchain/groq | ^1.3.1 | Groq model wrapper (active) |
| @langchain/openai | ^1.5.3 | OpenAI model wrapper (installed, not currently used) |
| openai | ^6.45.0 | OpenAI SDK (installed, not currently used) |
| nodemon (dev) | ^3.1.10 | Auto-restart during development |
