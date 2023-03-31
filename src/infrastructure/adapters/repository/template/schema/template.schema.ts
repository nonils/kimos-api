module.exports = {
  name: {
    type: String,
    required: true,
  },
  description: String,
  technologies: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}