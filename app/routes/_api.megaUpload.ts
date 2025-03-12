import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { Storage } from "megajs";

export const action:ActionFunction = async({request}) => {
    try {
        const formData = await request.formData()
        const fileType =formData.get("productFileType")
        const productFile = formData.get("productFile")
        const sellerID = formData.get("sellerID")
        const storage = await new Storage({
                    email: process.env.MEGA_EMAIL || "",
                    password:  process.env.MEGA_PASS || ""
                }).ready;
                
        if (!productFile) {
            throw new Error("ProductFile can not be falsy");
        }
        if (typeof productFile == "string"){
        const uploadedproductFile = await storage.upload(`${sellerID}${Date.now()}${fileType}`, productFile).complete
        return json({link:await uploadedproductFile.link({})})
        }

        if (!(productFile instanceof File) && fileType != ".txt") {
            throw new Error("Expected productFile to be a File");
        }
        
        const productFileArrBuffer = await productFile.arrayBuffer();  
        const buffer = Buffer.from(productFileArrBuffer)
        const uploadedproductFile = await (storage.upload({name:`${sellerID}${Date.now()}${fileType}`,
        //@ts-ignore
        allowUploadBuffering:true},buffer).complete)
        return json({link:await uploadedproductFile.link({})})
    } catch (error) {
        console.error(error)
        return json({error:"Oops...Something went wrong.Please try again"})
    }
}
