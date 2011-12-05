(function() {
  window.AppView = Backbone.View.extend({
    el: "html",
    events: {
      "hover .cube": "flip",
      "click button#btnSearch": "search",
      "click button#btnFlip": "flip",
      "click button#btnFlipOn": "flipOn",
      "click button#btnFlipOff": "flipOff"
    },
    initialize: function() {
      var t;
      _.bindAll(this, "render", "appendItem");
      this.collection = new window.ImageList();
      t = this;
      this.collection.fetch({
        success: function() {
          return t.render();
        },
        failure: function() {
          return alert("fail");
        }
      });
      this.collection.bind("add", this.appendItem);
      setInterval((function() {
        return t.flip();
      }), 1000);
      return this.render();
    },
    flipOn: function() {
      var elements;
      elements = $(".cube");
      return $(elements).addClass("flip");
    },
    flipOff: function() {
      var elements;
      elements = $(".cube");
      return $(elements).removeClass("flip");
    },
    flip: function() {
      var elements, random;
      elements = $(".cube");
      random = Math.floor(Math.random() * elements.length);
      return $(elements[random]).toggleClass("flip");
    },
    search: function() {
      var searchTerm, t;
      $("#instagramapp").html("");
      t = this;
      searchTerm = $("#txtSearch").val();
      this.collection.url = "/instagram/tags/" + searchTerm;
      return this.collection.fetch({
        success: function() {
          return t.render();
        },
        failure: function() {
          return alert("fail");
        }
      });
    },
    renderList: function(items) {
      var t;
      t = this;
      $("#instagramapp").html("");
      items.each(function(item) {
        return t.appendItem(item);
      });
      return this;
    },
    render: function() {
      var t;
      t = this;
      return _(this.collection.models).each(function(item, index) {
        var column, row;
        row = Math.floor(index / 10);
        column = index - (row * 10);
        item.set({
          index: index,
          xpos: column * 150,
          ypos: row * 150
        });
        return t.appendItem(item);
      });
    },
    appendItem: function(item) {
      var view;
      view = new ImageView({
        model: item
      });
      return $("#instagramapp").append(view.render().el);
    }
  });
}).call(this);
