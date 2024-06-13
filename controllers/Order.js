import OrderModel from "../models/Order.js"
import BasketModel from "../models/Basket.js"
import AppError from "../errors/AppError.js";

class Order {
    async userCreate(req, res, next) {
        const { is_delivery,
            street_house = null,
            room = null,
            entrance = null,
            floor = null,
            comment = null,
            name,
            phone,
            in_time,
            ready_hour,
            ready_minutes,
            amount,
            status = "Новый",
            payment_method,
            promocodeId = null
        } = req.body
        try {
            const basket = await BasketModel.getOne(req.auth.id)
            const items = basket.products
            const order = await OrderModel.create({
                items, is_delivery, street_house, room, entrance, floor, comment, name, phone, in_time, ready_hour, ready_minutes, amount, status, payment_method, userId: req.auth.id, promocodeId
            })
            await BasketModel.clear(req.auth.id)
            res.status(200).json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async adminGetAll(req, res, next) {
        try {
            const orders = await OrderModel.getAll()
            res.status(200).json(orders)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async adminUpdate(req, res, next) {
        try {
            const order = await OrderModel.update(req.params.id, req.body)
            res.status(200).json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async userGetAll(req, res, next) {
        try {
            const orders = await OrderModel.getAll(req.auth.id)
            res.status(200).json(orders)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Order()