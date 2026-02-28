import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getChatResponse = async (messages) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    temperature: 0.4,
    max_completion_tokens:300
  });

  return response.choices[0].message.content;
};