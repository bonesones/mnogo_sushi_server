import { Promocode as PromocodeMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Promocode {
    async getAll() {
        const promocodes = await PromocodeMapping.findAll({
            order: [['id', 'DESC']]
        })
        return promocodes
    }

    async getOne(name) {
        const promocode = await PromocodeMapping.findOne({
            where: {
                name
            }
        })
        if (!promocode) {
            throw new Error('Такого промокода не существует')
        }
        return promocode
    }

    async getById(id) {
        const promocode = await PromocodeMapping.findByPk(id)
        if(!promocode) {
            throw new Error('Такого промокода не существует')
        }
        return promocode
    }

    async create(data) {
        const { name, min_amount, discount_type, discount_amount } = data
        const promocodeIsExist = await PromocodeMapping.findOne({
            where: {
                name
            }
        })
        if(promocodeIsExist) {
            throw new Error('Промокод уже существует')
        }
        const promocode = await PromocodeMapping.create({name, min_amount, discount_type, discount_amount})
        return promocode
    }

    async update(id, data) {
        const promocode = await PromocodeMapping.findByPk(id)
        if (!promocode) {
            throw new Error('Такого промокода не существует')
        }
        const promocodeIsExists = await PromocodeMapping.findOne({
            where: {
                name: data.name
            }
        })
        if(promocodeIsExists && data.name != promocode.name) {
            throw new Error("Такой промокод уже существует")
        }
        const { name = promocode.name, min_amount = promocode.min_amount, discount_type = promocode.discount_type, discount_amount = promocode.discount_amount } = data

        await promocode.update({name, min_amount, discount_type, discount_amount})
        return promocode
    }

    async delete(id) {
        const promocode = await PromocodeMapping.findByPk(id)
        if (!promocode) {
            throw new Error('Такого промокода не существует')
        }
        await promocode.destroy()
        return promocode
    }
}

export default new Promocode()