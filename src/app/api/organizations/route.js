import { Clerk } from '@clerk/nextjs';

export default async function handler(req, response) {
  const clerkClient = new Clerk({
    apiKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  });

  try {
    const organizations = (await clerkClient()).organizations.list();
    response.status(200).json(organizations);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch organizations' });
  }
}

