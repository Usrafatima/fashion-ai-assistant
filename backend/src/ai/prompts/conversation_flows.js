/**
 * Conversation Flows State Machine & Templates
 * Specifies the states, expected inputs, bilingual response templates, and state transitions
 * for the customer conversational journeys.
 */

const CONVERSATION_STATES = {
  WELCOME: {
    description: "Initial state triggered on Greeting intent. Introduces brand and main menu.",
    expectedInputs: [
      "Any greeting (Hi, Hello, AOA, Assalam-o-Alaikum, Hey)",
      "Selection from welcome menu"
    ],
    templates: {
      en: "Hi! Welcome to FashionHub. 🌟 We are excited to help you shop today.\n\nHere is what you can explore:\n1️⃣ New Arrivals 🆕\n2️⃣ Women's Collection 👗\n3️⃣ Men's Collection 👕\n4️⃣ Order Tracking 📦\n5️⃣ Delivery Info 🚚\n\nHow can I help you today? Feel free to choose an option or type what you are looking for!",
      ur: "السلام علیکم! فیشن ہب میں خوش آمدید۔ 🌟 ہم آج آپ کی شاپنگ میں مدد کرنے کے لیے پرجوش ہیں۔\n\nآپ درج ذیل آپشنز دیکھ سکتے ہیں:\n1️⃣ نیو ارائیولز (New Arrivals) 🆕\n2️⃣ ویمنز کلیکشن (Women's Collection) 👗\n3️⃣ مینز کلیکشن (Men's Collection) 👕\n4️⃣ آرڈر ٹریکنگ (Order Tracking) 📦\n5️⃣ ڈیلیوری کی معلومات (Delivery Info) 🚚\n\nآج میں آپ کی کیا مدد کر سکتا ہوں؟ کوئی بھی آپشن منتخب کریں یا جو تلاش کر رہے ہیں وہ ٹائپ کریں!",
      roman_urdu: "Assalam-o-Alaikum! FashionHub mein khush aamdeed. 🌟 Hum aaj aap ki shopping mein help karne ke liye excited hain.\n\nHere is what you can explore:\n1️⃣ New Arrivals 🆕\n2️⃣ Women's Collection 👗\n3️⃣ Men's Collection 👕\n4️⃣ Order Tracking 📦\n5️⃣ Delivery Info 🚚\n\nHow can I help you today? Koi bhi option choose karein ya jo aap dekh rahe hain wo type karein!"
    },
    transitions: {
      "select:1": "PRODUCT_SEARCH", // New Arrivals
      "select:2": "PRODUCT_SEARCH", // Women's Collection
      "select:3": "PRODUCT_SEARCH", // Men's Collection
      "select:4": "ORDER_TRACKING",
      "select:5": "DELIVERY_INQUIRY",
      "intent:ProductSearch": "PRODUCT_SEARCH",
      "intent:DeliveryInquiry": "DELIVERY_INQUIRY",
      "intent:Complaint": "COMPLAINT_INIT",
      "intent:ReturnRequest": "RETURN_INQUIRY",
      "default": "PRODUCT_SEARCH"
    }
  },

  PRODUCT_SEARCH: {
    description: "Customer searches for products. AI returns catalog matches.",
    expectedInputs: [
      "Product description, gender, category, budget, occasion (e.g. 'black Eid dress', 'lawn kurti under 3000')"
    ],
    templates: {
      en: "Here are some of our best matching options for you: ✨\n\n{product_list_formatted}\n\nWould you like to:\n👉 Type a product name to check available sizes/colors\n👉 Type 'order' to start placing an order\n👉 Type 'back' for the main menu",
      ur: "آپ کی پسند کے مطابق کچھ بہترین ڈیزائنز یہ ہیں: ✨\n\n{product_list_formatted}\n\nکیا آپ:\n👉 کسی پروڈکٹ کا نام لکھ کر اس کے سائز اور رنگ جاننا چاہیں گے؟\n👉 آرڈر شروع کرنے کے لیے 'order' لکھیں\n👉 واپس جانے کے لیے 'back' لکھیں",
      roman_urdu: "Aap ki preference ke mutabiq best options ye hain: ✨\n\n{product_list_formatted}\n\nKya aap:\n👉 Kisi product ka name type kar ke uske sizes/colors check karna chahenge?\n👉 Order place karne ke liye 'order' likhein\n👉 Main menu ke liye 'back' likhein"
    },
    transitions: {
      "action:check_sizes": "SIZE_INQUIRY",
      "action:check_colors": "COLOR_INQUIRY",
      "intent:OrderPlacement": "ORDER_CONFIRM",
      "select:back": "WELCOME",
      "default": "PRODUCT_SEARCH"
    }
  },

  SIZE_INQUIRY: {
    description: "Inquiry about size availability, charts, or suggestions.",
    expectedInputs: [
      "Size query (e.g. 'Is Medium available?', 'Size chart please', 'Recommend size for weight 65kg')"
    ],
    templates: {
      en: "For {product_name}, we have these sizes available: {size_list}. 📏\n\nHere is our size chart: {size_chart_url}\n\nWould you like to proceed with this product? Type 'order' to buy or ask for other details!",
      ur: "پروڈکٹ {product_name} کے لیے یہ سائز دستیاب ہیں: {size_list}۔ 📏\n\nہمارا سائز چارٹ دیکھنے کے لیے اس لنک پر کلک کریں: {size_chart_url}\n\nکیا آپ اس پروڈکٹ کا آرڈر دینا چاہتے ہیں؟ آرڈر دینے کے لیے 'order' لکھیں یا دیگر معلومات پوچھیں!",
      roman_urdu: "{product_name} ke liye ye sizes available hain: {size_list}. 📏\n\nSize chart ka link ye hai: {size_chart_url}\n\nKya aap is product ka order place karna chahte hain? Order ke liye 'order' likhein ya baqi details poochhein!"
    },
    transitions: {
      "intent:OrderPlacement": "ORDER_CONFIRM",
      "intent:ProductSearch": "PRODUCT_SEARCH",
      "default": "PRODUCT_SEARCH"
    }
  },

  COLOR_INQUIRY: {
    description: "Inquiry about color availability and alternatives.",
    expectedInputs: [
      "Color query (e.g. 'Do you have red in this?', 'What other colors are there?')"
    ],
    templates: {
      en: "For {product_name}, we have these colors: {color_list}. 🎨\n\nWould you like to check size availability or see product images? Type 'order' to proceed directly to order.",
      ur: "پروڈکٹ {product_name} میں یہ رنگ دستیاب ہیں: {color_list}۔ 🎨\n\nکیا آپ سائز چیک کرنا چاہتے ہیں یا تصاویر دیکھنا چاہتے ہیں؟ آرڈر دینے کے لیے براہِ راست 'order' لکھیں۔",
      roman_urdu: "{product_name} mein ye colors available hain: {color_list}. 🎨\n\nKya aap iska size check karna chahte hain ya images dekhna chahte hain? Direct order karne ke liye 'order' likhein."
    },
    transitions: {
      "action:check_sizes": "SIZE_INQUIRY",
      "intent:OrderPlacement": "ORDER_CONFIRM",
      "default": "PRODUCT_SEARCH"
    }
  },

  DELIVERY_INQUIRY: {
    description: "Inquiry about shipping rates, free delivery, and timelines.",
    expectedInputs: [
      "Questions about charges, delivery times, or cities (e.g. 'Karachi charges?', 'Delivery free?')"
    ],
    templates: {
      en: "🚚 **Delivery Information**:\n• Nationwide delivery: Rs. {delivery_charges}\n• Delivery timeline: {duration_days} working days\n• **FREE Delivery** on orders above Rs. {free_delivery_threshold}!\n\nWould you like to browse products or start an order? Type 'menu' or 'order'.",
      ur: "🚚 **ڈیلیوری کی معلومات**:\n• ملک بھر میں چارجز: {delivery_charges} روپے\n• ڈیلیوری کا دورانیہ: {duration_days} کاروباری دن\n• **مفت ڈیلیوری**: {free_delivery_threshold} روپے سے زائد کے آرڈرز پر!\n\nکیا آپ پروڈکٹس دیکھنا چاہتے ہیں یا آرڈر دینا چاہتے ہیں؟ 'menu' یا 'order' لکھیں۔",
      roman_urdu: "🚚 **Delivery Information**:\n• Nationwide charges: Rs. {delivery_charges}\n• Delivery time: {duration_days} working days\n• **FREE Delivery**: Rs. {free_delivery_threshold} se baray orders par!\n\nKya aap products dekhna chahte hain ya order place karna chahte hain? 'menu' ya 'order' likhein."
    },
    transitions: {
      "intent:ProductSearch": "PRODUCT_SEARCH",
      "intent:OrderPlacement": "ORDER_CONFIRM",
      "select:menu": "WELCOME",
      "default": "PRODUCT_SEARCH"
    }
  },

  RETURN_INQUIRY: {
    description: "Inquiry about refunds, exchange policy, and return windows.",
    expectedInputs: [
      "Return/Exchange questions (e.g. 'Can I exchange size?', 'Return policy?')"
    ],
    templates: {
      en: "🔄 **Exchange Policy**:\n• Exchange within {exchange_days} days of delivery.\n• Items must be unused, in original condition with tags.\n• **Important**: Sale/clearance items cannot be returned or exchanged.\n\nPlease share your Order ID if you want to initiate an exchange.",
      ur: "🔄 **تبدیلی کی پالیسی**:\n• ڈیلیوری کے {exchange_days} دنوں کے اندر تبدیل کرنے کی سہولت دستیاب ہے۔\n• پروڈکٹ کا غیر استعمال شدہ اور ٹیگز کے ساتھ اصلی حالت میں ہونا لازمی ہے۔\n• **اہم**: ڈسکاؤنٹ/سیل والی مصنوعات تبدیل یا واپس نہیں ہو سکتیں۔\n\nاگر آپ سائز تبدیل کروانا چاہتے ہیں تو برائے مہربانی اپنا آرڈر آئی ڈی (Order ID) شیئر کریں۔",
      roman_urdu: "🔄 **Exchange Policy**:\n• Delivery ke {exchange_days} days ke andar exchange ho sakta hai.\n• Items unused, tags ke sath original condition mein hone chahiye.\n• **Important**: Sale/Discounted items exchange ya return nahi hotay.\n\nAgar aap exchange process start karna chahte hain to please apna Order ID share karein."
    },
    transitions: {
      "input:order_id": "COMPLAINT_INIT",
      "default": "PRODUCT_SEARCH"
    }
  },

  ORDER_TRACKING: {
    description: "Customer inquiries about their order shipping status.",
    expectedInputs: [
      "Order tracking number or request (e.g. 'Where is my order #1234?', 'Track status')"
    ],
    templates: {
      en: "🔍 **Order Tracking**:\nPlease provide your **Order ID** or tracking number (e.g., #10928) so I can fetch the live status of your shipment from our database.",
      ur: "🔍 **آرڈر ٹریکنگ**:\nبرائے مہربانی اپنا **آرڈر آئی ڈی** یا ٹریکنگ نمبر بتائیں (جیسے 10928#) تاکہ میں ڈیٹا بیس سے آپ کے آرڈر کی صورتحال چیک کر سکوں۔",
      roman_urdu: "🔍 **Order Tracking**:\nPlease apna **Order ID** ya tracking number share karein (jaise #10928) taake hum system se aapke order ka live status check kar sakein."
    },
    transitions: {
      "input:order_id": "ORDER_TRACKING_RESULT",
      "default": "WELCOME"
    },
    trackingResultTemplate: {
      en: "📦 **Order Status (ID: #{order_id})**:\n• Status: **{status}**\n• Payment: {payment_status}\n• Tracking Number: {tracking_number}\n\nExpected delivery in {eta_days} days. Let us know if you need more help!",
      ur: "📦 **آرڈر کی معلومات (آئی ڈی: #{order_id})**:\n• صورتحال: **{status}**\n• ادائیگی کی صورتحال: {payment_status}\n• ٹریکنگ نمبر: {tracking_number}\n\nمتوقع ڈیلیوری {eta_days} دنوں میں۔ مزید معلومات کے لیے پوچھیں!",
      roman_urdu: "📦 **Order Status (ID: #{order_id})**:\n• Status: **{status}**\n• Payment: {payment_status}\n• Tracking Number: {tracking_number}\n\nExpected delivery {eta_days} days mein. Agar mazeed koi help chahiye to batayein!"
    }
  },

  ORDER_CONFIRM: {
    description: "Step 1 of Order Flow: Confirm product details (Name, Size, Color, Qty).",
    expectedInputs: [
      "Size and color confirmation"
    ],
    templates: {
      en: "Let's check details to place your order! 🛍️\n\n• Product: **{product_name}**\n• Size: **{size}**\n• Color: **{color}**\n• Price: **Rs. {price}**\n\nIs this correct? Type **'yes'** to proceed, or state what to change (e.g., 'change size to Large').",
      ur: "آئیے آپ کا آرڈر شروع کرنے کے لیے تفصیلات کی تصدیق کریں! 🛍️\n\n• پروڈکٹ: **{product_name}**\n• سائز: **{size}**\n• رنگ: **{color}**\n• قیمت: **{price} روپے**\n\nکیا یہ معلومات درست ہیں؟ آگے بڑھنے کے لیے **'yes'** یا **'جی ہاں'** لکھیں، یا تبدیلی بتائیں (جیسے 'سائز Large کر دیں')۔",
      roman_urdu: "Aayein aapke order ki details confirm karte hain! 🛍️\n\n• Product: **{product_name}**\n• Size: **{size}**\n• Color: **{color}**\n• Price: **Rs. {price}**\n\nKya ye sab theek hai? Aagey barhne ke liye **'yes'** likhein, ya tabdeeli batayein (jaise 'size Large kar dein')."
    },
    transitions: {
      "input:yes": "ORDER_ADDRESS",
      "input:no": "PRODUCT_SEARCH",
      "action:change_details": "ORDER_CONFIRM",
      "default": "ORDER_CONFIRM"
    }
  },

  ORDER_ADDRESS: {
    description: "Step 2 of Order Flow: Collect Delivery Address and City.",
    expectedInputs: [
      "Full delivery address and city (e.g., 'Flat 402, Block D, Clifton, Karachi')"
    ],
    templates: {
      en: "Perfect! Now please share your **full delivery address** (House/Flat number, Street name, Area) along with your **City** name. 🏡",
      ur: "بہت اچھا! اب برائے مہربانی اپنا **مکمل ڈیلیوری ایڈریس** (مکان/فلیٹ نمبر، گلی، علاقہ) اور اپنے **شہر** کا نام شیئر کریں۔ 🏡",
      roman_urdu: "Perfect! Ab please apna **full delivery address** (House/Flat number, street name, area) aur apne **City** ka naam share karein. 🏡"
    },
    transitions: {
      "input:address": "ORDER_PAYMENT",
      "default": "ORDER_ADDRESS"
    }
  },

  ORDER_PAYMENT: {
    description: "Step 3 of Order Flow: Collect preferred Payment Method.",
    expectedInputs: [
      "Payment selection: Cash on Delivery (COD) or Online Bank Transfer / Credit Card"
    ],
    templates: {
      en: "Got it! How would you like to pay? 💳\n\nSelect an option:\n1️⃣ **Cash on Delivery (COD)**\n2️⃣ **Online Bank Transfer**\n\nReply with **1** or **2** to confirm your payment method.",
      ur: "سمجھ گیا! آپ ادائیگی کیسے کرنا چاہیں گے؟ 💳\n\nطریقہ منتخب کریں:\n1️⃣ **کیش آن ڈیلیوری (COD)**\n2️⃣ **آن لائن بینک ٹرانسفر**\n\nپیمنٹ کا طریقہ کنفرم کرنے کے لیے **1** یا **2** لکھ کر جواب دیں۔",
      roman_urdu: "Got it! Aap payment kis tarah karna chahenge? 💳\n\nOption choose karein:\n1️⃣ **Cash on Delivery (COD)**\n2️⃣ **Online Bank Transfer**\n\nReply karein **1** ya **2** likh kar."
    },
    transitions: {
      "select:1": "ORDER_FINALIZED", // COD
      "select:2": "ORDER_FINALIZED", // Online
      "default": "ORDER_PAYMENT"
    }
  },

  ORDER_FINALIZED: {
    description: "Step 4 of Order Flow: Order Confirmation & Summary.",
    expectedInputs: [
      "Automated state. AI generates confirmation message."
    ],
    templates: {
      en: "🎉 **Order Confirmed!** 🎉\n\nThank you for shopping with FashionHub. Your order has been registered successfully.\n\n📝 **Order Summary**:\n• **Order ID**: #{order_id}\n• **Product**: {product_name} ({size} / {color})\n• **Quantity**: {qty}\n• **Total Amount**: Rs. {total_amount} (including Rs. {delivery_charges} shipping)\n• **Delivery Address**: {address}, {city}\n• **Payment Method**: {payment_method}\n\nWe will send you a tracking number once your package is dispatched! 📦",
      ur: "🎉 **آرڈر کنفرم ہو گیا!** 🎉\n\nفیشن ہب سے خریداری کرنے کا شکریہ۔ آپ کا آرڈر کامیابی کے ساتھ درج کر لیا گیا ہے۔\n\n📝 **آرڈر کی تفصیلات**:\n• **آرڈر آئی ڈی**: {order_id}#\n• **پروڈکٹ**: {product_name} ({size} / {color})\n• **مقدار**: {qty}\n• **کل رقم**: {total_amount} روپے (بشمول {delivery_charges} روپے ڈیلیوری چارجز)\n• **ڈیلیوری ایڈریس**: {address}، {city}\n• **پیمنٹ کا طریقہ**: {payment_method}\n\nجب آپ کا پارسل روانہ ہو گا، تو ہم آپ کو ٹریکنگ نمبر بھیج دیں گے! 📦",
      roman_urdu: "🎉 **Order Confirmed!** 🎉\n\nFashionHub se shopping karne ka shukriya. Aapka order successfully register ho gaya hai.\n\n📝 **Order Summary**:\n• **Order ID**: #{order_id}\n• **Product**: {product_name} ({size} / {color})\n• **Quantity**: {qty}\n• **Total Amount**: Rs. {total_amount} (including Rs. {delivery_charges} shipping)\n• **Delivery Address**: {address}, {city}\n• **Payment Method**: {payment_method}\n\nPackage dispatch hone par hum aapko tracking number send kar dein ge! 📦"
    },
    transitions: {
      "auto": "ORDER_UPSELL"
    }
  },

  ORDER_UPSELL: {
    description: "Step 5 of Order Flow: Suggest related items (accessories/matching items).",
    expectedInputs: [
      "Upsell confirmation ('yes', 'add to order') or greeting to reset"
    ],
    templates: {
      en: "💡 **You might also like...**\nCustomers who bought {product_name} also purchased: **{upsell_product_name}** for just Rs. {upsell_product_price}! 👜✨\n\nWould you like to add this to your order? Simply reply with **'add'** to update your order, or say **'no thanks'**.",
      ur: "💡 **شاید آپ کو یہ بھی پسند آئے...**\nجن گاہکوں نے {product_name} خریدا، انہوں نے ساتھ **{upsell_product_name}** بھی خریدا صرف {upsell_product_price} روپے میں! 👜✨\n\nکیا آپ اسے اپنے آرڈر میں شامل کرنا چاہتے ہیں؟ آرڈر اپ ڈیٹ کرنے کے لیے **'add'** لکھیں یا **'no thanks'** لکھ کر منع کر دیں۔",
      roman_urdu: "💡 **You might also like...**\nCustomers jinhon ne {product_name} kharida, unhon ne sath **{upsell_product_name}** bhi buy kiya sirf Rs. {upsell_product_price} mein! 👜✨\n\nKya aap isko apne order mein add karna chahenge? Order update karne ke liye simple **'add'** likhein, ya **'no thanks'** kahein."
    },
    transitions: {
      "input:add": "ORDER_FINALIZED", // Loops back to finalized with updated products
      "input:no_thanks": "WELCOME",
      "default": "WELCOME"
    }
  },

  COMPLAINT_INIT: {
    description: "Customer initiates complaint or return. Triggers empathetic acknowledgement.",
    expectedInputs: [
      "Details of damaged items, sizing problems, missing items, or refund requests"
    ],
    templates: {
      en: "I am very sorry to hear about this issue. 😔 At FashionHub, we take product quality and customer satisfaction very seriously.\n\nTo help me look into this, could you please provide:\n1️⃣ Your **Order ID**\n2️⃣ A short **description of the issue** (and photos if you're on WhatsApp/DM)\n\nI will immediately pass this to our human support team to resolve this for you.",
      ur: "ہمیں یہ جان کر بے حد افسوس ہوا۔ 😔 فیشن ہب میں ہم مصنوعات کے معیار اور گاہک کے اطمینان کو بہت سنجیدگی سے لیتے ہیں۔\n\nاس مسئلے کو حل کرنے کے لیے، کیا آپ فراہم کر سکتے ہیں:\n1️⃣ اپنا **آرڈر آئی ڈی** (Order ID)\n2️⃣ مسئلے کی **مختصر تفصیل** (اور اگر ممکن ہو تو تصویر)\n\nمیں فوری طور پر یہ معلومات ہمارے کسٹمر سپورٹ مینیجر کو بھیج رہا ہوں تاکہ آپ کا مسئلہ حل کیا جا سکے۔",
      roman_urdu: "Mujhe ye jaan kar bohat afsos hua. 😔 FashionHub mein hum quality aur customer satisfaction ko sab se pehle rakhte hain.\n\nIs issue ko solve karne ke liye, kya aap share kar sakte hain:\n1️⃣ Apna **Order ID**\n2️⃣ Issue ki ek choti **description** (aur photo agar WhatsApp/DM par hain)\n\nMain ye details foren apne support manager ko forward kar raha hoon taake aap ka issue solve kiya ja sakay."
    },
    transitions: {
      "input:details": "COMPLAINT_HANDOFF",
      "default": "COMPLAINT_HANDOFF"
    }
  },

  COMPLAINT_HANDOFF: {
    description: "Escalation state. Conversation is flagged for human admin.",
    expectedInputs: [
      "Automated state. Admin receives flag."
    ],
    templates: {
      en: "Thank you for the details. I have successfully flagged this conversation and escalated it to our support manager. 👤\n\nThey will review your order details and message you directly shortly. We appreciate your patience!",
      ur: "تفصیلات فراہم کرنے کا شکریہ۔ میں نے یہ گفتگو ہمارے کسٹمر سپورٹ مینیجر کو منتقل کر دی ہے۔ 👤\n\nوہ جلد ہی آپ کے آرڈر کا جائزہ لے کر آپ سے براہِ راست رابطہ کریں گے۔ آپ کے تعاون کا شکریہ!",
      roman_urdu: "Details share karne ka shukriya. Main ne ye conversation support manager ko transfer kar di hai. 👤\n\nWo jald hi aap ke order details review kar ke direct aapse rabta karein ge. Apke patience ka shukriya!"
    },
    transitions: {
      "auto": "WELCOME" // Handoff resets chat for bot once resolved or handled
    }
  }
};

module.exports = {
  CONVERSATION_STATES
};
