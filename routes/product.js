import express from "express"
import ProductController from "../controllers/Product.js"
import multer from "multer"

const upload = multer()

const router = express.Router()

router.get('/getall', ProductController.getAll)
router.get('/getall/categoryId/:categoryId([0-9]+)', ProductController.getAll)
router.get('/getone/:id([0-9]+)', ProductController.getOne)
router.post('/create', ProductController.create)
router.put('/update/:id([0-9]+)', ProductController.update)
router.delete('/delete/:id([0-9]+)', ProductController.delete)

export default router