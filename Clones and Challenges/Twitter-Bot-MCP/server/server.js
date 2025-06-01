import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js"
import express from "express"
import { z } from "zod"
import { createPost, createPostWithImage, searchImages } from "./mcp.tool.js"

const app = express()
const port = 3000

const server = new McpServer({
    name: "Twitter Bot",
    version: "1.0.0"
})

const transports = {}

server.tool(
    "addTwoNumbers",
    "Add two numbers",
    {
        a: z.number(),
        b: z.number()
    },
    async ({a, b}) => {
        return {
            content: [
                {
                    type: "text",
                    text: `The sum of ${a} and ${b} is ${a + b}`
                }
            ]
        }
    }
)

server.tool(
    "createPost",
    "Creates a post on X (formerly known as Twitter) with the provided content",
    {
        status: z.string().describe("The exact content to post on X/Twitter")
    },
    async ({ status }) => {
        return createPost(status)
    }
)

server.tool(
    "createPostWithImage",
    "Creates a post on X with both text content and a copyright-free image",
    {
        status: z.string().describe("The text content to post on X/Twitter"),
        imageQuery: z.string().describe("Search query for finding a relevant copyright-free image (e.g., 'sunset', 'coffee', 'technology')")
    },
    async ({ status, imageQuery }) => {
        return createPostWithImage(status, imageQuery)
    }
)

server.tool(
    "searchImages",
    "Search for copyright-free images from Unsplash",
    {
        query: z.string().describe("Search query for images"),
        count: z.number().optional().describe("Number of images to return (default: 1)")
    },
    async ({ query, count }) => {
        return searchImages(query, count)
    }
)

server.tool(
    "createTopicPost",
    "Generates and creates an engaging post on X about a specific topic, with optional image",
    {
        topic: z.string().describe("The topic to create a post about"),
        tone: z.enum(["casual", "professional", "humorous", "inspirational", "informative"]).optional().describe("The tone of the post"),
        includeHashtags: z.boolean().optional().describe("Whether to include relevant hashtags"),
        includeImage: z.boolean().optional().describe("Whether to include a relevant copyright-free image")
    },
    async ({ topic, tone = "casual", includeHashtags = true, includeImage = false }) => {
        // Generate content based on topic and tone
        let content = "";
        
        // Simple content generation based on topic keywords
        const topicLower = topic.toLowerCase();
        
        if (topicLower.includes("ai") || topicLower.includes("artificial intelligence")) {
            const aiPosts = [
                "The future of AI is here and it's incredibly exciting! 🤖 Every day brings new possibilities and innovations that can help solve real-world problems.",
                "AI isn't about replacing humans - it's about augmenting our capabilities and helping us achieve more than we ever thought possible! 🚀",
                "Just amazed by how AI continues to evolve. The collaboration between human creativity and machine intelligence is where the magic happens! ✨"
            ];
            content = aiPosts[Math.floor(Math.random() * aiPosts.length)];
            if (includeHashtags) content += " #AI #ArtificialIntelligence #Innovation #Future";
        }
        else if (topicLower.includes("coffee")) {
            const coffeePosts = [
                "Nothing beats that first sip of perfectly brewed coffee in the morning ☕ It's like a warm hug for your soul!",
                "Coffee: because adulting is hard and we all need a little help sometimes ☕😄",
                "The aroma of fresh coffee beans is proof that some of life's greatest pleasures are simple ones ☕✨"
            ];
            content = coffeePosts[Math.floor(Math.random() * coffeePosts.length)];
            if (includeHashtags) content += " #Coffee #MorningVibes #CoffeeLife";
        }
        else if (topicLower.includes("weather")) {
            const weatherPosts = [
                "There's something magical about watching the weather change. Nature's daily reminder that change can be beautiful! 🌤️",
                "Perfect weather today! Sometimes you just need to step outside and appreciate the simple beauty around us 🌞",
                "Rainy days have their own charm - perfect for reflection, cozy moments, and the sound of nature's rhythm 🌧️"
            ];
            content = weatherPosts[Math.floor(Math.random() * weatherPosts.length)];
            if (includeHashtags) content += " #Weather #Nature #Beautiful";
        }
        else if (topicLower.includes("motivation") || topicLower.includes("inspiration")) {
            const motivationPosts = [
                "Every small step forward is progress. Don't underestimate the power of consistency and determination! 💪",
                "Your potential is limitless. The only barriers are the ones you accept. Keep pushing forward! 🚀",
                "Success isn't about being perfect - it's about being persistent. Keep going, you've got this! ✨"
            ];
            content = motivationPosts[Math.floor(Math.random() * motivationPosts.length)];
            if (includeHashtags) content += " #Motivation #Success #Growth #Mindset";
        }
        else if (topicLower.includes("technology") || topicLower.includes("tech")) {
            const techPosts = [
                "Technology is reshaping our world in incredible ways! From smart homes to space exploration, we're living in the future 🚀",
                "The pace of technological innovation is breathtaking. What seemed impossible yesterday is reality today! 💻",
                "Love how technology connects us all. Despite the distance, we're more connected than ever before! 🌐"
            ];
            content = techPosts[Math.floor(Math.random() * techPosts.length)];
            if (includeHashtags) content += " #Technology #Innovation #Future #Tech";
        }
        else {
            // Generic content for any topic
            content = `Thinking about ${topic} today and how it impacts our daily lives. There's always something new to discover and appreciate! 🤔✨`;
            if (includeHashtags) {
                const words = topic.split(' ').map(word => 
                    '#' + word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
                content += ` ${words.join(' ')}`;
            }
        }
        
        // Adjust tone
        if (tone === "professional") {
            content = content.replace(/!+/g, '.').replace(/😄|😊|🤔/g, '');
        } else if (tone === "humorous") {
            content += " 😄";
        }
        
        // Ensure it's under 280 characters (accounting for photo credit if image is included)
        const maxLength = includeImage ? 200 : 280; // Leave space for photo credit
        if (content.length > maxLength) {
            content = content.substring(0, maxLength - 3) + "...";
        }
        
        // Post with or without image
        if (includeImage) {
            return createPostWithImage(content, topic);
        } else {
            return createPost(content);
        }
    }
)

// Server to Client Communication
app.get("/sse", async (req, res) => {
    const transport = new SSEServerTransport('/messages', res)
    transports[transport.sessionId] = transport

    res.on("close", () => {
        delete transports[transport.sessionId]
    })
    await server.connect(transport)
})

// Client to Server Communication 
app.post("/messages", async (req, res) => {
    const sessionId = req.query.sessionId
    const transport = transports[sessionId]

    if(transport) {
        await transport.handlePostMessage(req, res)
    } else {
        res.status(400).send(`No transport found for the Session Id: ${sessionId}`)
    }
})

app.listen(port, () => console.log(`Server running on port ${port}`))