import { Redis } from "@upstash/redis";

const REDIS_URL = 'https://organic-sunfish-33911.upstash.io';
const REDIS_TOKEN = 'AYR3AAIncDI2ZTNmNWU3OGRjNjc0NGVlODZkZmMzZTcxZjRiYzRlZnAyMzM5MTE';

const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});

interface Subscriber {
  email: string;
  subscribedAt: string;
}

// GET endpoint - Fetch all subscribers
export async function loader() {
  try {
    const subscribers = await redis.get<Subscriber[]>("xylo_subscribers");
    
    if (!subscribers) {
      return Response.json({ subscribers: [] });
    }
    
    return Response.json({ subscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return Response.json({ subscribers: [], error: "Failed to fetch subscribers" }, { status: 500 });
  }
}

// POST endpoint - Add new subscriber
export async function action({ request }: { request: Request }) {
  try {
    const contentType = request.headers.get("content-type");
    
    let email: string;
    
    if (contentType?.includes("application/json")) {
      const body = await request.json();
      email = body.email;
    } else {
      const formData = await request.formData();
      email = formData.get("email") as string;
    }
    
    if (!email) {
      return Response.json({ success: false, message: "Email is required" }, { status: 400 });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, message: "Invalid email format" }, { status: 400 });
    }
    
    // Get existing subscribers
    let subscribers: Subscriber[] = [];
    try {
      subscribers = (await redis.get<Subscriber[]>("xylo_subscribers")) || [];
    } catch (e) {
      subscribers = [];
    }
    
    // Check if email already exists
    const exists = subscribers.some(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return Response.json({ success: false, message: "Email already subscribed" }, { status: 400 });
    }
    
    // Add new subscriber
    const newSubscriber: Subscriber = {
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString()
    };
    
    subscribers.push(newSubscriber);
    
    // Save to Redis
    await redis.set("xylo_subscribers", subscribers);
    
    return Response.json({ success: true, message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Error subscribing:", error);
    return Response.json({ success: false, message: "Failed to subscribe" }, { status: 500 });
  }
}
