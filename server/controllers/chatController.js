import { OpenAI } from "openai/client.js";
import { productList } from "./productController.js";
import Product from "../models/Product.js";
import { getChatResponse } from "../config/openai.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const productKeywords = [
  "product", "price", "cost", "buy", "purchase", "available", "stock",
  "category", "cheap", "expensive", "recommend", "suggestion", "show",
  "have", "sell", "selling", "offer", "deal", "item",
  
  "vegetable", "fruit", "grocery", "food", "kg", "per",
  
  "potato", "tomato", "carrot", "onion",
  
  "apple", "orange", "banana", "mango", "grapes",
  
  "amul milk", "paneer", "eggs", "cheese", "butter",
  
  "drink", "sprite", "fanta", "7up",
  
  "basmati", "wheat", "bread", "knorr soup", "noodles", "maggi"
];
const isProductRelated = (message) => {
  const lowerMsg = message.toLowerCase();
  return productKeywords.some(keyword => lowerMsg.includes(keyword));
};

export const chatWithBot = async (req, res) => {
  const { messages } = req.body;

  const latestMessage = messages[messages.length - 1].content;

  try {
    let productContext = "";

    if (isProductRelated(latestMessage)) {
      const products = await Product.find({}, "name price description category");
      productContext = products.map(p =>
        `- ${p.name} | Price: $${p.price} | Category: ${p.category} | ${p.description}`
      ).join("\n");
    } 

    const systemPrompt = productContext
      ? `You are a helpful shopping assistant for our e-commerce store.
Here are all available products:
${productContext}

RULES:
- Only recommend products from the list above.
- If a product is not available, say so politely and recommend similar ones from the list.
- Always mention name and price when recommending.
- Keep responses short and friendly.`
      : `You are a helpful shopping assistant for an e-commerce store.
Answer general questions politely and friendly in single line only.
If user asks about products, prices or availability, let them know they can ask you directly.`;


    const message = [
        { role: "system", content: systemPrompt },
        ...messages
      ]
    const response = await getChatResponse(message);

    res.json({ reply: response });

  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({ reply: "Something went wrong, please try again!" });
  }
};


