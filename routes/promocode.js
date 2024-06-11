import express from "express"
import PromocodeController from "../controllers/Promocode.js"

const router = express.Router()

router.get('/getall', PromocodeController.getAll)
router.get('/getone/:name', PromocodeController.getOne)
router.post('/create', PromocodeController.create)
router.put('/update/:id([0-9]+)', PromocodeController.update)
router.delete('/delete/:id([0-9]+)', PromocodeController.delete)

export default router