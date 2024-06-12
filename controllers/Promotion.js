import AppError from "../errors/AppError.js";
import PromotionModel from "../models/Promotion.js";

class Promotion {
    async getAll(req, res, next) {
        try {
            const promotions = await PromotionModel.getAll()
            res.status(200).json(promotions)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error("Не указан ID акции")
            }
            const promotion = await PromotionModel.getOne(req.params.id)
            res.status(200).json(promotion)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const promotion = await PromotionModel.create(req.body, req.files?.image)
            res.status(200).json(promotion)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID акции не указан')
            }
            const promotion = await PromotionModel.update(req.params.id, req.body)
            res.status(200).json(promotion)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID акции не указан')
            }
            const promotion = await PromotionModel.delete(req.params.id)
            res.status(200).json(promotion)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Promotion()