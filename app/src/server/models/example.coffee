mongoose = require('mongoose');
Schema = mongoose.Schema

CommentSchema = new Schema
	email: String
	body: String

PostSchema = new Schema
	title: String
	body: String
	date: {type: Date, default: Date.now()}
	state: {type: String, enum: ['draft', 'published', 'private'], default: 'draft'}
	author: {
		name: String,
		email: {type: String, validate: /^/} # or pass function
	}
	comments: [CommentSchema]

PostSchema.static 'recent', (callback) ->
	@find {date: {$gte: Date.now() - 1000 * 60 * 60 * 24}}, callback

PostSchema.virtual('shortBody').get ->
	@body.substring 0, 50

mongoose.connect('mongodb://localhost/mydatabase')
mongoose.model('Post', PostSchema)

Post = mongoose.model('Post')

post = new Post();
post.title = 'My first blog post'
post.body = 'Post body'
post.date = Date.now()
post.state = 'published'
post.author = {name: 'Pedro', email: 'pedro.teixei@gmail.com'}
post.comments.push({email: 'test@test.com', body: 'test comment'})

post.save (err) ->
	throw err if err
	console.log('saved')
	# Post.find {title: "My first blog post"}, (err, posts) ->
	# 	throw err if err
	# 	posts.forEach (post) ->
	# 		console.log(post)
	Post.recent (err, posts) ->
		console.log('posts', posts)
		throw err if err
		posts.forEach (post) ->
			console.log(post.shortBody)


	mongoose.disconnect()
