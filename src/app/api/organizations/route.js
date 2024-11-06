import Organization from '@/lib/models/organization.model';
import { connect } from '@/lib/mongodb/mongoose.js';


export const GET = async (req) => {
  try {
    await connect();
    const organizations = await Organization.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(organizations), {
      status: 200,
    });
  } catch (error) {
    console.log('Error getting organizations:', error);
    return new Response('Error getting organizations', {
      status: 500,
    });
  }
};

