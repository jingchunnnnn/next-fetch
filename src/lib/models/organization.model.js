import mongoose from 'mongoose';

const organizationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

const Organization = mongoose.models.Organization || mongoose.model('Organization', organizationSchema);

export default Organization;
