const mongoose = require('mongoose');
const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String},
    price:{type:Number},
    inStock:{type:String},
});

const Product=mongoose.model('Product',productSchema);
module.exports=Product;


