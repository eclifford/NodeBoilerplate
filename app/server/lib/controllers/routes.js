(function() {
  var instagram;
  instagram = require("../modules/instagram/instagram.js").createClient("b3481714257943a4974e4e7ba99eb357", "424e2760ecfb4a6e9be301257d401a80");
  module.exports = function(app) {
    app.get("/", function(req, res) {
      return res.render("index", {
        title: "My Page Bitch"
      });
    });
    return app.get("/instagram/popular", function(req, res) {
      return instagram.media.popular(function(media, error) {
        return res.json(media);
      });
    });
  };
}).call(this);
