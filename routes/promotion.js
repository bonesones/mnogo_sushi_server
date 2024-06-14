import express from "express"
import PromotionController from "../controllers/Promotion.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router()

router.get('/getall', PromotionController.getAll)
router.get('/getone/:id([0-9]+)', PromotionController.getOne)
router.post('/create', authMiddleware, adminMiddleware, PromotionController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, PromotionController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, PromotionController.delete)

export default router