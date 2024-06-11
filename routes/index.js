import express from 'express';

import product from "./product.js"
import user from "./user.js"
import category from "./category.js"
import basket from "./basket.js";
import promocode from "./promocode.js";
import order from "./order.js"
import question from "./question.js";
import callback from "./callback.js"

const router = express.Router();

router.use('/product', product)
router.use('/user', user)
router.use('/category', category)
router.use('/basket', basket)
router.use('/promocode', promocode)
router.use('/order', order)
router.use('/question', question)
router.use('/callback', callback)

export default router
