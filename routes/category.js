import express from "express"

const router = express.Router()

router.get('/getall', (req, res)=>{
    res.status(200).send('Список всех категорий')
})
router.get('/getone/:id([0-9]+)', (req, res)=>{
    res.status(200).send('Одна категория')
})
router.post('/create', (req, res) => {
    res.status(200).send("Категория создана")
})
router.put('/update/:id([0-9]+)', (req, res) => {
    res.status(200).send('Категория обновлена')
})
router.delete('/delete/:id([0-9]+)', (req, res) => {
    res.status(200).send('Категория удалена')
})

export default router