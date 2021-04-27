import mongoose from 'mongoose'
import config from './config'

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}

mongoose.connect( config.db.MongoAtlas_URI || 'mongodb://localhost/todo', options)
	.then(db => console.log('DB is conectd'))
	.catch(err =>console.log(err))
	