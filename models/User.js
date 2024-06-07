import { User as UserMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class User {
    async getAll() {
        const users = await UserMapping.findAll()
        return users
    }

    async getOne(id) {
        const user = await UserMapping.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден')
        }
        return user
    }

    async activate(link) {
        const user = await UserMapping.findOne({
            where: {
                activationLink: link
            }
        })

        if(!user) {
            throw new Error('Некорректная ссылка активации')
        }
        await user.update({isActivated: true})
        return user
    }

    async getByEmail(email) {
        const user = await UserMapping.findOne({where: {email}})
        if(!user) {
            throw new Error('Пользователь не найден')
        }
        return user
    }

    async isUserExistByField(field, value){
        const user = await UserMapping.findOne({where: {[field]: value}})
        return !!user;

    }

    async getByPhone(phone) {
        const user = await UserMapping.findOne({ where: { phone } })
        if(!user) {
            throw new Error('Пользователь не найден')
        }
        return user
    }

    async create(data) {
        const {email, password, phone, role} = data
        const user = await UserMapping.create({email, password, phone, role})
        return user
    }


    async update(id, data) {
        const user = await UserMapping.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не существует')
        }
        const {
            email = user.email,
            password = user.password,
            phone = user.phone,
            role = user.role,
            name = user.name,
            birthday = user.birthday,
            isDeleted = false
        } = data
        await user.update({email, password, role, phone, name, birthday, isDeleted})
        return user
    }

    async delete(id) {
        const user = await UserMapping.findByPk(id)
        if (!user) {
            throw new Error('Пользователь не найден')
        }
        await user.destroy()
        return user
    }
}

export default new User()