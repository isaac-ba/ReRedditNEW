var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  link: String,
  upvotes: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }]
});
// PostSchema.methods.upVote = function(){
//   this.upvotes++;
// }
var Post = mongoose.model('Post', PostSchema);

module.exports = Post;