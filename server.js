import 'dotenv/config'
import { GoogleGenAI } from "@google/genai"
import { getAnimeCharacterImage } from './utils/get-anime-character-image.js'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

app.post('/api/identify-anime-character', async (req, res) => {
  const { show, description } = req.body

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    config: { responseMimeType: "application/json" },
    contents: `Can you help me identify this character? Found in ${show} (Anime), the description is ${description}.

    List the 3 top most likely characters using this JSON schema:

    Character = {'name': string, 'description': string}
    Return: Array<Character>`
  })

  const json = JSON.parse(response.text)
  const combinedResponse = await Promise.all(json.map(async (option) => ({
    ...option,
    image: await getAnimeCharacterImage(option.name)
  })))

  res.json(combinedResponse)
})

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`)
})

// curl -X POST http://localhost:3000/api/identify-bird -H "Content-Type: application/json" -d '{"state": "California", "description": "A small, brown bird with a white belly and a black stripe on its head"}'
// curl -X POST http://localhost:3000/api/identify-anime-character -H "Content-Type: application/json" -d '{"show": "Naruto", "description": "A young ninja with spiky blonde hair and whisker marks"}'