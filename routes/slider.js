import express from "express"
import SliderController from "../controllers/Slider.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import * as path from "node:path";

const router = express.Router()

router.get('/getall', SliderController.getAll)
router.get('/getone/:id([0-9]+)', SliderController.getOne)
router.post('/create', authMiddleware, adminMiddleware,  SliderController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, SliderController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, SliderController.delete)

export default router