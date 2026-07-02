/**
 * Language Rules & Detection Utility
 * Handles identification of English, Urdu Script, and Roman Urdu.
 * Provides configuration for code-switching behavior.
 */

// Unicode range for Arabic/Persian/Urdu script (0600-06FF)
const URDU_SCRIPT_REGEX = /[\u0600-\u06FF]/;

// High-weight Roman Urdu words (uniquely Roman Urdu, no English overlap)
const HIGH_WEIGHT_ROMAN_URDU = new Set([
  'kya', 'kia', 'kya-hai', 'hai', 'hain', 'mein', 'chahiye', 'batao', 'bataein', 'bataen',
  'kitna', 'kitne', 'kitni', 'yeh', 'woh', 'milenge', 'milega', 'kahan', 'kaise', 'kon',
  'shukriya', 'bhi', 'aur', 'karo', 'karein', 'karen', 'mujhe', 'mjhe', 'apna', 'apni',
  'apne', 'hoon', 'raha', 'rahi', 'rahe', 'sath', 'saath', 'paise', 'bhai', 'bhain',
  'behan', 'acha', 'accha', 'sahi', 'galat', 'khuda', 'hafiz', 'hafez', 'mil', 'gaya',
  'gayi', 'gaye', 'kar', 'kiya', 'tha', 'thi', 'the', 'kuch', 'kyun', 'kyu', 'kab', 'nhi',
  'nahi', 'na', 'yaar', 'yar', 'jee', 'ji', 'meherbani'
]);

// Medium-weight Roman Urdu words (some possible overlaps or shorter words)
const MEDIUM_WEIGHT_ROMAN_URDU = new Set([
  'ki', 'ka', 'ke', 'ko', 'se', 'par', 'toh', 'ya', 'aap', 'tum', 'pe', 'wo', 'ye', 'he'
]);

// English stop words that should not be confused with Roman Urdu
const ENGLISH_EXCLUSIONS = new Set([
  'the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'you', 'that', 'he', 'was', 'for', 'on',
  'are', 'as', 'with', 'his', 'they', 'i', 'at', 'be', 'this', 'have', 'from', 'or', 'one',
  'had', 'by', 'word', 'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can',
  'said', 'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their', 'if', 'will',
  'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so', 'some', 'her',
  'would', 'make', 'like', 'him', 'into', 'time', 'has', 'look', 'two', 'more', 'write',
  'go', 'see', 'number', 'no', 'way', 'could', 'people', 'my', 'than', 'first', 'water',
  'been', 'call', 'who', 'oil', 'its', 'now', 'find', 'long', 'down', 'day', 'did', 'get',
  'come', 'made', 'may', 'part'
]);

/**
 * Detect the language of a given text.
 * @param {string} text - The input text from the customer.
 * @returns {'en' | 'ur' | 'roman_urdu'} - Language code: 'en' (English), 'ur' (Urdu Script), 'roman_urdu' (Roman Urdu/Code-switched).
 */
function detectLanguage(text) {
  if (!text || typeof text !== 'string') {
    return 'en'; // Default to English
  }

  // 1. Check for Urdu Script
  if (URDU_SCRIPT_REGEX.test(text)) {
    return 'ur';
  }

  // 2. Tokenize and count Roman Urdu words
  const words = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove punctuation
    .split(/\s+/);

  let romanUrduScore = 0;
  let englishScore = 0;

  for (const word of words) {
    if (!word) continue;

    if (HIGH_WEIGHT_ROMAN_URDU.has(word)) {
      romanUrduScore += 2;
    } else if (MEDIUM_WEIGHT_ROMAN_URDU.has(word)) {
      // Avoid false positives from English "he", "me", "to"
      if (word === 'he' && words.includes('is') && !words.includes('hai')) {
        // "he is..." likely English
        englishScore += 1;
      } else if (word === 'to' && words.includes('the')) {
        // "to the..." likely English
        englishScore += 1;
      } else {
        romanUrduScore += 1;
      }
    } else if (ENGLISH_EXCLUSIONS.has(word)) {
      englishScore += 1.5;
    }
  }

  // 3. Return detected language based on score
  if (romanUrduScore > 0 && romanUrduScore >= englishScore) {
    return 'roman_urdu';
  }

  return 'en';
}

/**
 * Check if the text is code-switched (contains significant elements of both English and Roman Urdu).
 * Useful if the system wants to apply specific mixed-language response guidelines.
 * @param {string} text 
 * @returns {boolean}
 */
function isCodeSwitched(text) {
  if (!text || typeof text !== 'string') return false;
  if (URDU_SCRIPT_REGEX.test(text)) return false; // Urdu script is not considered Roman-English code-switched here

  const words = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .split(/\s+/);

  let hasEnglish = false;
  let hasRomanUrdu = false;

  for (const word of words) {
    if (!word) continue;
    if (HIGH_WEIGHT_ROMAN_URDU.has(word)) {
      hasRomanUrdu = true;
    }
    if (ENGLISH_EXCLUSIONS.has(word)) {
      hasEnglish = true;
    }
  }

  // Common fashion search words (loan words) count towards code-switching if mixed with Roman Urdu
  const fashionLoanWords = ['price', 'size', 'color', 'delivery', 'charges', 'order', 'dress', 'catalog'];
  const hasFashionLoan = words.some(w => fashionLoanWords.includes(w));

  return (hasRomanUrdu && (hasEnglish || hasFashionLoan));
}

/**
 * Guidelines for how the assistant should formulate response styles based on the language.
 */
const RESPONSE_STYLE_GUIDELINES = {
  en: {
    name: 'English',
    greeting: 'Hello! Welcome to FashionHub.',
    tone: 'Professional, friendly, and direct.',
    rules: [
      'Use natural English grammar.',
      'Use bullet points for lists and items.',
      'Keep paragraphs short and clean.'
    ]
  },
  ur: {
    name: 'Urdu Script',
    greeting: 'السلام علیکم! فیشن ہب میں خوش آمدید۔',
    tone: 'Polite, respectful, and traditional (using "Aap" style).',
    rules: [
      'Use proper Urdu grammatical syntax and Nastaliq-friendly spacing.',
      'Keep English loan words in Urdu script if common (e.g. سائز, کلر, آرڈر).',
      'Ensure right-to-left friendly formatting.'
    ]
  },
  roman_urdu: {
    name: 'Roman Urdu',
    greeting: 'Assalam-o-Alaikum! FashionHub mein khush aamdeed.',
    tone: 'Friendly, modern, and colloquial.',
    rules: [
      'Write Urdu in Latin alphabet using standard phonetic spellings.',
      'Incorporate common English fashion terms naturally (e.g. price, size, color, design, order, shipping).',
      'Keep sentences short and conversational.'
    ]
  }
};

module.exports = {
  detectLanguage,
  isCodeSwitched,
  RESPONSE_STYLE_GUIDELINES,
  HIGH_WEIGHT_ROMAN_URDU,
  MEDIUM_WEIGHT_ROMAN_URDU
};
