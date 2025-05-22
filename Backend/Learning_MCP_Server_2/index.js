import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

const server = new McpServer({
    name: "Weather Data Fetcher",
    version: "1.0.0",
})

async function getWeatherByCity(city) {
    if(city.toLowerCase() === "patiala") {
        return { temp: '30 C', forecast: 'chances of high rain' }
    }

    else if(city.toLowerCase() === 'new delhi') {
        return { temp: '40 C', forecast: 'chances of high warm winds' }
    }
    return { temp: null, error: 'Unable to get the data' }
}

server.tool(
    "getWeatherDataByCityName",
    "Get the Weather Information of the Given City",
    {
        city: z.string(),
    },
    async ({ city }) => {
        return {
            content: [{
                type: "text",
                text: JSON.stringify(await getWeatherByCity(city)),       // For converting the result of the getWeatherByCity function from JSON format to String format
            }],
        }
    }
)

async function init() {
    const transport = new StdioServerTransport()
    await server.connect(transport)
}

init()