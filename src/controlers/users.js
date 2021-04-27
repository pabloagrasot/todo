import models from '../models'
import jwt from 'jsonwebtoken'
import config from '../config'

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
	try {
		const { username, email, password, roles } = req.body

		let $roles = []
		if (!roles) {
			const role = await models.role.findOne({ name: 'user' })
			$roles.push(role._id)
		} else {
			const roleList = await models.role.find({ name: { $in: roles }})
			$roles = roleList.map((role) => role._id)
		}

		const $password = await models.user.encode(password)

		const user = await models.user({ username, email, password:$password, roles:$roles }).save()

		res.status(201).json({ user })
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
}

export default {
	signIn,
	signUp
}
