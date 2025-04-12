import 'dotenv/config'
import { GoogleGenAI } from "@google/genai"
import { getBirdImage } from './utils/get-bird-image.js'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

app.post('/api/identify-bird', async (req, res) => {
  const { state, description } = req.body

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: { responseMimeType: "application/json" },
    contents: `Can you help me identify this bird? Found in ${state} (North America), the description is ${description}.

    List the 3 top most likely species using this JSON schema:

    Bird = {'name': string, 'description': string}
    Return: Array<Bird>`
  })

  const json = JSON.parse(response.text)
  const combinedResponse = await Promise.all(json.map(async (option) => ({
    ...option,
    image: await getBirdImage(option.name)
  })))

  res.json(combinedResponse)
})

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})

// curl -X POST http://localhost:3000/api/identify-bird -H "Content-Type: application/json" -d '{"state": "California", "description": "A small, brown bird with a white belly and a black stripe on its head"}'
