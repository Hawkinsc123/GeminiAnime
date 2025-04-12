import 'dotenv/config'
import { GoogleGenAI } from "@google/genai"
import readline from 'node:readline/promises'
import { stdin, stdout } from 'node:process'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
const chat = ai.chats.create({ model: "gemini-2.0-flash" })
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

while (true) {
  // get user input
  const userInput = await rl.question("You: ")

  // send user input to chat
  const response = await chat.sendMessage({
    message: userInput,
  })

  // print the response
  console.log("AI:", response.text)
}
