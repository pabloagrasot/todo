import models from '../models'
import jwt from 'jsonwebtoken'
import config from '../config'
import mongoose from 'mongoose'

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await models.user.findOne({ email })
		if (!user) {
			throw new Error('user dont exits')
		}

		const match = models.user.compare(password, user.password)
		if (!match) {
			throw new Error('password incorrect')
		}

		const payload = {
			id: user._id,
			role: user.roles[0]
		}
		const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.signup.time })
		res.status(200).json({ user, token })
	} catch (err) {
		res.status(400).json({err: err.message})
	}
}

const signUp = async (req, res) => {

	const user = new models.user(
		{
		username: req.body.username,
		email: req.body.email,
		password : await models.user.encode(req.body.password),
		roles: 'user',
		id: mongoose.Types.ObjectId()
	})
	user.save()
	.then(result=>{
		res.status(201).json({ message: 'Nuevo usuario' })
	})

	.catch(err => {
		console.log(err)
		res.status(500).json({ error: err })
	})
} 

export default {
	signIn,
	signUp
}
