import express from 'express'
import OrderController from '../controllers/Order.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = new express.Router()

router.get(
    '/admin/getall',
    authMiddleware,
    adminMiddleware,
    OrderController.adminGetAll
)

router.put(
    '/admin/update/:id([0-9]+)',
    authMiddleware,
    adminMiddleware,
    OrderController.adminUpdate
)



router.get(
    '/user/getall',
    authMiddleware,
    OrderController.userGetAll
)

router.post(
    '/user/create',
    authMiddleware,
    OrderController.userCreate
)

export default router