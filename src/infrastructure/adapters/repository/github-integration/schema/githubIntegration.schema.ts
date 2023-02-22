import { Schema } from 'mongoose';

const GithubIntegrationSchema = new Schema({
  accountId: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  githubInstallationId: {
    type: String,
    required: true,
  },
  targetType: {
    type: String,
    required: true,
  },
  targetId: {
    type: String,
    required: true,
  },
  lastGithubUpdated: {
    type: Date,
    default: Date.now,
  },
  githubAccountLogin: {
    type: String,
    required: true,
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

export default GithubIntegrationSchema;
