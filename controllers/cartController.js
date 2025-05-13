const Cart=require('../models/Cart');
const Product=require('../models/Product');


exports.addToCart=async(req,res)=>{
    try {
        const {productId,quantity}=req.body;
        console.log("Req.body:",req.body);
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ items: [] });
        }

        const existingItem = cart.items.find(item => item.productId.toString() === productId);
        
        if (existingItem) {
         existingItem.quantity += quantity || 1;
        } else {
          cart.items.push({ productId, quantity: quantity || 1 });
        }
         await cart.save();
         res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        console.error("Failled to Add To Cart Item",error.message);
        res.status(500).json({message:'Internal Server Error'})
    }
}


exports.getCartItem=async(req,res)=>{
    try {
        const cartItem=await Cart.findOne().populate('items.productId');
        res.status(200).json(cartItem || {items:[]});
        console.log("Cart Items List: ",cartItem);
    } catch (error) {
        console.error('Failled to fetch Cart Item',error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
}

exports.removeFromCart=async(req,res)=>{
    const {id}=req.params;
    try {
        const cart = await Cart.findOne();
        if (!cart) return res.status(404).json({ message: 'Cart not found' });
        cart.items = cart.items.filter(item => item.productId.toString() !== id);
        await cart.save();
        res.json({ message: 'Item removed', cart });
    } catch (error) {
        console.error('Failled To Remove a Cart',error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
}