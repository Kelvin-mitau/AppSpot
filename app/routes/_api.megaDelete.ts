import { ActionFunction, json } from "@remix-run/node";
import { Storage } from "megajs";

export const action:ActionFunction = async ({request}) => {
    try {
        const formData = await request.json()
        const fileLink = formData.fileLink || ""
        const storage = await new Storage({
                    email: process.env.MEGA_EMAIL || "",
                    password:  process.env.MEGA_PASS || ""
                }).ready;
                //@ts-ignore
        const file = storage.find(file => file.link == fileLink)
        file?.delete(true)
        return json({})
    } catch (error) {
        console.error(error)
        return json({})
    }
}