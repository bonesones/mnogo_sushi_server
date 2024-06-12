import express from "express"
import SliderController from "../controllers/Slider.js"

const router = express.Router()

router.get('/getall', SliderController.getAll)
router.get('/getone/:id([0-9]+)', SliderController.getOne)
router.post('/create', SliderController.create)
router.put('/update/:id([0-9]+)', SliderController.update)
router.delete('/delete/:id([0-9]+)', SliderController.delete)

export default router