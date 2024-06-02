import express from "express"

const router = express.Router()

router.get('/getall', (req, res)=>{
    res.status(200).send('Список всех товаров')
})
router.get('/getone/:id([0-9]+)', (req, res)=>{
    res.status(200).send('Один товар')
})
router.post('/create', (req, res) => {
    res.status(200).send('Товар создан')
})
router.put('/update/:id([0-9]+)', (req, res) => {
    res.status(200).send('Товар обновлён')
})
router.delete('/delete/:id([0-9]+)', (req, res) => {
    res.status(200).send('Товар удален')
})

export default router