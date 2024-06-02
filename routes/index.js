import express from 'express';

import product from "./product.js"
import user from "./user.js"
import category from "./category.js"

const router = express.Router();

router.use('/product', product)
router.use('/user', user)
router.use('/category', category)

export default router
