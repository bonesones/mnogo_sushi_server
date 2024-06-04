import AppError from "../errors/AppError.js";
import CategoryModel from "../models/Category.js";

class Category {
    async getAll(req, res, next) {
        try {
            const categories = await CategoryModel.getAll()
            res.status(200).json(categories)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error("Не указан ID категории")
            }
            const category = await CategoryModel.getOne(req.params.id)
            res.status(200).json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const category = await CategoryModel.create(req.body)
            res.status(200).json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID категории не указан')
            }
            const category = await CategoryModel.update(req.params.id, req.body)
            res.status(200).json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID категории не указан')
            }
            const category = await CategoryModel.delete(req.params.id)
            res.status(200).json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Category()