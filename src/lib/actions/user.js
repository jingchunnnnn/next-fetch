import User from '../models/user.model';
import Organization from '../models/organization.model';

import { connect } from '../mongodb/mongoose';

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    await connect();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          avatar: image_url,
          email: email_addresses[0].email_address,
          username,
        },
      },
      { new: true, upsert: true }
    );
    return user;
  } catch (error) {
    console.log('Error creating or updating user:', error);
  }
};

export const deleteUser = async (id) => {
  try {
    await connect();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log('Error deleting user:', error);
  }
};

export const createOrUpdateOrganization = async (id, name, metadata) => {
  try {
    await connect();
    const organization = await Organization.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          name,
          metadata,
        },
      },
      { new: true, upsert: true }
    );

    return organization;
  } catch (error) {
    console.log('Error creating or updating organization:', error);
    throw error; 
  }
};

export const deleteOrganization = async (id) => {
  try {
    await connect();
    const result = await Organization.findOneAndDelete({ clerkId: id });

    return result;
  } catch (error) {
    console.log('Error deleting organization:', error);
    throw error;
  }
};