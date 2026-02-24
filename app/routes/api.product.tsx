import { Redis } from "@upstash/redis";

// Upstash Redis credentials - Using known working credentials
const REDIS_URL = 'https://organic-sunfish-33911.upstash.io';
const REDIS_TOKEN = 'AYR3AAIncDI2ZTNmNWU3OGRjNjc0NGVlODZkZmMzZTcxZjRiYzRlZnAyMzM5MTE';

// Initialize Redis client
const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

// Testimonial type definition
interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  avatar?: string;
  productName?: string;
  date?: string;
}

// Pricing/Coupon type definition
interface PricingConfig {
  originalPrice?: number;      // The anchor price (e.g., $15.00)
  salePrice?: number;          // The sale price (e.g., $9.99)
  couponEnabled?: boolean;     // Whether flash sale is active
  couponCode?: string;         // Coupon code for display
  couponExpiry?: string;       // ISO date string for expiry
}

// Product type definition
interface Product {
  gumroadUrl?: string;
  productImage?: string;
  productVideo?: string;
  salesCopy?: string;
  testimonials?: Testimonial[];
  pricing?: PricingConfig;
}

// Default testimonials for initial display
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    review: "This product exceeded my expectations! The quality is amazing and the support team is incredibly responsive. I've already recommended it to my colleagues.",
    rating: 5,
    productName: "Premium Digital Bundle",
    date: "2 days ago"
  },
  {
    id: "2",
    name: "James Rodriguez",
    review: "I've purchased many digital products before, but this one stands out. The attention to detail and practical features make it worth every penny.",
    rating: 5,
    productName: "Pro Toolkit",
    date: "1 week ago"
  },
  {
    id: "3",
    name: "Emily Chen",
    review: "Fantastic value for money! The instant download worked perfectly and the documentation is so well written. Five stars!",
    rating: 5,
    productName: "Starter Pack",
    date: "3 days ago"
  }
];

// GET endpoint - Fetch product from Redis
export async function loader() {
  try {
    const product = await redis.get<Product>("xylo_product");
    
    if (!product) {
      return Response.json({ 
        gumroadUrl: null, 
        productImage: null, 
        productVideo: null, 
        salesCopy: "",
        testimonials: defaultTestimonials,
        pricing: {
          originalPrice: 15,
          salePrice: 9.99,
          couponEnabled: false,
          couponCode: "FLASH24",
          couponExpiry: null
        }
      });
    }
    
    // If no testimonials in Redis, use defaults
    const testimonials = product.testimonials && product.testimonials.length > 0 
      ? product.testimonials 
      : defaultTestimonials;
    
    // Default pricing if not set
    const pricing = product.pricing || {
      originalPrice: 15,
      salePrice: 9.99,
      couponEnabled: false,
      couponCode: "FLASH24",
      couponExpiry: null
    };
    
    return Response.json({
      ...product,
      testimonials,
      pricing
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json({ 
      gumroadUrl: null, 
      productImage: null, 
      productVideo: null, 
      salesCopy: "",
      testimonials: defaultTestimonials,
      pricing: {
        originalPrice: 15,
        salePrice: 9.99,
        couponEnabled: false,
        couponCode: "FLASH24",
        couponExpiry: null
      }
    }, { status: 500 });
  }
}

// POST endpoint - Save product to Redis
export async function action({ request }: { request: Request }) {
  try {
    const contentType = request.headers.get("content-type");
    
    // Handle JSON formData
    if (contentType?.includes("application/json")) {
      const body = await request.json();
      
      const product: Product = {
        gumroadUrl: body.gumroadUrl || undefined,
        productImage: body.productImage || undefined,
        productVideo: body.productVideo || undefined,
        salesCopy: body.salesCopy || undefined,
        testimonials: body.testimonials || undefined,
        pricing: body.pricing || undefined,
      };
      
      // Save to Redis
      await redis.set("xylo_product", product);
      
      return Response.json({ success: true, message: "Product saved successfully" });
    }
    
    // Handle regular formData
    const formData = await request.formData();
    
    const product: Product = {
      gumroadUrl: formData.get("gumroadUrl") as string || undefined,
      productImage: formData.get("productImage") as string || undefined,
      productVideo: formData.get("productVideo") as string || undefined,
      salesCopy: formData.get("salesCopy") as string || undefined,
    };
    
    // Check if testimonials are sent as JSON string
    const testimonialsData = formData.get("testimonials");
    if (testimonialsData) {
      try {
        product.testimonials = JSON.parse(testimonialsData as string);
      } catch (e) {
        console.error("Error parsing testimonials:", e);
      }
    }
    
    // Parse pricing data
    const pricingData = formData.get("pricing");
    if (pricingData) {
      try {
        product.pricing = JSON.parse(pricingData as string);
      } catch (e) {
        console.error("Error parsing pricing:", e);
      }
    }
    
    // Save to Redis
    await redis.set("xylo_product", product);
    
    return Response.json({ success: true, message: "Product saved successfully" });
  } catch (error) {
    console.error("Error saving product:", error);
    return Response.json({ success: false, message: "Failed to save product" }, { status: 500 });
  }
}
