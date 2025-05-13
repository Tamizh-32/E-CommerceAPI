const express = require('express');
const router = express.Router();
const carController=require('../controllers/cartController');

router.post('/cart/add', carController.addToCart);
router.get('/cart', carController.getCartItem);
router.delete('/cart/:id', carController.removeFromCart);

module.exports = router;
