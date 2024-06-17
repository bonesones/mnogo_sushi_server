import { Promotion as PromotionMapping } from './mapping.js'
import FileService from "../services/File.js"
import product from "./Product.js";

class Promotion {
    async getAll() {
        const promotions = await PromotionMapping.findAll({
            order: [['id', 'DESC']]
        })
        return promotions
    }

    async getOne(id) {
        const promotion = await PromotionMapping.findByPk(id)
        if (!promotion) {
            throw new Error('Акция не найдена')
        }
        return promotion
    }

    async create(data, img) {
        const image = FileService.save(img)
        const promotionIsExists = PromotionMapping.findOne({
            where: {
                title: data.title,
            }
        })
        if(promotionIsExists) {
            throw new Error("Акция с таким названием уже существует")
        }
        const { title, description } = data
        const promotion = await PromotionMapping.create({ title, description, image })
        return promotion
    }

    async update(id, data, img) {
        const promotion = await PromotionMapping.findByPk(id)
        if (!promotion) {
            throw new Error('Акция не найдена')
        }
        const promotionIsExists = PromotionMapping.findOne({
            where: {
                title: data.title,
            }
        })
        if(promotionIsExists && data.title != promotion.title) {
            throw new Error("Акция с таким названием уже существует")
        }
        const file = FileService.save(img)
        if (file && product.image) {
            FileService.delete(product.image)
        }
        const {
            title = promotion.title,
            description = promotion.description,
            image = file ? file : promotion.image,
        } = data
        await promotion.update({ title, description, image })
        return promotion
    }

    async delete(id) {
        const promotion = await PromotionMapping.findByPk(id)
        if (!promotion) {
            throw new Error('Акция не найдена')
        }
        await promotion.destroy()
        return promotion
    }
}

export default new Promotion()