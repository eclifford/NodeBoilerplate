(function() {
  window.ImageView = Backbone.View.extend({
    className: "cube",
    template: $("#image-template"),
    events: {
      mouseover: "flipOn",
      mouseout: "flipOff",
      click: "imageClick"
    },
    flipOn: function() {},
    flipOff: function() {},
    imageClick: function() {
      return $("#detailpanel").addClass("active");
    },
    initialize: function() {
      return _.bindAll(this, "render", "imageClick");
    },
    render: function() {
      $(this.el).html(window.JST['image'](this.model.toJSON()));
      return this;
    }
  });
}).call(this);
