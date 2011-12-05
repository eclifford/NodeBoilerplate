(function() {
  var Promise, UserManager, UserSchema, everyauth, mongoose;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  mongoose = require('mongoose');
  everyauth = require('everyauth');
  Promise = everyauth.Promise;
  UserSchema = require('./user').UserSchema;
  UserManager = (function() {
    function UserManager() {
      mongoose.connect('mongodb://localhost/mydatabase');
      this.User = mongoose.model('User', UserSchema);
    }
    UserManager.prototype.newUser = function(name, email) {
      var user;
      user = new this.User();
      user.name = name;
      user.email = email;
      user.dateCreated = Date.now();
      user.dateUpdated = Date.now();
      return user.save(function(err) {
        if (err) {
          throw err;
        }
        console.log('saved');
        return mongoose.disconnect();
      });
    };
    UserManager.prototype.newUser = function(name, email, password, facebookId, facebookToken, role, callback) {
      var user;
      user = new this.User();
      user.name = name;
      user.email = email != null ? email : '';
      user.password = password != null ? password : '';
      user.facebookId = facebookId != null ? facebookId : '';
      user.facebookToken = facebookToken != null ? facebookToken : '';
      user.role = role != null ? role : 'user';
      return user.save(function(err) {
        if (err) {
          throw err;
        }
        mongoose.disconnect();
        return callback(null, user);
      });
    };
    UserManager.prototype.findOrCreateUserByFacebookData = function(facebookData, callback) {
      var query;
      query = this.User.findOne({
        facebookId: facebookData.id
      });
      return query.exec(__bind(function(err, user) {
        if (err) {
          throw err;
        }
        if (user != null) {
          return callback(null, user);
        } else {
          return this.newUser(facebookData.name, '', '', facebookData.id, '', 'user', function(err, user) {
            return callback(null, user);
          });
        }
      }, this));
    };
    UserManager.prototype.getById = function(id, callback) {
      var query;
      return query = this.User.findById(id, function(err, user) {
        return callback(null, user);
      });
    };
    return UserManager;
  })();
  module.exports.create = function() {
    return new UserManager();
  };
}).call(this);
