import express from 'express';

import product from "./product.js"
import user from "./user.js"
import category from "./category.js"
import combo from "./combo.js"
import basket from "./basket.js";

const router = express.Router();

router.use('/product', product)
router.use('/user', user)
router.use('/category', category)
router.use('/combo', combo)
router.use('/basket', basket)

export default router
