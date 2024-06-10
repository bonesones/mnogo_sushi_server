import express from "express"
import ComboController from "../controllers/Combo.js"

const router = express.Router()

router.get('/getall', ComboController.getAll)
router.get('/getall/categoryId/:categoryId([0-9]+)', ComboController.getAll)
router.get('/getone/:id([0-9]+)', ComboController.getOne)
router.post('/create', ComboController.create)
router.put('/update/:id([0-9]+)', ComboController.update)
router.delete('/delete/:id([0-9]+)', ComboController.delete)

export default router