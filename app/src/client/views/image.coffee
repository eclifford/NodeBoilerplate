window.ImageView = Backbone.View.extend(
  className: "cube"
  template: $("#image-template")
  events:
    mouseover: "flipOn"
    mouseout: "flipOff"
    click: "imageClick"

  flipOn: ->

  flipOff: ->

  imageClick: ->
    $("#detailpanel").addClass "active"

  initialize: ->
    _.bindAll this, "render", "imageClick"

  render: ->
    $(@el).html window.JST['image'](@model.toJSON())
    this
)