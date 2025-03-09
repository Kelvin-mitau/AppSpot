import { json } from "@remix-run/node";
import { ActionFunction } from "@remix-run/node";
import { Storage } from "megajs";

export const action:ActionFunction = async({request}) => {
    try {
        const formData = await request.formData()
        const fileType =formData.get("productFileType")
        const productFile = formData.get("productFile")
        const sellerID = formData.get("sellerID")
        if (!(productFile instanceof File)) {
            throw new Error("Expected productFile to be a File");
        }
        const productFileArrBuffer = await productFile.arrayBuffer();
        
        const storage = await new Storage({
                    email: 'kelvinmitau05@gmail.com',
                    password: 'kelvin@MEGA'
                }).ready;

        const buffer = Buffer.from(productFileArrBuffer)
        const uploadedproductFile = await (storage.upload({name:`${sellerID}${Date.now()}${fileType}`,
        //@ts-ignore
        allowUploadBuffering:true},buffer).complete)
        return json({link:await uploadedproductFile.link({})})
    } catch (error) {
        console.log(error)
        return json({error:"Oops...Something went wrong.Please try again"})
    }
}

/*  const uploadProductFile = async () => {


            if (!(productFile instanceof File)) {
                throw new Error("Expected productFile to be a File");
            }
            const productFileArrBuffer = await productFile.arrayBuffer();
            const buffer = Buffer.from(productFileArrBuffer)
            const uploadedproductFile = await (storage.upload({
                name: `${sellerID}${Date.now()}${fileType}`,
                //@ts-ignore
                allowUploadBuffering: true
            }, buffer).complete)
            console.log("Product link", await uploadedproductFile.link({}))
            return await uploadedproductFile.link({})
        } */