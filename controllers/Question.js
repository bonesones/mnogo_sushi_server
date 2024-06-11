import AppError from "../errors/AppError.js";
import QuestionModel from "../models/Question.js";

class Question {
    async getAll(req, res, next) {
        try {
            const questions = await QuestionModel.getAll()
            res.status(200).json(questions)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error("Не указан ID вопроса")
            }
            const question = await QuestionModel.getOne(req.params.id)
            res.status(200).json(question)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const question = await QuestionModel.create(req.body)
            res.status(200).json(question)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID вопроса не указан')
            }
            const question = await QuestionModel.update(req.params.id, req.body)
            res.status(200).json(question)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID вопроса не указан')
            }
            const category = await QuestionModel.delete(req.params.id)
            res.status(200).json(category)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Question()