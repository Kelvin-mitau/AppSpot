import { LoaderFunction } from '@remix-run/node'
import Layout from './Layout'
import { Product } from "../DB/models";
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import pkg from 'file-saver';
const { saveAs } = pkg;
import { useState } from 'react';

import { File } from 'megajs';
import { decrypt } from '../functions/crypto';

import { MetaFunction } from '@remix-run/react';
export const meta: MetaFunction = () => {
    return [
        {
            title: "Download app",
            author: "Appspot"
        }
    ];
};

const Download = () => {
    const { documentation, title, productDownloadURL, error } = useLoaderData<{
        documentation: string, title: string, productDownloadURL: string, error: string
    }>()
    const [state, setState] = useState("")

    const [downLoadProgress, setDownloadProgress] = useState(0)

    const downloadMegaFile = async () => {
        const file = File.fromURL(productDownloadURL);
        const editedTitle = title.replace(" ", "-")

        file.loadAttributes((err: any, file: File) => {
            if (err) {
                console.error('Error loading file attributes:', err);
                return;
            }

            const fileNameTest = `${editedTitle}${file.name?.slice(file.name.length - 4)}`
            console.log("File name: ", file.name);
            const fileStream = file.download({});

            let chunks: any[] = [];
            fileStream.on('data', (chunk: any) => {
                setState("downloading")
                chunks.push(chunk);
            });

            fileStream.on('progress', (info: any) => {
                const ratio = info.bytesLoaded / info.bytesTotal
                setDownloadProgress(!ratio ? 0 : ratio * 100)
            })

            fileStream.on('end', () => {
                setState("complete")
                const blob = new Blob(chunks);
                saveAs(blob, fileNameTest);
            });

            fileStream.on('error', (err: Error) => {
                setState("error")
                console.error('Error downloading file:', err);
            });
        });
    };

    return (
        <Layout>
            {!error ? <div className='flex flex-col items-center justify-center min-h-[80vh]'>
                <span>We have sent you an email with the link to download the app {title}.</span>
                <span>You can also utilize the button below</span>
                <button onClick={downloadMegaFile} className='bg-indigo-600 px-2 py-1 rounded cursor-pointer w-min my-4' disabled={state == "downloading"}>Download</button>
                {
                    state == "downloading" && <div
                        style={{ "--percentage": `${downLoadProgress.toString()}%` } as React.CSSProperties} className='Download-progress-indicator'></div>
                }
                {
                    state == "error" && <span className='text-red-600'>Oops...YOu download got disrupted. Please try again</span>
                }
                {
                    documentation && state == "complete" ?
                        <span>Your files have been downloaded successfully. You can check on your downloads.<br /> Click <a href={documentation} className='underline'>here</a> to view the documentation.</span> : ""
                }
            </div>
                :
                <div className='flex flex-col items-center justify-center min-h-[80vh]'>
                    <p className='text-red-500'>{error}</p>
                </div>
            }
        </Layout>
    )
}

export default Download



export const loader: LoaderFunction = async ({ params, request }) => {
    try {
        const searchParams = new URL(request.url).searchParams
        const auth = searchParams.get("a") || ""

        if (decrypt(auth.replaceAll(" ", "+"), "random-key") != "random-text") {
            return json({ error: "You are not authorized." })
        }
        const productID = params.id
        const product = await Product.findById(productID).select(["_id", "documentationURL", "title", "productDownloadURL"])
        return json({ title: product.title, documentation: product.documentationURL })
    } catch (error) {
        console.log(error)
        return json({ error: "Oops...Something went wrong on our side" })
    }
}