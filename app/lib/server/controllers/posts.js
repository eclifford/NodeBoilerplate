(function() {
  var PostManager, TagManager;
  PostManager = require('../models/postManager');
  TagManager = require('../models/tagManager');
  module.exports = function(app) {
    var pagination, requiresLogin;
    requiresLogin = function(req, res, next) {
      if ((req.user != null) && req.user.role === 'admin') {
        return next();
      } else {
        return res.redirect('/');
      }
    };
    pagination = function(req, res, next) {
      var limit, num, page, postManager;
      limit = 5;
      page = parseInt(req.params.page) || 1;
      num = page * limit;
      postManager = PostManager.create();
      return postManager.getCount(function(req, count) {
        res.local('total', count);
        res.local('pages', Math.ceil(count / limit));
        res.local('page', page);
        return next();
      });
    };
    app.get("/posts", pagination, function(req, res) {
      var postManager;
      postManager = PostManager.create();
      return postManager.get(function(err, posts) {
        return res.render('posts', {
          title: 'Posts page',
          posts: posts
        });
      });
    });
    app.get("/posts/pages/:page/:tags?/:tag?", pagination, function(req, res) {
      var postManager;
      postManager = PostManager.create();
      return postManager.getByPage(req.param('page'), req.param('tag'), function(err, posts) {
        return res.render('posts', {
          title: 'Posts page',
          posts: posts
        });
      });
    });
    app.get("/posts/new", requiresLogin, function(req, res) {
      var postManager;
      postManager = PostManager.create();
      return res.render('posts/new', {
        title: 'New Post',
        post: req.body && req.body.post || postManager.blank()
      });
    });
    app.post('/posts/new', function(req, res) {
      var postManager;
      postManager = PostManager.create();
      return postManager.insert(req.body.post, req.user, function(err, post) {
        return res.redirect('/posts/' + post.id);
      });
    });
    app.get('/posts/:id', function(req, res) {
      var postManager;
      postManager = PostManager.create();
      return postManager.getById(req.param('id'), function(err, post) {
        return res.render('posts/show', {
          title: 'Detail',
          post: post
        });
      });
    });
    app.get('/posts/:id/edit', requiresLogin, function(req, res) {
      var postManager;
      postManager = PostManager.create();
      return postManager.getById(req.param('id'), function(err, post) {
        return res.render('posts/edit', {
          post: post,
          title: 'Edit'
        });
      });
    });
    app.put('/posts/:id', function(req, res) {
      var postManager;
      postManager = PostManager.create();
      return postManager.set(req.param('id'), req.body.post, function(err, post) {
        return res.redirect('/posts/' + req.param('id'));
      });
    });
    app.post('/posts/:id/delete', requiresLogin, function(req, res) {
      var postManager;
      postManager = PostManager.create();
      postManager["delete"](req.param('id'));
      return res.redirect('/posts/');
    });
    app.post('/posts/:id/addComment', requiresLogin, function(req, res) {
      var postManager, user;
      postManager = PostManager.create();
      user = req.user;
      return postManager.addComment(req.param('id'), user, req.body.comment, function(err, comment) {
        return res.send(comment);
      });
    });
    return app.get('/tags', function(req, res) {
      var tagManager;
      tagManager = TagManager.create();
      return tagManager.get(function(err, tags) {
        return res.json(tags);
      });
    });
  };
}).call(this);
