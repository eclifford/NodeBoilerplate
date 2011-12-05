mongoose = require('mongoose');
Schema = mongoose.Schema

TagSchema = new Schema
	name: String

module.exports.TagSchema = TagSchema
