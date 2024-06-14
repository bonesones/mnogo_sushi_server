import express from "express"
import ProductController from "../controllers/Product.js"
import multer from "multer"
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const upload = multer()

const router = express.Router()

router.get('/getall', ProductController.getAll)
router.get('/getall/categoryId/:categoryId([0-9]+)', ProductController.getAll)
router.get('/getone/:id([0-9]+)', ProductController.getOne)
router.post('/create', authMiddleware, adminMiddleware, ProductController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, ProductController.update)
router.put('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, ProductController.delete)

export default router