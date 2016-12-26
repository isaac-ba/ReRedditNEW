var express = require('express');
var router = express.Router();

var Post = require('.././models/posts');

router.get('/', function(req, res, next) {
  res.send('this is from /!');
});

router.post('/posts', function(req, res, next) {
  var post = new Post(req.body);
  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.get('/posts',function(req,res){
  Post.find(function(error, posts){
    res.send(posts);
  });
}); 

module.exports = router;




