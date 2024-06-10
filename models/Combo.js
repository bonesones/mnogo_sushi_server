import { Product as ComboMapping, Product as ProductMapping } from './mapping.js'
import FileService from '../services/File.js'


class Combo {
    async getAll() {
        const comboes =  await ComboMapping.findAll({
            include: ProductMapping
        })
        return comboes
    }

    async getOne(id) {
        const combo = await ComboMapping.findByPk(id, {
            include: ProductMapping,
            as: "products"
        })
        if (!combo) {
            throw new Error('Комбо не найден в БД')
        }
        return combo
    }

    async create(data, img){
        const image = FileService.save(img)
        const { name, description, price, categoryId = null } = data
        const combo = await ComboMapping.create({name, description, price, categoryId, image })
        console.log(data.products)
        for(const productId of JSON.parse(data.products)) {
            const product = await ProductMapping.findByPk(productId)
            await combo.addProduct(product)
        }
        return combo
    }

    async update(id, data, img){
        const product = await ComboMapping.findByPk(id)
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
        const product = await ComboMapping.findByPk(id)
        if(!product) {
            throw new Error('Товар в БД не найден')
        }
        await product.destroy()
        return product
    }
}

export default new Combo()