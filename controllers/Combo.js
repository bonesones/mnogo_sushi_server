import AppError from "../errors/AppError.js";
import ComboModel from "../models/Combo.js"

class Combo {
    async getAll(req, res, next) {
        try {
            const products = await ComboModel.getAll()
            res.status(200).json(products)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const product = await ComboModel.getOne(req.params.id)
            if(!product) {
                throw new Error('Товар не найден в бд')
            }
            res.status(200).json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const product = await ComboModel.create(req.body, req.files?.image)
            res.status(200).json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID товара не указан')
            }
            const product = await ComboModel.update(req.params.id, req.body, req.files?.image)
            res.status(200).json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID товара не указан')
            }
            const product = await ComboModel.delete(req.params.id)
            res.status(200).json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Combo()