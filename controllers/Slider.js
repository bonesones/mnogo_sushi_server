import AppError from "../errors/AppError.js";
import SliderModel from "../models/Slider.js";
import {list} from "@vercel/blob";

class Slider {
    async getAll(req, res, next) {
        try {
            const sliders = await SliderModel.getAll()
            res.status(200).json(sliders)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error("Не указан ID слайда")
            }
            const slider = await SliderModel.getOne(req.params.id)
            res.status(200).json(slider)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            const slider = await SliderModel.create(req.body, req.files)
            res.status(200).json(slider)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID слайда не указан')
            }
            const slider = await SliderModel.update(req.params.id, req.body, req.files)
            res.status(200).json(slider)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if(!req.params.id) {
                throw new Error('ID слайда не указан')
            }
            const slider = await SliderModel.delete(req.params.id)
            res.status(200).json(slider)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Slider()