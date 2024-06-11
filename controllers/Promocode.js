import AppError from "../errors/AppError.js";
import PromocodeModel from "../models/Promocode.js";

class Promocode {
    async getAll(req, res, next) {
        try {
            const promocodes = await PromocodeModel.getAll()
            res.status(200).json(promocodes)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if(!req.params.name) {
                throw new Error("Не указано название промокода")
            }
            const promocode = await PromocodeModel.getOne(req.params.name)
            res.status(200).json(promocode)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const promocode = await PromocodeModel.create(req.body)
            res.status(200).json(promocode)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID промокода не указан')
            }
            const promocode = await PromocodeModel.update(req.params.id, req.body)
            res.status(200).json(promocode)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID промокода не указан')
            }
            const category = await PromocodeModel.delete(req.params.id)
            res.status(200).json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Promocode()