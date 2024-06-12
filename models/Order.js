import { Order as OrderMapping, OrderItem as OrderItemMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Order {
    async getAll(userId) {
        let orders;
        if(userId) {
            orders = await OrderMapping.findAll({
                where: { userId },
                include: [
                    {model: OrderItemMapping, as: 'items'}
                ]
            })
        } else {
            orders = await OrderMapping.findAll({
                include: [
                    {model: OrderItemMapping, as: 'items'}
                ]
            })
        }

        return orders
    }

    async create(data) {
        console.log(data.items)

        const order = await OrderMapping.create(data)
        for(let item of data.items) {
            await OrderItemMapping.create({
                name: item.name,
                price: item.price,
                orderId: order.id,
                productId: item.id,
                quantity: item.quantity
            })
        }
        const created = await OrderMapping.findByPk(order.id, {
            include: [
                {model: OrderItemMapping, as: "items"}
            ]
        })
        return created
    }

    async update(id, data) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден')
        }
        const {status = order.status} = data
        await order.update({status})
        return order
    }
}

export default new Order()