import {CallBack as CallbackMapping} from './mapping.js'

class Callback {
    async getAll() {
        const callbacks = await CallbackMapping.findAll()
        return callbacks
    }

    async getOne(id) {
        const callback = await CallbackMapping.findByPk(id)
        if (!callback) {
            throw new Error('Заявка обратной связи не найдена')
        }
        return callback
    }

    async create(data) {
        const {name, phone, message, status = "Новая"} = data
        const callback = await CallbackMapping.create({name, phone, message, status})
        return callback
    }

    async update(id, data) {
        const callback = await CallbackMapping.findByPk(id)
        if (!callback) {
            throw new Error('Заявка обратной связи не найдена в бд')
        }
        const {status = callback.status} = data
        await callback.update({status})
        return callback
    }

    async delete(id) {
        const callback = await CallbackMapping.findByPk(id)
        if (!callback) {
            throw new Error('Заявка обратной связи не найдена')
        }
        await callback.destroy()
        return callback
    }
}

export default new Callback()