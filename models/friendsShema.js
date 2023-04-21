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
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp)
    }
  }
);


const Friend = model('Friend', friendSchema);

module.exports = friendSchema;
