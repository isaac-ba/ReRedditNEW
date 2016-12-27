var express = require('express');
var router = express.Router();

var Post = require('.././models/posts');
var Comment = require('.././models/comments');

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

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.get('/posts',function(req,res){
  Post.find(function(error, posts){
    res.send(posts);
  });
}); 

router.get('/posts/:post/comments', function(req,res){
  console.log(req.post._id);
  // Post.findOne({_id: req.post._id}).populate('comments').exec(function(error,post){
  //   console.log(post);
  // })
  console.log(req.post)
  req.post.populate('comments', function(err, post){
    res.send(post);
  });
  // req.post.populate('comments').exec(function(err, post){
  //   res.send(post);
  // });
})
// router.put
router.put('/posts/:post/upvote', function(req, res, next) {
  req.post.upvote();


  req.post.save(function(err, post) {
    res.json(post);
  });
});

router.put('/posts/:post/comments/:comment/upvote', function(req, res, next) {
  req.comment.upvote();

  req.comment.save(function(err, comment) {
    res.json(comment);
  });
});

module.exports = router;




