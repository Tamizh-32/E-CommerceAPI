const Product = require('../models/Product');

exports.viewProduct=async(req,res)=>{
    try {
        const product=await Product.find({});
        res.status(200).json({product});
        console.log("Product List:",product);
    } catch (error) {
        console.error("Failled to Fetch Product!",error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
}

exports.addProduct = async (req, res) => {
    try {
    
        let addedProducts;
        if (Array.isArray(req.body)) {
            addedProducts = await Product.insertMany(req.body);
        } else {
            const { name, description, price, inStock } = req.body;
            console.log("Req.Body:", req.body);
            addedProducts = await Product.create({ name, description, price, inStock });
        }
        res.status(200).json({addedProducts });
        console.log("Products Added Successfully!");

    } catch (error) {
        console.error("Failed to Add Product:", error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.updateProduct=async(req,res)=>{
    try {
        const {name,description,price,inStock}=req.body;
        console.log("Req.Body: ",req.body);
        const updateProduct=await Product.findByIdAndUpdate(req.params.id,{name,description,price,inStock})
        res.status(200).json({updateProduct});
        console.log("Product Updated SuccessFully!");
    } catch (error) {
        console.error("Failled to Update Product!",error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
}


exports.deleteProduct=async(req,res)=>{
    try {
        const deleteProduct=await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({deleteProduct});
        console.log("Product Deleted SuccessFully!");
    } catch (error) {
        console.error('Failled to Delete Product',error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
}

exports.searchProduct=async(req,res)=>{
    try {
        const {search}=req.query;
        const query=search
        ?{
            $or:[
                {name:new RegExp(search,'i')},
                {description:new RegExp(search,'i')},
            ],
        }:{};
        const searchProducts=await Product.find(query);
        res.status(200).json(searchProducts);
        
    } catch (error) {
        console.error('Failled to Search Product',error.message);
        res.status(500).json({message:'Internal Server Error'});
    }
}