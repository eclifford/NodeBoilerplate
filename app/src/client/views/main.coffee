window.AppView = Backbone.View.extend(
  el: "html"
  events:
    "hover .cube": "flip"
    "click button#btnSearch": "search"
    "click button#btnFlip": "flip"
    "click button#btnFlipOn": "flipOn"
    "click button#btnFlipOff": "flipOff"

  initialize: ->
    _.bindAll this, "render", "appendItem"
    @collection = new window.ImageList()
    t = this
    @collection.fetch
      success: ->
        t.render()

      failure: ->
        alert "fail"

    @collection.bind "add", @appendItem
    setInterval (->
      t.flip()
    ), 1000
    @render()

  flipOn: ->
    elements = $(".cube")
    $(elements).addClass "flip"

  flipOff: ->
    elements = $(".cube")
    $(elements).removeClass "flip"

  flip: ->
    elements = $(".cube")
    random = Math.floor(Math.random() * elements.length)
    $(elements[random]).toggleClass "flip"

  search: ->
    $("#instagramapp").html ""
    t = this
    searchTerm = $("#txtSearch").val()
    @collection.url = "/instagram/tags/" + searchTerm
    @collection.fetch
      success: ->
        t.render()

      failure: ->
        alert "fail"

  renderList: (items) ->
    t = this
    $("#instagramapp").html ""
    items.each (item) ->
      t.appendItem item

    this

  render: ->
    t = this
    _(@collection.models).each (item, index) ->
      row = Math.floor(index / 10)
      column = index - (row * 10)
      item.set
        index: index
        xpos: column * 150
        ypos: row * 150

      t.appendItem item

  appendItem: (item) ->
    view = new ImageView(model: item)
    $("#instagramapp").append view.render().el
)