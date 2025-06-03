import 'dotenv/config'
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: `Can you help me identify this character? He has yellow hair and wears a orange training jacket.`
})

console.log(response.text)
