import 'dotenv/config'
import { GoogleGenAI } from "@google/genai"
import fs from "fs"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

// Converts local file information to base64
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  }
}

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  contents: [
    "Return a bounding box for the piranha.",
    fileToGenerativePart("img/piranha.jpg", "image/jpeg"),
  ]
})

console.log(response.text)
