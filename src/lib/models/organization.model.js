import mongoose from 'mongoose';

const OrganizationSchema = new mongoose.Schema({
  clerkId: { 
    type: String, 
    required: true, 
    unique: true,
  },
  name: { 
    type: String, 
    required: true,
  },
  description: { 
    type: String 
  },
  members: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User',
      required: true,
    },
    userMongoId: {
      type: String,
      required: true, // Make sure this is required if you need it for every member
    },
  }],
  metadata: { 
    type: Object, 
    default: {},
  },
  createdAt: { 
    type: Date, 
    default: Date.now,
  },
  updatedAt: { 
    type: Date, 
    default: Date.now,
  },
});

OrganizationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Organization = mongoose.models.Organization || mongoose.model('Organization', OrganizationSchema);

export default Organization;
