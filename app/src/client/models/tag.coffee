window.Tag = Backbone.Model.extend({})

window.TagList = Backbone.Collection.extend(
  model: Tag
  url: "/tags"
)