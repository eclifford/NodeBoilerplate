window.Image = Backbone.Model.extend({})

window.ImageList = Backbone.Collection.extend(
  model: Image
  url: "/instagram/popular/"
  search: (letters) ->
    return this  if letters is ""
    pattern = new RegExp(letters, "gi")
    _ @filter((data) ->
      pattern.test data.get("user").username
    )
)