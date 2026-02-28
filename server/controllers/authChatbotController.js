import { getChatResponse } from "../config/openai.js";


const SYSTEM_PROMPT = `
You are an authentication assistant. Help users signup or login.

For SIGNUP collect: name, email, password
For LOGIN collect: email, password

Steps:
1. Ask if user wants to login or signup.
2. Collect the required fields naturally in conversation.
3. Once you have all fields, show a summary and ask for confirmation:
   "Here's what I have:
    Name: John (only for signup)
    Email: john@example.com
    Password: ••••••••
    Shall I proceed or do you want to correct anything?"
4. When user confirms, reply with ONLY this format — nothing else:
   ACTION:{"type":"signup","name":"John","email":"john@example.com","password":"pass123"}
   or
   ACTION:{"type":"login","email":"john@example.example","password":"pass123"}
5. If user wants correction, ask what to fix and update accordingly.
`;

export const authChatbot = async (req, res) => {
  try {
    const { messages } = req.body;

    const fullMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    const botReply = await getChatResponse(fullMessages);

    // Check if GPT has collected all data and user confirmed
    if (botReply.includes("ACTION:")) {
      const jsonMatch = botReply.match(/ACTION:(\{.*?\})/s);

      if (jsonMatch) {
        const actionData = JSON.parse(jsonMatch[1]);

        // Just send collected data back to frontend — no DB, no logic here
        return res.json({
          reply: "Got it! Processing your request...",
          actionData,         // { type, name?, email, password }
          readyToSubmit: true // flag so frontend knows to call the real API
        });
      }
    }

    // Still collecting info — just return bot reply
    res.json({ reply: botReply, readyToSubmit: false });

  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Chatbot failed" });
  }
};