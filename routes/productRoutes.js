const express=require('express');
const router=express.Router();
const productController = require('../controllers/productController');

router.get('/products',productController.viewProduct);
router.post('/product/add',productController.addProduct);
router.put('/product/update/:id',productController.updateProduct);
router.delete('/product/:id',productController.deleteProduct)
router.get('/',productController.searchProduct);
module.exports=router;