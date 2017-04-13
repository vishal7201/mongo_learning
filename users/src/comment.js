const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    refs: 'user'
  }
});

const Comment = mongoose.model('', commentSchema);

module.exports = Comment;
