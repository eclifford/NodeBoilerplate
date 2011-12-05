mongoose  			= require 'mongoose'
PostSchema 			= require('./post').PostSchema
UserSchema 			= require('./user').UserSchema
CommentSchema 	= require('./comment').CommentSchema
TagSchema 			= require('./tag').TagSchema
_ 							= require('underscore')

class PostManager 
	constructor: ->
		mongoose.connect 'mongodb://localhost/mydatabase'
		@Post = mongoose.model 'Post', PostSchema
		@User = mongoose.model 'User', UserSchema
		@Comment = mongoose.model 'Comment', CommentSchema
		@Tags = mongoose.model 'Tag', TagSchema

	insert: (postData, user, callback) ->
		post = new @Post()
		post.title = postData.title
		post.body = postData.body
		post.dateUpdated = Date.now()
		post.user = user.id
		post.save (err) ->
			throw err if err
			#mongoose.disconnect()
			callback err, post

	newPost: (title, body, state, tags, author) ->
		post = new @Post()
		post.title = title
		post.body = body
		post.state = state
		post.tags = tags
		post.author = author
		pose.user = req.user.id
		post.save (err) ->
			throw err if err
			mongoose.disconnect()

	get: (callback) ->
		@Post
		.find({})
		.populate('user').populate('tags')
		.sort('dateCreated', -1)
		.limit(10)
		.run (err, posts) ->
			throw err if err
			console.log 'myPosts', posts
			callback null, posts
	
	getCount: (callback) ->
		@Post.count({}, (err, count) ->
			callback null, count
		)
	
	getByPage: (num, tag, callback) ->
		startPost = num * 5 - 5
		@Post
		.find({''})
		.populate('user').populate('tags')
		.where('tags.name', 'Javascript')
		.sort('dateCreated', -1)
		.skip(startPost)
		.limit(5)
		.run (err, posts) ->
			throw err if err
			callback null, posts
		
	getById: (id, callback) ->
		query = @Post.findById(id, (err, post) ->
			callback null, post
			console.log post
		).populate('user').populate('comments.user').populate('tags')
	
	set: (id, postData, callback) ->
		@Post.findById(id, (err, post) ->
			post.title = postData.title
			post.body = postData.body

			tags = postData.tags.split(',')
			@Tag = mongoose.model 'Tag', TagSchema
			@Tag.find({}, (err, existingTags) =>
				#Clear the existing collection
				i = 0				
				while i < post.tags.length
					post.tags[i].remove()

				_.each tags, (tag) =>		
					existingTag = _.find(existingTags, (t) ->
						return t.name == tag
					)			
					if existingTag?
						post.tags.push existingTag
					else
						newTag = new @Tag()
						newTag.name = tag
						post.tags.push newTag.id
						newTag.save (err) ->
				post.save (err) ->
					console.log 'tags saved', post.tags
					throw err if err
					mongoose.disconnect()
					callback null, post
			)
		)
	
	delete: (id) ->
		@Post.findById id, (err, post) ->
			post.remove (err) ->
				throw err if err
				mongoose.disconnect()
	
	addComment: (id, user, commentData, callback) ->
		@Post.findById id, (err, post) ->
			#comment = new @Comment()
			#comment.body = commentData.body
			#comment.user = user
			comment = 
				user: user
				body: commentData.body
				dateCreated: Date.now()
				dateUpdated: Date.now()

			post.comments.push comment
			post.save (err) ->
				throw err if err
				mongoose.disconnect()
				callback null, comment
	
	blank: () ->
		post = new @Post()
		post


module.exports.create = ->
	return new PostManager()

