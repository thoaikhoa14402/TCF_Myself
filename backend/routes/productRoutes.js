import express from 'express';
import { sendProductData } from '../controllers/productController.js';
const router = express.Router();

// get products
router.get('/get-products', sendProductData);

export default router;
