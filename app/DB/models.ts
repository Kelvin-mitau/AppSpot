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
    seller:{type: mongoose.Schema.ObjectId,ref:"user"},
    //BAnkDetails

})

const userSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    middleName:{type:String,default:""},
    profilePicture:{type:String},
    username:{type:String,required:true},
    bio:{type:String},
    tags:{type:String},
    password:{type:String, required:true},
    phoneNumber:{type:String, required:true},
    email:{type:String,required:true},
    createdAt:Date,
    businessDetails:{type:Object},
    paymentsDetails:{type:Object}
},{timestamps:{createdAt:"createdAt"}})

const transactionSchema = new mongoose.Schema({
    seller:{type:mongoose.Schema.ObjectId,required:true,ref:"user"},
    product:{type:mongoose.Schema.ObjectId,required:true,ref:"product"},
    buyer:{type:Object,required:true}
})

const Product = mongoose.models.product || mongoose.model("product",productSchema)
const User = mongoose.models.user || mongoose.model("user",userSchema)
const Transaction = mongoose.models.transaction || mongoose.model("transaction",transactionSchema)

export {Product,User,Transaction}