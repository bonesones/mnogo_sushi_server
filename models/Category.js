import {Category as CategoryMapping, Promotion as PromotionMapping} from './mapping.js'
import AppError from '../errors/AppError.js'

class Category {
    async getAll() {
        const categories = await CategoryMapping.findAll({
            order: [['id', 'ASC']],
        })
        return categories
    }

    async getOne(id) {
        const category = await CategoryMapping.findByPk(id)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        return category
    }

    async create(data) {
        const {name} = data
        const categoryIsExist = CategoryMapping.findOne({
            where: {
                name: data.name,
            }
        })
        if(categoryIsExist) {
            return categoryIsExist;
            throw new Error("Категория с таким названием уже существует")
        }
        const category = await CategoryMapping.create({name})
        return category
    }

    async update(id, data) {
        const category = await CategoryMapping.findByPk(id)

        if (!category) {
            throw new Error('Категория не найдена в БД')
        }

        const categoryIsExist = CategoryMapping.findOne({
            where: {
                name: data.name,
            }
        })
        console.log(categoryIsExist, data.name, category.name)
        if(categoryIsExist && data.name !== category.name) {
            throw new Error("Категория с таким названием уже существует")
        }
        const {name = category.name} = data
        await category.update({name})
        return category
    }

    async delete(id) {
        const category = await CategoryMapping.findByPk(id)
        if (!category) {
            throw new Error('Категория не найдена в БД')
        }
        await category.destroy()
        return category
    }
}

export default new Category()