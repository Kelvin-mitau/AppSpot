import { json, LoaderFunction } from "@remix-run/node";
import { Product } from "../DB/models";

export const loader:LoaderFunction = async ({params}) => {
    try {
        const search = params.search || ""
        const queryRegExp = new RegExp(search, "gim")
        const products = search 
            ? await Product.find({$or:[{title:queryRegExp},{category:queryRegExp}]}).select(["-password"]).populate("seller",["username","email"]).sort({"createdAt":-1}).limit(200) 
            : (await Product.find().select(["-password"]).populate("seller",["username","email"]).sort({"createdAt":-1}).limit(200))
        return json(products)
    } catch (err) {
        console.log("Unable to get products",err)
        return json({error:"Oops...Something went wrong on our side"})
    }
}