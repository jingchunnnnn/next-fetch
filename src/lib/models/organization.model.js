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
  }
});

OrganizationSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Organization = mongoose.models.Organization || mongoose.model('Organization', OrganizationSchema);

export default Organization;
