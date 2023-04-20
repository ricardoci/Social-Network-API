const { Schema, model } = require('mongoose');

const friendSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    friendUsername: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp)
    }
  }
);

function formatDate(timestamp) {
  return new Date(timestamp).toISOString();
}

const Friend = model('Friend', friendSchema);

module.exports = friendSchema;
