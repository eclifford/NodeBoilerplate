(function() {
  var CommentSchema, PostManager, PostSchema, TagSchema, UserSchema, mongoose, _;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  mongoose = require('mongoose');
  PostSchema = require('./post').PostSchema;
  UserSchema = require('./user').UserSchema;
  CommentSchema = require('./comment').CommentSchema;
  TagSchema = require('./tag').TagSchema;
  _ = require('underscore');
  PostManager = (function() {
    function PostManager() {
      mongoose.connect('mongodb://localhost/mydatabase');
      this.Post = mongoose.model('Post', PostSchema);
      this.User = mongoose.model('User', UserSchema);
      this.Comment = mongoose.model('Comment', CommentSchema);
      this.Tags = mongoose.model('Tag', TagSchema);
    }
    PostManager.prototype.insert = function(postData, user, callback) {
      var post;
      post = new this.Post();
      post.title = postData.title;
      post.body = postData.body;
      post.dateUpdated = Date.now();
      post.user = user.id;
      return post.save(function(err) {
        if (err) {
          throw err;
        }
        return callback(err, post);
      });
    };
    PostManager.prototype.newPost = function(title, body, state, tags, author) {
      var post;
      post = new this.Post();
      post.title = title;
      post.body = body;
      post.state = state;
      post.tags = tags;
      post.author = author;
      pose.user = req.user.id;
      return post.save(function(err) {
        if (err) {
          throw err;
        }
        return mongoose.disconnect();
      });
    };
    PostManager.prototype.get = function(callback) {
      return this.Post.find({}).populate('user').populate('tags').sort('dateCreated', -1).limit(10).run(function(err, posts) {
        if (err) {
          throw err;
        }
        console.log('myPosts', posts);
        return callback(null, posts);
      });
    };
    PostManager.prototype.getCount = function(callback) {
      return this.Post.count({}, function(err, count) {
        return callback(null, count);
      });
    };
    PostManager.prototype.getByPage = function(num, tag, callback) {
      var startPost;
      startPost = num * 5 - 5;
      return this.Post.find({
        '': ''
      }).populate('user').populate('tags').where('tags.name', 'Javascript').sort('dateCreated', -1).skip(startPost).limit(5).run(function(err, posts) {
        if (err) {
          throw err;
        }
        return callback(null, posts);
      });
    };
    PostManager.prototype.getById = function(id, callback) {
      var query;
      return query = this.Post.findById(id, function(err, post) {
        callback(null, post);
        return console.log(post);
      }).populate('user').populate('comments.user').populate('tags');
    };
    PostManager.prototype.set = function(id, postData, callback) {
      return this.Post.findById(id, function(err, post) {
        var tags;
        post.title = postData.title;
        post.body = postData.body;
        tags = postData.tags.split(',');
        this.Tag = mongoose.model('Tag', TagSchema);
        return this.Tag.find({}, __bind(function(err, existingTags) {
          var i;
          i = 0;
          while (i < post.tags.length) {
            post.tags[i].remove();
          }
          _.each(tags, __bind(function(tag) {
            var existingTag, newTag;
            existingTag = _.find(existingTags, function(t) {
              return t.name === tag;
            });
            if (existingTag != null) {
              return post.tags.push(existingTag);
            } else {
              newTag = new this.Tag();
              newTag.name = tag;
              post.tags.push(newTag.id);
              return newTag.save(function(err) {});
            }
          }, this));
          return post.save(function(err) {
            console.log('tags saved', post.tags);
            if (err) {
              throw err;
            }
            mongoose.disconnect();
            return callback(null, post);
          });
        }, this));
      });
    };
    PostManager.prototype["delete"] = function(id) {
      return this.Post.findById(id, function(err, post) {
        return post.remove(function(err) {
          if (err) {
            throw err;
          }
          return mongoose.disconnect();
        });
      });
    };
    PostManager.prototype.addComment = function(id, user, commentData, callback) {
      return this.Post.findById(id, function(err, post) {
        var comment;
        comment = {
          user: user,
          body: commentData.body,
          dateCreated: Date.now(),
          dateUpdated: Date.now()
        };
        post.comments.push(comment);
        return post.save(function(err) {
          if (err) {
            throw err;
          }
          mongoose.disconnect();
          return callback(null, comment);
        });
      });
    };
    PostManager.prototype.blank = function() {
      var post;
      post = new this.Post();
      return post;
    };
    return PostManager;
  })();
  module.exports.create = function() {
    return new PostManager();
  };
}).call(this);
