import { json, LoaderFunction } from "@remix-run/node";
import { User } from "../DB/models";

export const loader:LoaderFunction = async ({params}) => {
    try {
        const search = params.search || ""
        const queryRegExp = new RegExp(search, "gim")
        const users = search ? await User.find({$or:[{username:queryRegExp},{email:queryRegExp}]}).select(["-password"]).limit(200) : await User.find().select(["-password"]).limit(200)
        return json(users)
    } catch (err) {
        console.log("Unable to get users",err)
        return json({error:"Oops...Something went wrong on our side"})
    }
}