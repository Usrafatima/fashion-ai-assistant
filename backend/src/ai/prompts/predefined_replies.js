/**
 * Predefined Replies Bank
 * Contains structured, templated responses for high-frequency queries in English, Urdu Script, and Roman Urdu.
 * Includes a helper utility for placeholder interpolation.
 */

const PREDEFINED_REPLIES = {
  greetings: {
    en: "Hello! Welcome to FashionHub. How can I help you today? Check out our New Arrivals or Collections! 👗✨",
    ur: "السلام علیکم! فیشن ہب میں خوش آمدید۔ آج میں آپ کی کیا مدد کر سکتا ہوں؟ ہماری نئی مصنوعات (New Arrivals) یا کلیکشنز ضرور دیکھیں! 👗✨",
    roman_urdu: "Assalam-o-Alaikum! FashionHub mein khush aamdeed. Aaj main aap ki kya help kar sakta hoon? Humare New Arrivals aur Collections zaroor check karein! 👗✨"
  },
  price_check: {
    en: "The price of {product_name} is Rs. {price}. Would you like to check its size availability? 🛍️",
    ur: "پروڈکٹ {product_name} کی قیمت {price} روپے ہے۔ کیا آپ اس میں سائز کی دستیابی جاننا چاہتے ہیں؟ 🛍️",
    roman_urdu: "{product_name} ki price Rs. {price} hai. Kya aap iska size check karna chahenge? 🛍️"
  },
  availability_check: {
    en: "Yes, {product_name} is currently in stock! We have it in these sizes: {size_list}. Would you like to place an order? 🛍️",
    ur: "جی ہاں، {product_name} اسٹاک میں دستیاب ہے! ہمارے پاس یہ سائز دستیاب ہیں: {size_list}۔ کیا آپ آرڈر دینا چاہیں گے؟ 🛍️",
    roman_urdu: "Ji haan, {product_name} stock mein available hai! Humare paas ye sizes hain: {size_list}. Kya aap order place karna chahenge? 🛍️"
  },
  size_check: {
    en: "For {product_name}, we have sizes: {size_list}. Here is our size chart: {size_chart_url}. Let me know if you need help selecting your size! 📏",
    ur: "پروڈکٹ {product_name} کے لیے ہمارے پاس یہ سائز دستیاب ہیں: {size_list}۔ سائز چارٹ دیکھنے کے لیے اس لنک پر جائیں: {size_chart_url}۔ اگر سائز منتخب کرنے میں مدد چاہیے تو ضرور بتائیں! 📏",
    roman_urdu: "{product_name} ke liye humare paas sizes available hain: {size_list}. Size chart dekhne ke liye is link par click karein: {size_chart_url}. Agar sizing mein koi help chahiye to batayein! 📏"
  },
  color_check: {
    en: "For {product_name}, we have these colors available: {color_list}. Would you like to see pictures? 🎨",
    ur: "پروڈکٹ {product_name} میں یہ رنگ دستیاب ہیں: {color_list}۔ کیا آپ تصاویر دیکھنا چاہیں گے؟ 🎨",
    roman_urdu: "{product_name} mein ye colors available hain: {color_list}. Kya aap pictures dekhna chahenge? 🎨"
  },
  delivery_charges: {
    en: "Our standard delivery charges are Rs. {delivery_charges} nationwide. We offer free delivery on orders above Rs. {free_delivery_threshold}! 🚚",
    ur: "ملک بھر میں ہمارے معیاری ڈیلیوری چارجز {delivery_charges} روپے ہیں۔ {free_delivery_threshold} روپے سے زائد کے آرڈرز پر ڈیلیوری بالکل مفت ہے! 🚚",
    roman_urdu: "Humare standard delivery charges Rs. {delivery_charges} hain nationwide. Rs. {free_delivery_threshold} se upar ke orders par delivery bilkul free hai! 🚚"
  },
  delivery_duration: {
    en: "Delivery takes {duration_days} working days. For major cities like Karachi, Lahore, and Islamabad, it usually takes {major_city_duration_days} days. ⏱️",
    ur: "ڈیلیوری میں {duration_days} کاروباری دن لگتے ہیں۔ بڑے شہروں (کراچی، لاہور، اسلام آباد) کے لیے عام طور پر {major_city_duration_days} دن لگتے ہیں۔ ⏱️",
    roman_urdu: "Delivery mein {duration_days} working days lagte hain. Baray shehron (Karachi, Lahore, Islamabad) ke liye aam tor par {major_city_duration_days} days lagte hain. ⏱️"
  },
  exchange_policy: {
    en: "We offer hassle-free exchanges within {exchange_days} days of delivery, provided the tags are intact and the product is unused. Please note that sale items cannot be exchanged or returned. 🔄",
    ur: "ہم ڈیلیوری کے {exchange_days} دنوں کے اندر تبدیل کرنے کی سہولت دیتے ہیں، بشرطیکہ ٹیگ موجود ہو اور پروڈکٹ استعمال نہ ہوئی ہو۔ براہِ مہربانی نوٹ کریں کہ سیل والی اشیاء تبدیل یا واپس نہیں ہو سکتیں۔ 🔄",
    roman_urdu: "Hum delivery ke {exchange_days} days ke andar exchange offer karte hain, agar tags intact hon aur product unused ho. Please note karein ke sale items exchange ya return nahi hotay. 🔄"
  },
  order_initiate: {
    en: "Let's get your order started! Please confirm the product name: {product_name}, size: {size}, color: {color}, and quantity: {qty}. Type 'yes' to proceed with your address details. 🛍️",
    ur: "آئیے آپ کا آرڈر شروع کرتے ہیں! براہ کرم تصدیق کریں، پروڈکٹ کا نام: {product_name}، سائز: {size}، رنگ: {color}، اور مقدار: {qty}۔ ایڈریس کی تفصیلات دینے کے لیے 'جی ہاں' یا 'yes' لکھیں۔ 🛍️",
    roman_urdu: "Aayein aapka order start karte hain! Please confirm karein product name: {product_name}, size: {size}, color: {color}, aur quantity: {qty}. Apne address details share karne ke liye 'yes' likhein. 🛍️"
  }
};

/**
 * Interpolates variables into a template string containing placeholders like {placeholder_name}.
 * @param {string} template - The template string.
 * @param {Object} variables - Key-value pairs for placeholders.
 * @returns {string} - The interpolated string.
 */
function interpolate(template, variables = {}) {
  if (!template) return '';
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key] !== undefined ? String(variables[key]) : match;
  });
}

/**
 * Get a predefined reply by category and language, interpolated with variables.
 * @param {string} category - Category name (e.g. 'price_check').
 * @param {string} lang - Language code ('en', 'ur', 'roman_urdu').
 * @param {Object} variables - Placeholder values.
 * @returns {string} - The compiled response string.
 */
function getPredefinedReply(category, lang, variables = {}) {
  const templates = PREDEFINED_REPLIES[category];
  if (!templates) {
    return `[Error: Predefined reply category '${category}' not found]`;
  }
  const template = templates[lang] || templates['en']; // Fallback to English
  return interpolate(template, variables);
}

module.exports = {
  PREDEFINED_REPLIES,
  interpolate,
  getPredefinedReply
};
