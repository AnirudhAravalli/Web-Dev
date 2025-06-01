import readline from "readline/promises"
import { GoogleGenAI } from "@google/genai"
import dotenv from "dotenv"
import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js"

dotenv.config()
let tools = []

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const mcpClient = new Client({
    name: "twitter-bot-client",
    version: "1.0.0"
})

const chatHistory = []
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
})

mcpClient.connect(new SSEClientTransport(new URL("http://localhost:3000/sse")))
    .then(async () => {
        console.log("Connected to the MCP Server Successfully")
        tools = (await mcpClient.listTools()).tools.map(tool => {
            return {
                name: tool.name,
                description: tool.description,
                parameters: tool.inputSchema || {
                    type: "object",
                    properties: {},
                    required: []
                }
            }
        })    
        console.log("Available Tools: ", tools)
        
        // Add system message with better instructions
        chatHistory.push({
            role: "user",
            parts: [{
                text: `You are an AI assistant with access to tools for posting on X (Twitter) and doing calculations. 

Available tools:
- createPost: Use this to post tweets/messages on X when the user asks you to post something, tweet something, or share content on X/Twitter
- addTwoNumbers: Use this to add two numbers together

When a user asks you to:
1. Post specific content on X (e.g., "Post this: Hello world") - use createPost with their exact content
2. Create a post about a topic (e.g., "Create a post about AI", "Tweet about coffee", "Post something about the weather") - first generate engaging, relevant content about that topic, then use createPost with your generated content
3. Tweet or share something on social media - use createPost appropriately

Guidelines for topic-based posts:
- Keep tweets under 280 characters
- Make them engaging and relevant
- Use appropriate hashtags when relevant
- Match the tone to the topic (professional for tech, casual for lifestyle, etc.)
- Be creative and authentic

Be helpful and engaging in your responses!`
            }]
        })
        
        chatLoop()
    })

async function chatLoop() {
    const question = await rl.question('You: ')
    
    chatHistory.push({
        role: "user",
        parts: [{
            text: question
        }]
    })

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: chatHistory,
            config: {
                tools: [{
                    functionDeclarations: tools
                }]
            }
        });

        const candidate = response.candidates[0]
        const part = candidate.content.parts[0]
        const functionCall = part.functionCall
        const responseText = part.text

        if (functionCall) {
            console.log('🔧 Using tool:', functionCall.name)
            
            // Add the function call to history
            chatHistory.push({
                role: "model",
                parts: [{
                    functionCall: functionCall
                }]
            })
            
            // Execute the tool
            const toolResult = await mcpClient.callTool({
                name: functionCall.name,
                arguments: functionCall.args
            })
            
            console.log('✅ Tool result:', toolResult.content[0].text)
            
            // Add the function response to history
            chatHistory.push({
                role: "function",
                parts: [{
                    functionResponse: {
                        name: functionCall.name,
                        response: {
                            result: toolResult.content[0].text
                        }
                    }
                }]
            })
            
            // Generate response with the tool result
            const followUpResponse = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: chatHistory,
                config: {
                    tools: [{
                        functionDeclarations: tools
                    }]
                }
            });
            
            const followUpText = followUpResponse.candidates[0].content.parts[0].text
            console.log(`🤖 Bot: ${followUpText}`)
            
            chatHistory.push({
                role: "model",
                parts: [{
                    text: followUpText
                }]
            })
        } else if (responseText) {
            console.log(`🤖 Bot: ${responseText}`)
            chatHistory.push({
                role: "model",
                parts: [{
                    text: responseText
                }]
            })
        }
    } catch (error) {
        console.error('❌ Error:', error)
        console.log('🤖 Bot: Sorry, I encountered an error. Please try again.')
    }

    chatLoop()
}