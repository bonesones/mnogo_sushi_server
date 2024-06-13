import AppError from "../errors/AppError.js";
import ProductModel from "../models/Product.js"

class Product {
    async getAll(req, res, next) {
        try {
            const products = await ProductModel.getAll(req.params?.categoryId)
            res.status(200).json(products)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const product = await ProductModel.getOne(req.params.id)
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
            console.log(req.files)
            const product = await ProductModel.create(req.body, req.files?.image)
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
            const product = await ProductModel.update(req.params.id, req.body, req.files?.image)
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
            const product = await ProductModel.delete(req.params.id)
            res.status(200).json(product)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Product()