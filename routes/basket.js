import express from 'express'
import BasketController from "../controllers/Basket.js"
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router()
router.post('/create', BasketController.create)
router.get('/getone', authMiddleware, BasketController.getOne)
router.put('/product/:productId([0-9]+)/append', authMiddleware, BasketController.append)
router.put('/product/:productId([0-9]+)/increment', authMiddleware, BasketController.increment)
router.put('/product/:productId([0-9]+)/decrement', authMiddleware, BasketController.decrement)
router.put('/clear', BasketController.clear)

export default router