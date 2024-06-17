import express from "express"
import UserController from "../controllers/User.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import AuthMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router()


router.post("/signup",  UserController.signup)
router.post("/login",  UserController.login)
router.post('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.post('/check', authMiddleware, UserController.check)
router.post('/create', UserController.create)
router.post('/getrole', authMiddleware, UserController.getRole)

router.get('/getuser', authMiddleware, UserController.getUser)
router.put('/update',authMiddleware, UserController.updateUser)
router.delete('/delete', authMiddleware, UserController.deleteUser)
router.get('/getall', authMiddleware, adminMiddleware,  UserController.getAll)
router.get('/getone/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.getOne)
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.update)
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.delete)

export default router