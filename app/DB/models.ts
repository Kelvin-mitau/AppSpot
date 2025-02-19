import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/appspot");

const productSchema = new mongoose.Schema({
    title:{type:String, required:true},
    productURL:{type:String, required:true},
    documentationURL:{type:String, required:true},
    screenshots:{type:Array,required:true},
    pricingModel: {
        type:String,
        enum:["oneTime", "freemium", "subscription"],
        required:true},
    customerReviews:{type:Array,default:[] },
    features:{type:Array,required:true},
    category:{type:String, required:true},
    description:{type:String, required:true},
    pricetype:{type:Number,required:true},
    seller:{type: mongoose.Schema.ObjectId,ref:"seller"},
    //BAnkDetails

})

const sellerSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    middleName:{type:String,default:""},
    profilePicture:{type:String},
    username:{type:String,required:true},
    bio:{type:String},
    tags:{type:Array},
    password:{type:String, required:true},
    email:{type:String,required:true}

})

const transactionSchema = new mongoose.Schema({
    seller:{type:mongoose.Schema.ObjectId,required:true,ref:"seller"},
    product:{type:mongoose.Schema.ObjectId,required:true,ref:"product"},
    buyer:{type:Object,required:true}
})

const Product = mongoose.model("product",productSchema)
const Seller = mongoose.model("seller",sellerSchema)
const Transction = mongoose.model("transaction",transactionSchema)

export {Product,Seller,Transction}