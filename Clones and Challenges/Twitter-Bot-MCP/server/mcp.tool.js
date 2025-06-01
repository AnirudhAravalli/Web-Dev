// mcp.tool.js
import dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

dotenv.config();

const twitterClient = new TwitterApi({
  appKey:        process.env.TWITTER_API_KEY,
  appSecret:     process.env.TWITTER_API_SECRET,
  accessToken:   process.env.TWITTER_ACCESS_TOKEN,
  accessSecret:  process.env.TWITTER_TOKEN_SECRET,
});

// wrap for read+write
const rwClient = twitterClient.readWrite;

// Unsplash API for copyright-free images
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function searchImages(query, count = 1) {
  try {
    if (!UNSPLASH_ACCESS_KEY) {
      return {
        content: [{ type: "text", text: "Unsplash API key not configured. Please add UNSPLASH_ACCESS_KEY to your .env file." }]
      };
    }

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );

    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const images = data.results.map(img => ({
        id: img.id,
        url: img.urls.regular,
        smallUrl: img.urls.small,
        description: img.alt_description || img.description || query,
        photographer: img.user.name,
        photographerUrl: img.user.links.html
      }));

      return {
        content: [{
          type: "text", 
          text: `Found ${images.length} image(s) for "${query}": ${JSON.stringify(images, null, 2)}`
        }]
      };
    } else {
      return {
        content: [{ type: "text", text: `No images found for query: ${query}` }]
      };
    }
  } catch (error) {
    console.error("Image search failed:", error);
    return {
      content: [{ type: "text", text: `Error searching for images: ${error.message}` }]
    };
  }
}

async function downloadImage(imageUrl, filename) {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    
    // Create temp directory if it doesn't exist
    const tempDir = './temp';
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    const filepath = path.join(tempDir, filename);
    fs.writeFileSync(filepath, buffer);
    return filepath;
  } catch (error) {
    throw new Error(`Failed to download image: ${error.message}`);
  }
}

export async function createPost(status, imageQuery = null) {
  try {
    let mediaId = null;
    
    // If image is requested, search and download it
    if (imageQuery) {
      if (!UNSPLASH_ACCESS_KEY) {
        return {
          content: [{ type: "text", text: "Cannot add image: Unsplash API key not configured. Posting text only." }]
        };
      }

      try {
        // Search for image
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(imageQuery)}&per_page=1&orientation=landscape`,
          {
            headers: {
              'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
          }
        );

        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
          const image = data.results[0];
          const filename = `temp_${Date.now()}.jpg`;
          
          // Download image
          const filepath = await downloadImage(image.urls.regular, filename);
          
          // Upload to Twitter
          const mediaUpload = await rwClient.v1.uploadMedia(filepath);
          mediaId = mediaUpload;
          
          // Add photo credit to the status
          status += `\n\nPhoto by ${image.user.name} on Unsplash`;
          
          // Clean up temp file
          fs.unlinkSync(filepath);
          
          console.log(`Image uploaded successfully for query: ${imageQuery}`);
        } else {
          console.log(`No image found for query: ${imageQuery}, posting without image`);
        }
      } catch (imageError) {
        console.error("Image processing error:", imageError);
        console.log("Posting without image due to error");
      }
    }
    
    // Create tweet with or without media
    const tweetOptions = { text: status };
    if (mediaId) {
      tweetOptions.media = { media_ids: [mediaId] };
    }
    
    const { data } = await rwClient.v2.tweet(tweetOptions);
    
    const successMessage = mediaId 
      ? `Tweet posted with image: ${data.text}`
      : `Tweet posted: ${data.text}`;
      
    return {
      content: [{ type: "text", text: successMessage }]
    };
  } catch (err) {
    console.error("Tweet failed:", err);
    return {
      content: [{ type: "text", text: `Error posting tweet: ${err.message}` }]
    };
  }
}

export async function createPostWithImage(status, imageQuery) {
  return createPost(status, imageQuery);
}