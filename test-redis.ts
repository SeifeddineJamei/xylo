/**
 * Test script to verify Upstash Redis connection
 * Run with: npx tsx test-redis.ts
 */

import { Redis } from "@upstash/redis";

// Fallback credentials for local testing (remove after verifying)
const FALLBACK_URL = 'https://organic-sunfish-33911.upstash.io';
const FALLBACK_TOKEN = 'AYR3AAIncDI2ZTNmNWU3OGRjNjc0NGVlODZkZmMzZTcxZjRiYzRlZnAyMzM5MTE';

async function testRedisConnection() {
  console.log("🔄 Testing Upstash Redis Connection...\n");

  try {
    // Initialize Redis client using environment variables
    // Uses: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN (and other compatible vars)
    let redis = Redis.fromEnv();
    
    // Check if environment variables are set, use fallback if not
    const envUrl = process.env.UPSTASH_REDIS_REST_URL;
    const envToken = process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!envUrl || !envToken) {
      console.log("⚠️  Environment variables not found, using fallback credentials...\n");
      redis = new Redis({
        url: FALLBACK_URL,
        token: FALLBACK_TOKEN,
      });
    }

    // Test 1: Set a value
    console.log("📝 Test 1: Setting a test value...");
    await redis.set("test_key", "Hello from Upstash Redis!");
    console.log("✅ Value set successfully!\n");

    // Test 2: Get the value
    console.log("📝 Test 2: Getting the test value...");
    const value = await redis.get("test_key");
    console.log(`✅ Retrieved value: "${value}"\n`);

    // Test 3: Set and get product data
    console.log("📝 Test 3: Testing product data structure...");
    const productData = {
      gumroadUrl: "https://gumroad.com/l/test-product",
      productImage: "https://example.com/image.jpg",
      productVideo: "https://example.com/video.mp4",
      salesCopy: "Test Product - Buy Now!"
    };
    
    await redis.set("xylo_product", productData);
    const savedProduct = await redis.get("xylo_product");
    console.log("✅ Product data saved and retrieved successfully!");
    console.log("   Product:", JSON.stringify(savedProduct, null, 2));

    // Clean up test data
    await redis.del("test_key");
    await redis.del("xylo_product");
    console.log("\n🧹 Test data cleaned up.\n");

    console.log("🎉 All tests passed! Redis is connected and working!");

  } catch (error) {
    console.error("\n❌ Error connecting to Redis:");
    console.error(error);
    
    console.log("\n📋 To fix this, make sure you have:");
    console.log("1. Created a Redis database at https://upstash.com");
    console.log("2. Added these environment variables to your .env file:");
    console.log("   UPSTASH_REDIS_REST_URL=your-rest-url");
    console.log("   UPSTASH_REDIS_REST_TOKEN=your-rest-token");
    console.log("3. For local testing, restart your dev server after updating .env");
    
    process.exit(1);
  }
}

testRedisConnection();
