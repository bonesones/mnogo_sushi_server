import { Basket as BasketMapping } from './mapping.js'
import { Product as ProductMapping } from './mapping.js'
import { BasketProduct as BasketProductMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

const pretty = (basket) => {
    const data = {}
    data.id = basket.id
    data.products = []
    if (basket.products) {
        data.products = basket.products.map(item => {
            return {
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.basket_product.quantity
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
               as: "products"
           }]
       })
        return pretty(basket)
    }

    async append(userId, productId) {
        const basket = await BasketMapping.findOne({
            where: { userId },
            include: [{
                model: ProductMapping,
                as: "products"
            }]
        })
        const basket_product = await BasketProductMapping.findOne({
            where: {basketId: basket.id, productId  }
        })
        if (!basket_product) {
            await BasketProductMapping.create({basketId: basket.id, productId, quantity: 1})
        }
        await basket.reload()
        return pretty(basket)
    }

    async increment(userId, productId) {
        const basket = await BasketMapping.findOne({
            where: {userId},
            include: [{model: ProductMapping, as: 'products'}]
        })

        const basket_product = await BasketProductMapping.findOne({
            where: {basketId: basket.id, productId}
        })
        if (basket_product) {
            await basket_product.increment('quantity', {by: 1})
            await basket.reload()
        }
        return pretty(basket)
    }

    async decrement(userId, productId) {
        const basket = await BasketMapping.findOne({
            where: {userId},
            include: [{model: ProductMapping, as: 'products'}]
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
        return pretty(basket)
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