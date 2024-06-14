import {Basket as BasketMapping, BasketProduct} from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import { BasketProduct as BasketProductMapping } from './mapping.js'
import AppError from '../errors/AppError.js'
import {Sequelize} from "sequelize";

const pretty = (basket) => {
    const data = {}
    data.id = basket.id
    data.products = []
    if (basket.products) {
        console.log(basket.products)
        data.products = basket.products.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.basket_products.quantity
            }
        })
    }
    return data
}

class Basket {
    async create(userId) {
        const basket = await BasketMapping.create({userId})
        return pretty(basket)
    }

    async getOne(userId) {
       const basket = await BasketMapping.findOne({
           where: { userId },
           include: [{
               model: ProductMapping,
               as: "products",
               through: {
                   model: BasketProductMapping,
                   as: "basket_products",
                   attributes: ["id", "quantity"]
               }
           }],
           order: [[{model: ProductMapping, as: "products"}, {model:BasketProductMapping, as: "basket_products"}, 'id', 'DESC']]
       })
        return pretty(basket)
    }

    async append(userId, productId) {
        const basket = await BasketMapping.findOne({
            where: { userId },
            include: [{
                model: ProductMapping,
                as: "products",
                through: {
                    model: BasketProductMapping,
                    as: "basket_products",
                    attributes: ["id", "quantity"]
                }
            }],
            order: [[{model: ProductMapping, as: "products"}, {model:BasketProductMapping, as: "basket_products"}, 'id', 'DESC']]
        })
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId: basket.id, productId  }
        })
        if (!basket_product) {
            await BasketProductMapping.create({basketId: basket.id, productId, quantity: 1})
        }
        await basket.reload()

        const newBasket = await BasketMapping.findOne({
            where: { userId },
            include: [{
                model: ProductMapping,
                as: "products",
                through: {
                    model: BasketProductMapping,
                    as: "basket_products",
                    attributes: ["id", "quantity"]
                }
            }],
            order: [[{model: ProductMapping, as: "products"}, {model:BasketProductMapping, as: "basket_products"}, 'id', 'DESC']]
        })


        return pretty(newBasket)
    }

    async increment(userId, productId) {
        const basket = await BasketMapping.findOne({
            where: { userId },
            include: [{
                model: ProductMapping,
                as: "products",
                through: {
                    model: BasketProductMapping,
                    as: "basket_products",
                    attributes: ["id", "quantity"]
                }
            }],
            order: [[{model: ProductMapping, as: "products"}, {model:BasketProductMapping, as: "basket_products"}, 'id', 'DESC']]
        })

        const basket_product = await BasketProductMapping.findOne({
            where: {basketId: basket.id, productId},
        })

        if (basket_product) {
            await basket_product.increment('quantity', {by: 1})
            await basket.reload()
        }

        const newBasket = await BasketMapping.findOne({
            where: { userId },
            include: [{
                model: ProductMapping,
                as: "products",
                through: {
                    model: BasketProductMapping,
                    as: "basket_products",
                    attributes: ["id", "quantity"]
                }
            }],
            order: [[{model: ProductMapping, as: "products"}, {model:BasketProductMapping, as: "basket_products"}, 'id', 'DESC']]
        })

        return pretty(newBasket)
    }

    async decrement(userId, productId) {
        const basket = await BasketMapping.findOne({
            where: { userId },
            include: [{
                model: ProductMapping,
                as: "products",
                through: {
                    model: BasketProductMapping,
                    as: "basket_products",
                    attributes: ["id", "quantity"]
                }
            }],
            order: [[{model: ProductMapping, as: "products"}, {model:BasketProductMapping, as: "basket_products"}, 'id', 'DESC']]
        })
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId: basket.id, productId}
        })
        if (basket_product) {
            if (basket_product.quantity != 1) {
                await basket_product.decrement('quantity', {by: 1})
            } else {
                await basket_product.destroy()
            }
            await basket.reload()
        }

        const newBasket = await BasketMapping.findOne({
            where: { userId },
            include: [{
                model: ProductMapping,
                as: "products",
                through: {
                    model: BasketProductMapping,
                    as: "basket_products",
                    attributes: ["id", "quantity"]
                }
            }],
            order: [[{model: ProductMapping, as: "products"}, {model:BasketProductMapping, as: "basket_products"}, 'id', 'DESC']]
        })

        return pretty(newBasket)
    }

    async remove(userId, productId) {
        const basket = await BasketMapping.findOne({
            where: {userId},
            include: [{model: ProductMapping, as: 'products'}]
        })
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId: basket.id, productId}
        })
        if (basket_product) {
            await basket_product.destroy()
            await basket.reload()
        }
        return pretty(basket)
    }

    async clear(userId) {
        const basket = await BasketMapping.findOne({
            where: {userId},
        })
        if (basket) {
            await BasketProductMapping.destroy({where: {basketId: basket.id }})
            await basket.reload()
        } else {
            throw new Error('Корзина не существует')
        }
        return pretty(basket)
    }

    async delete(userId) {
        const basket = await BasketMapping.findOne({
            where: {userId},
            include: [{model: ProductMapping, as: 'products'}]
        })
        if (!basket) {
            throw new Error('Корзина не существует')
        }
        await basket.destroy()
        return pretty(basket)
    }
}

export default new Basket()