import { Redis } from "@upstash/redis";

const REDIS_URL = 'https://organic-sunfish-33911.upstash.io';
const REDIS_TOKEN = 'AYR3AAIncDI2ZTNmNWU3OGRjNjc0NGVlODZkZmMzZTcxZjRiYzRlZnAyMzM5MTE';

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  avatar?: string;
  productName?: string;
  date?: string;
}

interface PricingConfig {
  originalPrice?: number;
  salePrice?: number;
  couponEnabled?: boolean;
  couponCode?: string;
  couponExpiry?: string;
}

interface Product {
  gumroadUrl?: string;
  productImage?: string;
  productVideo?: string;
  salesCopy?: string;
  testimonials?: Testimonial[];
  pricing?: PricingConfig;
  previewPdf?: { data: string; pageCount: number };
}

const defaultTestimonials: Testimonial[] = [
  { id: "1", name: "Sarah Mitchell", review: "This product exceeded my expectations! The quality is amazing and the support team is incredibly responsive.", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face", productName: "Premium Digital Bundle", date: "2 days ago" },
  { id: "2", name: "James Rodriguez", review: "I've purchased many digital products before, but this one stands out. The attention to detail is incredible.", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", productName: "Pro Toolkit", date: "1 week ago" },
  { id: "3", name: "Emily Chen", review: "Fantastic value for money! The instant download worked perfectly and the documentation is excellent.", rating: 5, avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", productName: "Starter Pack", date: "3 days ago" }
];

export async function loader() {
  try {
    const product = await redis.get<Product>("xylo_product");
    if (!product) {
      return Response.json({ gumroadUrl: null, productImage: null, productVideo: null, salesCopy: "", testimonials: defaultTestimonials, pricing: { originalPrice: 15, salePrice: 9.99, couponEnabled: false, couponCode: "FLASH24", couponExpiry: null } });
    }
    const testimonials = product.testimonials && product.testimonials.length > 0 ? product.testimonials : defaultTestimonials;
    const pricing = product.pricing || { originalPrice: 15, salePrice: 9.99, couponEnabled: false, couponCode: "FLASH24", couponExpiry: null };
    return Response.json({ ...product, testimonials, pricing });
  } catch (error) {
    console.error("Error fetching product:", error);
    return Response.json({ gumroadUrl: null, productImage: null, productVideo: null, salesCopy: "", testimonials: defaultTestimonials, pricing: { originalPrice: 15, salePrice: 9.99, couponEnabled: false, couponCode: "FLASH24", couponExpiry: null } }, { status: 500 });
  }
}

export async function action({ request }: { request: Request }) {
  try {
    const contentType = request.headers.get("content-type");
    let existingProduct: Product = {};
    try { existingProduct = (await redis.get<Product>("xylo_product")) || {}; } catch (e) { console.log("No existing product found"); }
    
    if (contentType?.includes("application/json")) {
      const body = await request.json();
      const product: Product = {
        gumroadUrl: body.gumroadUrl || existingProduct.gumroadUrl || undefined,
        productImage: body.productImage || existingProduct.productImage || undefined,
        productVideo: body.productVideo || existingProduct.productVideo || undefined,
        salesCopy: body.salesCopy || existingProduct.salesCopy || undefined,
        testimonials: body.testimonials || existingProduct.testimonials || undefined,
        pricing: body.pricing || existingProduct.pricing || undefined,
        previewPdf: body.previewPdf || existingProduct.previewPdf || undefined,
      };
      await redis.set("xylo_product", product);
      return Response.json({ success: true, message: "Product saved successfully" });
    }
    
    const formData = await request.formData();
    
    let previewPdf: { data: string; pageCount: number } | undefined;
    const previewPdfData = formData.get("previewPdf");
    if (previewPdfData) {
      try { previewPdf = JSON.parse(previewPdfData as string); }
      catch (e) { previewPdf = existingProduct.previewPdf; }
    } else { previewPdf = existingProduct.previewPdf; }
    
    const product: Product = {
      gumroadUrl: (formData.get("gumroadUrl") as string) || existingProduct.gumroadUrl || undefined,
      productImage: (formData.get("productImage") as string) || existingProduct.productImage || undefined,
      productVideo: (formData.get("productVideo") as string) || existingProduct.productVideo || undefined,
      salesCopy: (formData.get("salesCopy") as string) || existingProduct.salesCopy || undefined,
      previewPdf,
    };
    
    const testimonialsData = formData.get("testimonials");
    if (testimonialsData) {
      try { product.testimonials = JSON.parse(testimonialsData as string); }
      catch (e) { product.testimonials = existingProduct.testimonials; }
    } else { product.testimonials = existingProduct.testimonials; }
    
    const pricingData = formData.get("pricing");
    if (pricingData) {
      try { product.pricing = JSON.parse(pricingData as string); }
      catch (e) { product.pricing = existingProduct.pricing; }
    } else { product.pricing = existingProduct.pricing; }
    
    await redis.set("xylo_product", product);
    return Response.json({ success: true, message: "Product saved successfully" });
  } catch (error) {
    console.error("Error saving product:", error);
    return Response.json({ success: false, message: "Failed to save product" }, { status: 500 });
  }
}
