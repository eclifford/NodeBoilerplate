window.TagListView = Backbone.View.extend(
  el: "ul.tagcloud" 

  initialize: ->

    _.bindAll this, "render", "appendItem"
    @collection = new window.TagList()
    t = this
    @collection.fetch
      success: ->
        t.render()

      failure: ->
        alert "fail"

    @collection.bind "add", @appendItem
    @render()

  render: ->
    t = this
    _(@collection.models).each (item, index) ->
      t.appendItem item

  appendItem: (item) ->
    view = new TagView(model: item)
    console.log 'appendItem', item
    console.log view
    $(@el).append view.render().el  
)

window.TagView = Backbone.View.extend(
  tagName: 'li'

  initialize: ->
    _.bindAll this, "render" 

  render: ->
    console.log 'rendering'
    $(@el).html window.JST['tag'](@model.toJSON())
    this
)