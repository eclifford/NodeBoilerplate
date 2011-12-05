(function() {
  var CommentSchema, Post, PostSchema, Schema, mongoose, post;
  mongoose = require('mongoose');
  Schema = mongoose.Schema;
  CommentSchema = new Schema({
    email: String,
    body: String
  });
  PostSchema = new Schema({
    title: String,
    body: String,
    date: {
      type: Date,
      "default": Date.now()
    },
    state: {
      type: String,
      "enum": ['draft', 'published', 'private'],
      "default": 'draft'
    },
    author: {
      name: String,
      email: {
        type: String,
        validate: /^/
      }
    },
    comments: [CommentSchema]
  });
  PostSchema.static('recent', function(callback) {
    return this.find({
      date: {
        $gte: Date.now() - 1000 * 60 * 60 * 24
      }
    }, callback);
  });
  PostSchema.virtual('shortBody').get(function() {
    return this.body.substring(0, 50);
  });
  mongoose.connect('mongodb://localhost/mydatabase');
  mongoose.model('Post', PostSchema);
  Post = mongoose.model('Post');
  post = new Post();
  post.title = 'My first blog post';
  post.body = 'Post body';
  post.date = Date.now();
  post.state = 'published';
  post.author = {
    name: 'Pedro',
    email: 'pedro.teixei@gmail.com'
  };
  post.comments.push({
    email: 'test@test.com',
    body: 'test comment'
  });
  post.save(function(err) {
    if (err) {
      throw err;
    }
    console.log('saved');
    Post.recent(function(err, posts) {
      console.log('posts', posts);
      if (err) {
        throw err;
      }
      return posts.forEach(function(post) {
        return console.log(post.shortBody);
      });
    });
    return mongoose.disconnect();
  });
}).call(this);
