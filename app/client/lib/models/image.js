(function() {
  window.Image = Backbone.Model.extend({});
  window.ImageList = Backbone.Collection.extend({
    model: Image,
    url: "/instagram/popular/",
    search: function(letters) {
      var pattern;
      if (letters === "") {
        return this;
      }
      pattern = new RegExp(letters, "gi");
      return _(this.filter(function(data) {
        return pattern.test(data.get("user").username);
      }));
    }
  });
}).call(this);
