import 'dotenv/config'
import { GoogleGenAI } from "@google/genai"
import { getBirdImage } from '../utils/get-bird-image.js'

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

const json = JSON.parse(response.text)

// merge the gemini response with the image url from the bird api
const combinedResponse = await Promise.all(json.map(async (option) => ({
  ...option,
  image: await getBirdImage(option.name)
})))

console.log(combinedResponse)
