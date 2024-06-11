import express from "express"
import QuestionController from "../controllers/Question.js"

const router = express.Router()

router.get('/getall', QuestionController.getAll)
router.get('/getone/:id([0-9]+)', QuestionController.getOne)
router.post('/create', QuestionController.create)
router.put('/update/:id([0-9]+)', QuestionController.update)
router.delete('/delete/:id([0-9]+)', QuestionController.delete)

export default router