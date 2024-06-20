import { Product as ProductMapping } from './mapping.js'
import { Category as CategoryMapping } from "./mapping.js";
import AppError from "../errors/AppError.js";
import FileService from '../services/File.js'


class Product {
    async getAll(id) {
        let products
        if(id) {
            products =  await ProductMapping.findAll({
                where: {
                    categoryId: id
                },
                include: [
                    {
                        model: ProductMapping,
                        as: "Sibling",
                    },
                    {
                        model: CategoryMapping,
                        as: "category"
                    }
                ],
                order: [["id", "DESC"]]
            })
        } else {
            products =  await ProductMapping.findAll({
                include: [
                    {
                        model: ProductMapping,
                        as: "Sibling",
                    },
                    {
                        model: CategoryMapping,
                        as: "category"
                    }
                ],
                order: [["id", "DESC"]]
            })
        }
        return products
    }

    async getOne(id) {
        const product = await ProductMapping.findByPk(id, {
            include: [
                {
                    model: ProductMapping,
                    as: "Sibling"
                },
                {
                    model: CategoryMapping,
                    as: "category"
                }
            ]
        })
        if (!product) {
            throw new Error('Товар не найден в БД')
        }
        return product
    }

    async create(data, image){
        const productIsExists = await ProductMapping.findOne({
            where: {
                name: data.name
            }
        })
        if(productIsExists) {
            throw new Error("Товар с таким названием уже существует!")
        }
        const img = FileService.save(image)
        const { name, description, price, categoryId = null, parameter, products = null} = data
        let product;
        if(products) {
            product = await ProductMapping.create({name, description, price, categoryId, image: img, parameter, isCombo:true})
            for (const subProductId of JSON.parse(products)) {
                const subproduct = await ProductMapping.findByPk(subProductId)
                await product.addSibling(subproduct)
            }
        } else {
            product = await ProductMapping.create({name, description, price, categoryId, image: img, parameter, isCombo:false})
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

        if(data.name) {
            const productIsExists = await ProductMapping.findOne({
                where: {
                    name: data.name
                }
            })
            if(productIsExists && data.name !== product.name) {
                throw new Error("Товар с таким названием уже существует!")
            }
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
            isDeleted = product.isDeleted,
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
        await product.update({name, description, price, image, categoryId, parameter, isDeleted })
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