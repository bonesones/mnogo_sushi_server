import AppError from '../errors/AppError.js'
import Product from "../models/Product.js";

const admin = (req, res, next) => {
    try {
        if(req.auth.role !== 'ADMIN') {
            throw new Error('Доступ только для администратора')
        }
        next()
    } catch(e) {
        next(AppError.forbidden(e.message))
    }
}

export default admin