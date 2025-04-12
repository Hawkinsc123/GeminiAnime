import 'dotenv/config'
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

const state = process.argv[2]
const description = process.argv[3]

const response = await ai.models.generateContent({
  model: "gemini-2.0-flash",
  config: { responseMimeType: "application/json" },
  contents: `Can you help me identify this bird? Found in ${state} (North America), the description is ${description}.

  List the 3 top most likely species using this JSON schema:

  Bird = {'name': string, 'description': string}
  Return: Array<Bird>`
})

console.log(response.text)
