import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},

	roles: [
		{
			type: String,
			required: true
		}
	],
	id: Schema.Types.ObjectId
},{
	versionKey: false,
	timestamps: true
})

userSchema.statics.encode = async (password) => {
	const salt = await bcrypt.genSalt(10)
	return bcrypt.hash(password, salt)
}

userSchema.statics.compare = (password, encodePass) => {
	return bcrypt.compare(password, encodePass)
}

export default model('user', userSchema)
