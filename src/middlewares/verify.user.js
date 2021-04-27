import models from '../models/'
import utils from '../utils/token'

const verifyUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body
		if (!username || !email || !password) {
			throw new Error('data empty')
		}

		const user = await models.user.findOne({ email })
		if (user) {
			throw new Error('user already exist')
		}

		next()
	} catch (err) {
		res.status(400).json({ err: err.message })
	}
}

const isAdmin = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token']
		await utils.token(token, 'admin')

		next()
	} catch (err) {
		res.status(401).json({ err: err.message })
	}
}

const isUser = async (req, res, next) => {
	try {
		const token = req.headers['x-access-token']
		const decode = await utils.token(token, 'user')
		const user = await utils.user(decode.id)
		if (!user) {
			throw new Error('forbidden')
		}

		next()
	} catch (err) {
		res.status(401).json({ err: err.message })
	}
}
export default {
	verifyUser,
	isAdmin,
	isUser
}
