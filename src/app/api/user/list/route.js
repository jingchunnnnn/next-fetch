import User from '../../../../lib/models/user.model';
import { connect } from '../../../../lib/mongodb/mongoose';

export const GET = async (req) => {
  try {
    await connect();

    const users = await User.find({});

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Failed to fetch the user data', { status: 500 });
  }
};
