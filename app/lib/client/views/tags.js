(function() {
  window.TagListView = Backbone.View.extend({
    el: "ul.tagcloud",
    initialize: function() {
      var t;
      _.bindAll(this, "render", "appendItem");
      this.collection = new window.TagList();
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
      return this.render();
    },
    render: function() {
      var t;
      t = this;
      return _(this.collection.models).each(function(item, index) {
        return t.appendItem(item);
      });
    },
    appendItem: function(item) {
      var view;
      view = new TagView({
        model: item
      });
      console.log('appendItem', item);
      console.log(view);
      return $(this.el).append(view.render().el);
    }
  });
  window.TagView = Backbone.View.extend({
    tagName: 'li',
    initialize: function() {
      return _.bindAll(this, "render");
    },
    render: function() {
      console.log('rendering');
      $(this.el).html(window.JST['tag'](this.model.toJSON()));
      return this;
    }
  });
}).call(this);
