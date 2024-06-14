import BasketModel from "../models/Basket.js"
import AppError from "../errors/AppError.js";

const maxAge = 60 * 60 * 1000 * 24 * 365
const signed = true

class Basket {
    async create(req, res, next) {
        try {
            const basket = await BasketModel.create(req.auth.id)
            res.status(200).json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
    async getOne(req, res, next) {
        try {
            const basket = await BasketModel.getOne(req.auth?.id)
            res.status(200).json(basket)
        } catch (e) {
            console.log(e)
            next(AppError.badRequest(e.message))
        }
    }

    async append(req, res, next) {
        try {
            const { productId } = req.params
            const basket = await BasketModel.append(req.auth.id, productId)
            res.status(200).json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async increment(req, res, next) {
        try {
            const {productId} = req.params
            const basket = await BasketModel.increment(req.auth.id, productId)
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async decrement(req, res, next) {
        try {
            const {productId} = req.params
            const basket = await BasketModel.decrement(req.auth.id, productId)
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async clear(req, res, next) {
        try {
            const basket = await BasketModel.clear(req.auth.id)
            res.json(basket)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Basket()