import {Product as ProductMapping} from "../models/mapping.js";
import AppError from "../errors/AppError.js";
import UserModel from "../models/User.js"
import UserDto from "../dtos/user-dto.js"
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs"
import config from 'dotenv/config'
import * as uuid from "uuid";
import mailService from "../services/mail-service.js";
import user from "../models/User.js";

const createJWT = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: "24h"});
}


class User {
    async signup(req, res, next) {
        const { email, phone, password, submit_password, role='USER', name = '' } = req.body
        try {
            if (!email) {
                throw new Error('Пустой email')
            }
            if(!phone) {
                throw new Error('Пустой телефон')
            }
            if(password !== submit_password) {
                throw new Error('Парли не совпадают')
            }
            if (role !== 'USER') {
                throw new Error('Возможна только роль USER')
            }
            const hashedPassword = await bcryptjs.hash(password, 10)
            const activationLink = uuid.v4()
            const user = await UserModel.create({name, phone, email, password: hashedPassword, role, activationLink})
            await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)

            const userDto = new UserDto(user)
            const token = createJWT({...userDto})
            res.status(202).cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + (1000 * 60 * 60 * 24)) }).send('Куки установлены')
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;

        if(!email) {
            throw new Error('Не указана почта')
        }
        if(!password) {
            throw new Error('Не указан пароль')
        }
        try {
            const user = await UserModel.getByEmail(email)

            if(!user) {
                throw new Error('Неверный логин')
            }
            const compare = bcryptjs.compareSync(password, user.password)
            if(!compare) {
                throw new Error('Неверный пароль')
            }
            const token = createJWT(user.id, user.email, user.role)
            res.status(202).cookie('token', token, { httpOnly: true, expires: new Date(Date.now() + (1000 * 60 * 60 * 24)) }).send('Куки установлены')
        } catch(e) {
            next(AppError.badRequest(e.message))
        }

    }

    async logout(req, res, next) {
        try {
            if(!req.cookies?.token) {
                throw new Error('Требуется авторизация')
            }
            res.status(202).cookie('token', "deleted", { httpOnly: true, expires: new Date(Date.now())}).send('Куки установлены')
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await UserModel.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch(e) {
            console.log(e)
        }
    }

    async check(req, res, next) {
        try {
            if(!req.cookies?.token) {
                throw new Error('Требуется авторизация')
            }
            const verified = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
            const user = await UserModel.getByEmail(verified.email)
            if(!user) {
                throw new Error('Пользователь не существует')
            }
            res.status(200).json({message: "token is valid"})
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const users = await UserModel.getAll()
            res.status(200).json({users})
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getUser(req, res, next) {
        try {
            if(!req.cookies.token) {
                throw new Error('Требуется авторизация')
            }
            const token = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
            const { name, email, phone, birthday } = await UserModel.getByEmail(token.email)
            res.status(200).json({user: { name, email, phone, birthday}})
        } catch (e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            const user = await UserModel.getOne(req.params.id)
            res.json({user})
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        const { email, phone, password, submit_password, role='USER', name = '' } = req.body
        try {
            if (!email) {
                throw new Error('Пустой email')
            }
            if(!phone) {
                throw new Error('Пустой телефон')
            }
            if(password !== submit_password) {
                throw new Error('Парли не совпадают')
            }
            if (!['USER', 'ADMIN'].includes(role)) {
                throw new Error('Неправильно назначена роль!')
            }
            const hashedPassword = await bcryptjs.hash(password, 10)
            const user = await UserModel.create({name, phone, email, password: hashedPassword, role})
            return res.status(200).json({user})
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async updateUser(req, res, next) {
        try {
            if(!req.cookies.token) {
                throw new Error('Требуется авторизация')
            }

            const userToken = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
            const { email = null, password = null, phone = null, birthday = null, name = null, password_submit = null } = req.body;
            let hashedPassword;

            if(password) {
                if(password !== password_submit) {
                    throw new Error('Пароли не совпадают')
                }
                hashedPassword = await bcryptjs.hash(password, 10)
                await UserModel.update(userToken.id, { name, phone, email, birthday, password: hashedPassword })
            } else {
                await UserModel.update(userToken.id, { name, phone, birthday, email })
            }
            res.status(200).json({
                message: "Данные сохранены"
            })
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id пользователя')
            }
            if(Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const { email, password, submit_password, role } = req.body
            if(role && !['USER', 'ADMIN'].includes(role)) {
                throw new Error('Неверное значение роли')
            }
            let hashedPassword
            if(password) {
                if(password !== submit_password) {
                    throw new Error('Пароли не совпадают')
                }
                hashedPassword = await bcryptjs.hash(password, 10)
            }
            const user = await UserModel.update(req.params.id, {email, hashedPassword, role})
            res.status(200).json({user})
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