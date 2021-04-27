import { Schema, model } from 'mongoose'

const RoleSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: true
	},
},{
	versionKey: false,
	timestamps: true
})

export default model('role', RoleSchema)
