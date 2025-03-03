import { LoaderFunction } from '@remix-run/node'
import { Layout } from '../root'
import { Product } from "../DB/models";
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
export const loader: LoaderFunction = async ({ params }) => {
    try {
        const productID = params.id
        const product = await Product.findById(productID).select(["_id", "documentationURL", "title"])
        return json({ title: product.title, documentation: product.documentationURL })
    } catch (error) {
        console.log(error)
        return json({ error: "Oops..Something went wrong on our side" })
    }
}
const Download = () => {
    const { documentation, title } = useLoaderData<{ documentation: string, title: string }>()
    return (
        <Layout>
            <div className='flex flex-col items-center justify-center min-h-[80vh]'>
                <span>We have sent you an email with the link to download the app {title}.</span>
                <span>You can also utilize the button below</span>
                <a href={documentation} className='bg-indigo-600 px-2 py-1 rounded cursor-pointer w-min'>Verify</a>
            </div>
        </Layout>
    )
}

export default Download