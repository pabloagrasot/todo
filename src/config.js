const config = {
	jwt: {
		secret: 'secret_key',
		signup: {
			time: '1d'
		}
	},

	db: {
		MongoAtlas_URI :'mongodb+srv://PabloAgrasot:mypass321@todo.6g28c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
		collection: 'users'
	}
}

export default config
