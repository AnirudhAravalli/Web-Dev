import {
    McpServer,
    ResourceTemplate
} from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const server = new McpServer({
    name: "Practice Server",
    version: "1.0.0",
})

// Defining a tool 
server.tool(
    "getOrders",
    "Get all orders",
    {
        days: z.number().describe("The days back to get orders for"),
    },
    async ({ days }) => ({
        content: [{ type: "text", text: JSON.stringify({ days, orders: [] }) }]
    })
)

// Defining a resource
server.resource(
    "documents",
    new ResourceTemplate("documents://{name}", {
        list: async () => ({
            resources: [
                {
                    uri: "documents://README.md",
                    name: "Read Me File",
                    description: "Read me file for understanding Model Context Protocol"
                },
            ]
        })
    }),
    async (uri, { name }) => ({
        contents: [
            {
                uri: uri.href,
                text: `This is the file for: ${name}`,
            }
        ],
    })
)

// We are going to run the server using the Standard I/O  
const transport = new StdioServerTransport();
server.connect(transport)
    .then(() => {
        console.log('Server connected successfully');
    })
    .catch((error) => {
        console.error('Failed to connect server:', error);
    });
