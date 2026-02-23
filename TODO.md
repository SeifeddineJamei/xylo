h# TODO: Add Persistent Product Storage with Upstash Redis

## Steps:
- [x] 1. Install @upstash/redis package
- [x] 2. Create API route for GET product (app/routes/api.product.tsx)
- [x] 3. Create API route for POST/Save product (app/routes/api.product.tsx)
- [x] 4. Update admin.tsx - Save to Redis API instead of localStorage
- [x] 5. Update home.tsx - Load from Redis API instead of localStorage

## Environment Variables Needed (Add in Vercel):
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
