import {Product as ProductMapping} from "../models/mapping.js";
import AppError from "../errors/AppError.js";
import UserModel from "../models/User.js"
import jwt from "jsonwebtoken";

const createJWT = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.JWT_SECRET, {expiresIn: "24h"});
}


class User {
    async signup(req, res, next) {
        const { email, phone, password, submit_password, role='USER', name = '' } = req.body

        if(email && phone && password && submit_password) {
            try {
                if(role !== 'USER') {
                    throw new Error('Возможна только роль USER')
                }
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = await UserModel.create({name, phone, email, password: hashedPassword, role})
                const token = createJWT(user.id, user.email, user.role)
                return res.status(200).json({token})
            } catch(e) {
                next(AppError.badRequest(e.message))
            }
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        if(email && password) {
            try {
                const user = UserModel.getByEmail(email)
                if(!user) {
                    throw new Error('Неверный логин')
                }
                const compare = bcrypt.compareSync(password, user.password)
                if(!compare) {
                    throw new Error('Неверный пароль')
                }
                const token = createJWT(user.id, user.email, user.role)
                return res.status(200).json({token})
            } catch(e) {

            }
        }
    }

    async check(req, res) {
        res.status(200).send('Проверка авторизации')
    }

    async getAll(req, res, next) {
        try {
            const users = await UserModel.getAll()
            res.json(users)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.getOne(req.params.id)
            res.json(user)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const user = await UserModel.create(req.body)
            res.json(brand)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.update(req.params.id, req.body)
            res.json(user)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.delete(req.params.id)
            res.json(user)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new User()