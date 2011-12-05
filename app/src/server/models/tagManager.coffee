mongoose = require('mongoose');
TagSchema = require('./tag').TagSchema

class TagManager 
	constructor: ->
		mongoose.connect 'mongodb://localhost/mydatabase'
		@Tag = mongoose.model 'Tag', TagSchema
	
	get: (callback) ->
		@Tag
		.find({})
		.run (err, tags) ->
			throw err if err
			callback null, tags

module.exports.create = ->
	return new TagManager()

