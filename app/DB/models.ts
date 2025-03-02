import mongoose from 'mongoose'

mongoose.connect("mongodb://localhost:27017/appspot");

const productSchema = new mongoose.Schema({
    title:{type:String, required:true},
    productURL:{type:String, required:true},
    documentationURL:{type:String},
    screenshots:{type:Array},
    pricingModel: {
        type:String,
        enum:["oneTime", "freemium", "subscription"],
        required:true},
    customerTotalRating:{type:Number, default:0},
    productRatersCount:{type:Number, default:0},
    features:{type:Array,required:true},
    category:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number},
    seller:{type: mongoose.Schema.ObjectId,ref:"user"},
    purchasesCount:{type:Number, default:0},
    createdAt:{type:Date},
    verified:{type:Boolean,default:false}

},{timestamps:{createdAt:"createdAt"}})

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
    paymentsDetails:{type:Object},
    active:Boolean
},{timestamps:{createdAt:"createdAt"}})

const transactionSchema = new mongoose.Schema({
    product:{type:mongoose.Schema.ObjectId,required:true,ref:"product"},
    customeDetails:{type:Object,required:true},
    orderID:String,
    approved:{type:Boolean,default:false},
    createdAt:Date
},{timestamps:{createdAt:"createdAt"}})

const Product = mongoose.models.product || mongoose.model("product",productSchema)
const User = mongoose.models.user || mongoose.model("user",userSchema)
const Transaction = mongoose.models.transaction || mongoose.model("transaction",transactionSchema)

export {Product,User,Transaction} 