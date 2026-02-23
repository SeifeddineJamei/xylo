import { Redis } from "@upstash/redis";

// Upstash Redis credentials - Using known working credentials
const REDIS_URL = 'https://organic-sunfish-33911.upstash.io';
const REDIS_TOKEN = 'AYR3AAIncDI2ZTNmNWU3OGRjNjc0NGVlODZkZmMzZTcxZjRiYzRlZnAyMzM5MTE';

// Initialize Redis client
const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

// Product type definition
interface Product {
  gumroadUrl?: string;
  productImage?: string;
  productVideo?: string;
  salesCopy?: string;
}

// GET endpoint - Fetch product from Redis
export async function loader() {
  try {
    const product = await redis.get<Product>("xylo_product");
    
    if (!product) {
      return Response.json({ 
        gumroadUrl: null, 
        productImage: null, 
        productVideo: null, 
        salesCopy: "" 
      });
    }
    
    return Response.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json({ 
      gumroadUrl: null, 
      productImage: null, 
      productVideo: null, 
      salesCopy: "" 
    }, { status: 500 });
  }
}

// POST endpoint - Save product to Redis
export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    
    const product: Product = {
      gumroadUrl: formData.get("gumroadUrl") as string || undefined,
      productImage: formData.get("productImage") as string || undefined,
      productVideo: formData.get("productVideo") as string || undefined,
      salesCopy: formData.get("salesCopy") as string || undefined,
    };
    
    // Save to Redis
    await redis.set("xylo_product", product);
    
    return Response.json({ success: true, message: "Product saved successfully" });
  } catch (error) {
    console.error("Error saving product:", error);
    return Response.json({ success: false, message: "Failed to save product" }, { status: 500 });
  }
}
