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
    price: number,
    purchases?: number,
    customerTotalRating: number,
    productRatersCount: number
}

const ProductCard: React.FC<ProductDetails> = ({ _id, screenshots, title, productURL, description, pricingModel, price, purchases, productRatersCount, customerTotalRating }) => {
    const navigate = useNavigate()

    const handleProductReview = (event: React.MouseEvent<HTMLAnchorElement>, url: string) => {
        event.stopPropagation();
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

        <div onClick={() => navigate(`/product/${_id}`)} key={_id} className="text-start cursor-pointer w-full h-full">
            <div className='Product-card h-full mx-2 flex flex-col  p-1 text-white' >
                {screenShotSrc ?
                    <img src={screenShotSrc} alt="" className='w-full aspect-[2/1.5] mr-1 rounded-lg' />
                    : <div className='Card-image-loader w-full aspect-[2/1.5] mr-1 rounded-lg '></div>}
                <div className='mx-1 flex flex-col h-full justify-between '>
                    <div>
                        <p className='text-lg my-2'>{title}</p>
                        <p className='text-[0.9rem] text-slate-200 line-clamp-2'>{description}</p>
                    </div>
                    <div>
                        {productURL && <Link to={productURL} onClick={(e) => handleProductReview(e, productURL)} target="_blank" className='underline' >Preview link</Link>}
                        <div className="flex gap-3 items-center my-2">
                            <div>{handleItemRating((customerTotalRating / productRatersCount), "")}</div> <span>({productRatersCount})</span>
                        </div>
                        {
                            typeof purchases == "number" && <p className="my-2">{purchases} {purchases == 1 ? "purchase" : "purchases"}</p>
                        }
                        <div className='flex justify-end'>
                            {pricingModel == "freemium" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>Free</p>}
                            {pricingModel == "subscription" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>$ {price} per month</p>}
                            {pricingModel == "oneTime" && <p className='bg-[var(--purple-blue)] w-fit py-0.5 px-2 rounded-lg'>$ {price} one time</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard