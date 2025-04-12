import 'dotenv/config'
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: `Can you help me identify this bird? It had black and white stripes, with a small patch of red on its head.`
})

console.log(response.text)
