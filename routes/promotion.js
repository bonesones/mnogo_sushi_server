import express from "express"
import PromotionController from "../controllers/Promotion.js"

const router = express.Router()

router.get('/getall', PromotionController.getAll)
router.get('/getone/:id([0-9]+)', PromotionController.getOne)
router.post('/create', PromotionController.create)
router.put('/update/:id([0-9]+)', PromotionController.update)
router.delete('/delete/:id([0-9]+)', PromotionController.delete)

export default router