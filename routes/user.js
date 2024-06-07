import express from "express"
import UserController from "../controllers/User.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()


router.post("/signup",  UserController.signup)
router.post("/login",  UserController.login)
router.post('/logout', UserController.logout)
router.get('/check', UserController.check)
router.get('/activate/:link', UserController.activate)
router.post('/check', UserController.check)

router.get('/getuser', UserController.getUser)
router.put('/update', UserController.updateUser)
router.get('/getall', authMiddleware,  UserController.getAll)
router.get('/getone/:id([0-9]+)', UserController.getOne)
router.put('/update/:id([0-9]+)', UserController.update)
router.delete('/delete/:id([0-9]+)', UserController.delete)

export default router