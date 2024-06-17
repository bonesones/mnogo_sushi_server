import { Question as QuestionMapping } from './mapping.js'

class Question {
    async getAll() {
        const questions = await QuestionMapping.findAll()
        return questions
    }

    async getOne(id) {
        const question = await QuestionMapping.findByPk(id)
        if (!question) {
            throw new Error('Вопрос не найден')
        }
        return question
    }

    async create(data) {
        const question = await QuestionMapping.create(data)
        return question
    }

    async update(id, data) {
        const question = await QuestionMapping.findByPk(id)
        if (!question) {
            throw new Error('Вопрос не найден')
        }
        const newQuestion = data.name ?? question.name
        const newDescription = data.description ?? question.description
        await question.update({ name: newQuestion, description: newDescription })
        return question
    }

    async delete(id) {
        const question = await QuestionMapping.findByPk(id)
        if (!question) {
            throw new Error('Вопрос не найден')
        }
        await question.destroy()
        return question
    }
}

export default new Question()