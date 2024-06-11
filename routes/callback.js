import express from "express"
import CallBackController from "../controllers/Callback.js"

const router = express.Router()

router.get('/getall', CallBackController.getAll)
router.get('/getone/:id([0-9]+)', CallBackController.getOne)
router.post('/create', CallBackController.create)
router.put('/update/:id([0-9]+)', CallBackController.update)
router.delete('/delete/:id([0-9]+)', CallBackController.delete)

export default router