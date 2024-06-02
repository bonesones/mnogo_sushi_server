import express from "express"

const router = express.Router()


router.post("/signup",  (req, res) => {
    res.status(200).send('Зарегистритрован')
})
router.post("/login",  (req, res) => {
    res.status(200).send('Вошел')
})
router.get('/check', (req, res) => {
    res.status(200).send('Проверка авторизации')
})

router.get('/getAll', (req, res)=>{
    res.status(200).send('Список всех пользователей')
})
router.get('/getOne/:id([0-9]+)', (req, res)=>{
    res.status(200).send('Один пользователь')
})
router.post('/create', (req, res) => {
    res.status(200).send("Создание пользователя")
})
router.put('/update/:id([0-9]+)', (req, res) => {
    res.status(200).send('обновление пользователя')
})
router.delete('/delete/:id([0-9]+)', (req, res) => {
    res.status(200).send('Пользователь удален')
})

export default router