# Instagram = require('instagram-node-lib');

# Instagram.set('client_id', 'b3481714257943a4974e4e7ba99eb357');
# Instagram.set('client_secret', '424e2760ecfb4a6e9be301257d401a80');

PostManager = require("../models/postManager")
TagManager = require("../models/tagManager")

module.exports = (app) ->
  # Route middleware
  # requiresLogin = (req, res, next) ->
  #   if req.user? && req.user.role == 'admin'
  #     next()
  #   else
  #     res.redirect('/')
  #     #res.redirect('/login?redir=' + req.url)

  # pagination = (req, res, next) ->
  #   limit = 5
  #   page = parseInt(req.params.page) || 1
  #   num = page * limit
  #   postManager = PostManager.create()
  #   postManager.getCount (req, count) ->
  #     res.local 'total', count
  #     res.local 'pages', Math.ceil(count / limit)
  #     res.local 'page', page
  #     next()

  # app.get "/", (req, res) ->
  #   res.render "index",
  #     title: "My Page Bitch"
  
  # app.get "/posts", pagination, (req, res) ->
  #   postManager = PostManager.create()
  #   postManager.get (err, posts) ->
  #     res.render 'posts',
  #       title: 'Posts page'
  #       posts: posts
    

  # app.get "/posts/pages/:page/:tags?/:tag?", pagination, (req, res) ->
  #   postManager = PostManager.create()
  #   postManager.getByPage req.param('page'), req.param('tag'), (err, posts) ->
  #     res.render 'posts',
  #       title: 'Posts page'
  #       posts: posts
  
  # app.get "/posts/new", requiresLogin, (req, res) ->
  #   postManager = PostManager.create()
  #   res.render 'posts/new',
  #     title: 'New Post'
  #     post: req.body && req.body.post || postManager.blank()

  # app.post '/posts/new', (req, res) ->
  #   postManager = PostManager.create()
  #   postManager.insert req.body.post, req.user, (err, post) ->
  #     res.redirect('/posts/'+post.id)

  # app.get '/posts/:id', (req, res) ->
  #   postManager = PostManager.create()
  #   postManager.getById req.param('id'), (err, post) ->
  #     res.render 'posts/show',
  #     title: 'Detail'
  #     post: post
  
  # app.get '/posts/:id/edit', requiresLogin, (req, res) ->
  #   postManager = PostManager.create()
  #   postManager.getById req.param('id'), (err, post) ->
  #     res.render 'posts/edit',
  #     post: post
  #     title: 'Edit'

  # app.put '/posts/:id', (req, res) ->
  #   postManager = PostManager.create()
  #   postManager.set(req.param('id'), req.body.post, (err, post) ->
  #     res.redirect('/posts/'+req.param('id'))    
  #   )

  # app.post '/posts/:id/delete', requiresLogin, (req, res) ->
  #   postManager = PostManager.create()
  #   postManager.delete req.param('id')
  #   res.redirect '/posts/'

  # app.post '/posts/:id/addComment', requiresLogin, (req, res) ->
  #   postManager = PostManager.create()
  #   user = req.user
  #   postManager.addComment req.param('id'), user, req.body.comment, (err, comment) ->
  #     res.send comment
        
  # app.get "/instagram/popular", (req, res) ->
  #   console.log req.user
  #   Instagram.users.self
  #     access_token: '2991386.b348171.7d1f8edf197d466c8b1539123a8fea2e'
  #     complete: (media)->
  #       res.json media
  #     error: (errorMessage, errorObject, caller) ->
  #       console.log errorMessage 
  
  # app.get '/tags', (req, res) ->
  #   tagManager = TagManager.create()
  #   tagManager.get (err, tags) ->
  #     res.json tags
  

      

  # app.get "/instagram/tags/:tag", (req, res) ->
  #   instagram.tags.media req.params.tag, (media, error) ->
  #     res.json media

  # app.get "/instagram/location/:name", (req, res) ->
  #   instagram.locations.media req.params.name, (media, error) ->
  #     res.json media

  # app.get "/callbacks/geo/:geoName", (request, response) ->
  #   helpers.debug "GET " + request.url
  #   params = url.parse(request.url, true).query
  #   response.send params["hub.challenge"] or "No hub.challenge present"