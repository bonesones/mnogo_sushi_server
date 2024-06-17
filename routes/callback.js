import express from "express"
import CallBackController from "../controllers/Callback.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router()

router.get('/getall', CallBackController.getAll)
router.get('/getone/:id([0-9]+)', CallBackController.getOne)
router.post('/create', CallBackController.create)
router.put('/update/:id([0-9]+)', authMiddleware, authMiddleware, CallBackController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, CallBackController.delete)

export default router