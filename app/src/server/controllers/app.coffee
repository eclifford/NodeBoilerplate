Instagram = require('instagram-node-lib');

Instagram.set('client_id', 'b3481714257943a4974e4e7ba99eb357');
Instagram.set('client_secret', '424e2760ecfb4a6e9be301257d401a80');

module.exports = (app) ->
  app.get "/", (req, res) ->
    res.render "index",
      title: "My Page Bitch"
        
  app.get "/instagram/popular", (req, res) ->
    console.log req.user
    Instagram.users.self
      access_token: '2991386.b348171.7d1f8edf197d466c8b1539123a8fea2e'
      complete: (media)->
        res.json media
      error: (errorMessage, errorObject, caller) ->
        console.log errorMessage 
  
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