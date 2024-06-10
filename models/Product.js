import { Product as ProductMapping } from './mapping.js'
import AppError from "../errors/AppError.js";
import FileService from '../services/File.js'


class Product {
    async getAll(id) {
        const products =  await ProductMapping.findAll({
            where: {
                categoryId: id
            },
            include: [
                {
                    model: ProductMapping,
                    as: "Sibling",
                }
            ]
        })
        return products
    }

    async getOne(id) {
        const product = await ProductMapping.findOne(id, {
            include: Product,
            as: "Sibling"
        })
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        return product
    }

    async create(data, img){
        const image = FileService.save(img)
        const { name, description, price, categoryId = null, parameter, products = null } = data
        let product;
        if(products) {
            product = await ProductMapping.create({name, description, price, categoryId, image, parameter, isCombo:true})
            for (const subProductId of JSON.parse(products)) {
                const subproduct = await ProductMapping.findByPk(subProductId)
                await product.addSibling(subproduct)
            }
        } else {
            product = await ProductMapping.create({name, description, price, categoryId, image, parameter, isCombo:false})
        }
        return product
    }

    async update(id, data, img){
        const product = await ProductMapping.findByPk(id, {
            include: [
                {
                    model: ProductMapping,
                    as: "Sibling"
                }
            ]
        })
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
            parameter = product.parameter,
            products = product.Sibling
        } = data
        if(data.products) {
            for(let sibling of product.Sibling) {
                await product.removeSibling(sibling.id)
            }
            for (const subProductId of JSON.parse(products)) {
                const subproduct = await ProductMapping.findByPk(subProductId)
                await product.addSibling(subproduct)
            }
        }
        await product.update({name, description, price, image, categoryId, parameter })
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