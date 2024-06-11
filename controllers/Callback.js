import AppError from "../errors/AppError.js";
import CallbackModel from "../models/Callback.js";

class Callback {
    async getAll(req, res, next) {
        try {
            const callback = await CallbackModel.getAll()
            res.status(200).json(callback)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error("Не указан ID обратной связи")
            }
            const callback = await CallbackModel.getOne(req.params.id)
            res.status(200).json(callback)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const callback = await CallbackModel.create(req.body)
            res.status(200).json(callback)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID обратной связи не указан')
            }
            const callback = await CallbackModel.update(req.params.id, req.body)
            res.status(200).json(callback)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID обратной связи не указан')
            }
            const callback = await CallbackModel.delete(req.params.id)
            res.status(200).json(callback)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Callback()