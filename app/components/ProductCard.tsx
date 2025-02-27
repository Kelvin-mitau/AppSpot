import { useNavigate, Link } from "@remix-run/react"
import { File } from "megajs"
import { useState, useEffect } from "react"
import handleItemRating from '../components/itemRating';

interface ProductDetails {
    _id: string,
    screenshots: string[],
    title: string,
    productURL: undefined | string,
    description: string,
    pricingModel: string,
    price: number
}

const ProductCard: React.FC<ProductDetails> = ({ _id, screenshots, title, productURL, description, pricingModel, price }) => {
    const navigate = useNavigate()

    const handleProductReview = (event: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        event.stopPropagation();
        navigate(url, {})
    }

    const [screenShotSrc, setScreenshotSrc] = useState<string>('')

    useEffect(() => {
        const file = File.fromURL(screenshots[0]);
        file.loadAttributes((err, file) => {
            if (err) {
                console.error('Error loading file attributes:', err);
                return;
            }
            file.downloadBuffer({}).then(data => {
                const decoder = new TextDecoder()
                setScreenshotSrc(decoder.decode(data))
            })
        });
    }, []);
    return (

        <Link to={`/product/${_id}`} key={_id}>
            <div className='Product-card h-full mx-2 flex flex-col justify-between p-1 text-white' >
                <img src={screenShotSrc ? screenShotSrc : "/random.png"} alt="" className='w-full aspect-[2/1.5] mr-1 rounded-lg' />
                <div className='mx-1'>
                    <p className='text-lg my-2'>{title}</p>
                    <p className='text-[0.9rem] text-slate-200'>{description}</p>
                    {productURL && <Link to={productURL} className='underline' onClick={(e) => handleProductReview(e, productURL)}>Preview Link</Link>}
                    <div className="flex gap-3 items-center my-2">
                        <div>{handleItemRating(2, "")}</div> <span>({0})</span>
                    </div>
                    <div className='flex justify-end'>
                        {pricingModel == "freemium" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>Free</p>}
                        {pricingModel == "subscription" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>$ {price} per month</p>}
                        {pricingModel == "oneTime" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>$ {price} one time</p>}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard