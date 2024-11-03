import { Clerk } from '@clerk/nextjs/server';

const clerkClient = new Clerk({
    apiKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
});

export default clerkClient;
