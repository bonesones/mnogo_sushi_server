import express from "express"
import QuestionController from "../controllers/Question.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router()

router.get('/getall', QuestionController.getAll)
router.get('/getone/:id([0-9]+)', QuestionController.getOne)
router.post('/create', authMiddleware, adminMiddleware, QuestionController.create)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, QuestionController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, QuestionController.delete)

export default router