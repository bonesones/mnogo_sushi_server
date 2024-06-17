import express from "express"
import PromocodeController from "../controllers/Promocode.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router()

router.get('/getall', PromocodeController.getAll)
router.get('/getone/:name', PromocodeController.getOne)
router.get('/getone/byid/:id([0-9]+)', PromocodeController.getById)
router.post('/create', authMiddleware, adminMiddleware, PromocodeController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, PromocodeController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, PromocodeController.delete)

export default router