import jwt from 'jsonwebtoken'
import config from '../config'
import models from '../models/'



const user = (id) => {
	return models.user.findById({ _id: id })
	
}

const token = async (token, name) => {
	try {
		if (!token) {
			throw new Error('token empty')
		}
		const decode = jwt.verify(token, config.jwt.secret)
		const role = await models.role.findById(decode.role)
		if (!role || role.name !== name) {
			throw new Error('forbidden')
		}
        
		return decode
	} catch (err) {
		throw err
	}
}

const role = (roles, name) => {
	return roles.includes(name)
}

export default {
	token,
	user,
	role
}