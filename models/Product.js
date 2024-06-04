import { Product as ProductMapping } from './mapping.js'
import AppError from "../errors/AppError.js";
import FileService from '../services/File.js'


class Product {
    async getAll(params) {
        const { categoryId } = params
        const where = {}
        if(categoryId) where.categoryId = categoryId
        const products =  await ProductMapping.findAll({where})
        return products
    }

    async getOne(id) {
        const product = await ProductMapping.findOne(id)
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        return product
    }

    async create(data, img){
        const image = FileService.save(img)
        const { name, description, price, categoryId = null } = data
        const product = await ProductMapping.create({name, description, price, categoryId, image})
        if(data.combo) {
            const combo = [];
        }
        return product
    }

    async update(id, data, img){
        const product = await ProductMapping.findByPk(id)
        if(!product) {
            throw new Error('Товар не найден в БД')
        }

        const file = FileService.save(img)
        if (file && product.image) {
            FileService.delete(product.image)
        }

        const {
            name = product.name,
            description = product.description,
            price = product.price,
            image = file ? file : product.image,
            categoryId = product.categoryId,
        } = data
        await product.update({name, description, price, image, categoryId})
        return product
    }

    async delete(id) {
        const product = await ProductMapping.findByPk(id)
        if(!product) {
            throw new Error('Товар в БД не найден')
        }
        await product.destroy()
        return product
    }
}

export default new Product()