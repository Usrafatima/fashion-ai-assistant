/**
 * AI Prompts & Flows Verification Test Suite
 * Validates language detection, template interpolation, and state-machine schemas.
 */

const {
  detectLanguage,
  isCodeSwitched,
  RESPONSE_STYLE_GUIDELINES,
  MASTER_SYSTEM_PROMPTS,
  INTENT_SYSTEM_PROMPTS,
  PREDEFINED_REPLIES,
  interpolate,
  getPredefinedReply,
  CONVERSATION_STATES
} = require('./index');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ PASS: ${message}`);
  } else {
    console.error(`❌ FAIL: ${message}`);
  }
}

console.log("=========================================");
console.log("🏃 RUNNING AI PROMPT & FLOW TEST SUITE...");
console.log("=========================================\n");

// 1. Test Language Detection
console.log("--- Testing Language Detection ---");

const testPhrases = [
  // English phrases
  { text: "Hello, I want to check the price of this dress.", expected: "en" },
  { text: "Can you tell me if you have this in Medium size?", expected: "en" },
  { text: "Do you ship to Lahore?", expected: "en" },

  // Urdu Script phrases
  { text: "اسلام علیکم، مجھے اس ڈریس کی قیمت جاننی ہے۔", expected: "ur" },
  { text: "کیا یہ سائز اس میں دستیاب ہے؟", expected: "ur" },
  { text: "کیا ڈیلیوری فری ہے؟", expected: "ur" },

  // Roman Urdu / Code-switched phrases
  { text: "Assalam o alaikum! Is dress ki price kya hai?", expected: "roman_urdu" },
  { text: "Mujhe check karna hai ke medium size available hai ya nahi.", expected: "roman_urdu" },
  { text: "Lahore ki delivery charges kitne hain?", expected: "roman_urdu" },
  { text: "dress ka price batao", expected: "roman_urdu" }
];

testPhrases.forEach((phrase, idx) => {
  const result = detectLanguage(phrase.text);
  assert(result === phrase.expected, `Phrase ${idx + 1} language detection (Expected: ${phrase.expected}, Got: ${result})`);
});

// 2. Test Code Switching Detection
console.log("\n--- Testing Code-Switching Detection ---");
assert(isCodeSwitched("Price kya hai is dress ki?"), "Detects code-switched Roman Urdu & English fashion terms");
assert(isCodeSwitched("What is the price of this dress in Karachi?"), "Detects pure English as not code-switched (contains no high-weight Roman Urdu)");
assert(!isCodeSwitched("اسلام علیکم"), "Urdu script is not code-switched");

// 3. Test Template Interpolation
console.log("\n--- Testing Template Interpolation ---");
const template = "Product: {product_name}, Price: Rs. {price}, Sizes: {size_list}";
const variables = { product_name: "Eid Special Kurti", price: 3500, size_list: "S, M, L" };
const interpolated = interpolate(template, variables);
assert(interpolated === "Product: Eid Special Kurti, Price: Rs. 3500, Sizes: S, M, L", "Interpolates template string correctly");

const incompleteInterpolated = interpolate(template, { product_name: "Eid Special Kurti" });
assert(incompleteInterpolated === "Product: Eid Special Kurti, Price: Rs. {price}, Sizes: {size_list}", "Gracefully leaves missing placeholders intact");

// 4. Test Predefined Replies Retrieval
console.log("\n--- Testing Predefined Replies Bank ---");
const priceReplyEn = getPredefinedReply('price_check', 'en', { product_name: "Lawn Kurta", price: "2,500" });
assert(priceReplyEn.includes("Lawn Kurta") && priceReplyEn.includes("2,500"), "Retrieves and interpolates English price reply");

const priceReplyUr = getPredefinedReply('price_check', 'ur', { product_name: "لان کرتا", price: "2,500" });
assert(priceReplyUr.includes("قیمت") && priceReplyUr.includes("2,500"), "Retrieves and interpolates Urdu price reply");

const priceReplyRoman = getPredefinedReply('price_check', 'roman_urdu', { product_name: "Lawn Kurta", price: "2,500" });
assert(priceReplyRoman.includes("price") && priceReplyRoman.includes("2,500"), "Retrieves and interpolates Roman Urdu price reply");

// 5. Test State Machine Struct Integrity
console.log("\n--- Testing Conversation State Machine Schema ---");
const requiredStateKeys = ["description", "expectedInputs", "templates", "transitions"];
let allStatesValid = true;

for (const [stateName, stateDetails] of Object.entries(CONVERSATION_STATES)) {
  const missingKeys = requiredStateKeys.filter(k => !stateDetails[k]);
  if (missingKeys.length > 0) {
    allStatesValid = false;
    console.error(`❌ State '${stateName}' is missing keys: ${missingKeys.join(', ')}`);
  }

  // Ensure templates have bilingual keys
  const langKeys = ["en", "ur", "roman_urdu"];
  const missingLangs = langKeys.filter(lk => !stateDetails.templates[lk]);
  if (missingLangs.length > 0) {
    allStatesValid = false;
    console.error(`❌ State '${stateName}' templates are missing languages: ${missingLangs.join(', ')}`);
  }
}
assert(allStatesValid, "All conversation states have correct schemas and translations");

console.log("\n=========================================");
console.log(`📊 TEST RUN COMPLETED. Passed: ${passedTests}/${totalTests}`);
console.log("=========================================");

if (passedTests === totalTests) {
  console.log("\n🎉 ALL TESTS PASSED SUCCESSFULLY!");
  process.exit(0);
} else {
  console.error("\n🔴 SOME TESTS FAILED. PLEASE DEBUG.");
  process.exit(1);
}
