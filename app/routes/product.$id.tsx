import { Link, useParams } from '@remix-run/react'
import React, { useState } from 'react'
import handleItemRating from '../components/itemRating';
import { useNavigate } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';

function Product() {
    const navigate = useNavigate()
    const { id } = useParams();
    const [selectedPhoto, setSelectedPhoto] = useState(0)
    const [selectedNoOfItems, setSelectedNoOfItems] = useState(0)

    const product = {
        itemPhotos: ["/random.png", "/random.png"],
        rating: 4,
        price: 500
    }
    const relatedProducts = [{
        _id: "2",
        itemPhotos: ["/random.png", "/random.png", , '/logo.png'],
        rating: 4,
        price: 500,
        description: "Something here..."
    }, {
        _id: "3",
        itemPhotos: ["/random.png", "/random.png", '/logo.png'],
        rating: 4,
        price: 500,
        description: "Something here..."
    }]

    /*  const loader:LoaderFunction =  () => {

    } */


    function handleBuyNow() {
        navigate(`/order/${id}?quantity=2&color=red`);
    }


    function handlePhotoSelect(btn: number) {
        if (btn == 1 && selectedPhoto < product.itemPhotos.length - 1) {
            setSelectedPhoto((prev) => prev + 1);
        }
        if (btn == -1 && selectedPhoto > 0) {
            setSelectedPhoto((prev) => prev - 1);
        }
    }
    function handleSelectedNoOfItems(val: number) {
        setSelectedNoOfItems(val);
    }

    return (
        <div className='text-white my-3'>
            <div className="sm:grid grid-cols-[40%_60%] gap-[3vw] place-items-start ml-1">
                <div>
                    <div className=" flex  items-center gap-1  h-[100%] w-[100%]">
                        <div>
                            <img src={product.itemPhotos[selectedPhoto]} alt="" className='w-[70%]' />
                        </div>
                        <div className='flex flex-col gap-[2px]'>
                            {
                                product.itemPhotos
                                    .filter((item, _index) => product.itemPhotos[_index] != product.itemPhotos[selectedPhoto])
                                    .map((item, index) => <button onClick={() => setSelectedPhoto(index)}><img src={item} key={index} className={`h-6`} /></button>)
                            }
                        </div>
                    </div>
                    <div className="w-full flex gap-2 justify-center">
                        {product.itemPhotos[1] && (
                            <i
                                className={`${selectedPhoto == 0 ? "fa-solid" : "fa-regular"
                                    } fa-circle-dot`}
                            ></i>
                        )}
                        {product.itemPhotos[1] && (
                            <i
                                className={`${selectedPhoto == 1 ? "fa-solid" : "fa-regular"
                                    } fa-circle-dot`}
                            ></i>
                        )}
                        {product.itemPhotos[2] && (
                            <i
                                className={`${selectedPhoto == 2 ? "fa-solid" : "fa-regular"
                                    } fa-circle-dot`}
                            ></i>
                        )}
                        {product.itemPhotos[3] && (
                            <i
                                className={`${selectedPhoto == 3 ? "fa-solid" : "fa-regular"
                                    } fa-circle-dot`}
                            ></i>
                        )}
                    </div>
                </div>
                <div id="product_details-div">
                    <p id="product-name">Product name</p>
                    <p className="m-0 ">
                        Product description will go here with a max of 30 words
                    </p>
                    {product && (
                        <div className="flex gap-[50%] w-full">
                            <p>{handleItemRating(product.rating, "")} </p>
                            <p>(100)</p>
                        </div>
                    )}
                    {product && <p id="product-price">$ {product.price}</p>}

                    <div className="dark:text-black flex items-center gap-5 bg-white w-fit px-3 rounded-2xl">
                        <button
                            className="text-[.9rem] bg-transparent"
                            onClick={() => handleSelectedNoOfItems(-1)}
                        >
                            -
                        </button>
                        <p>{selectedNoOfItems}</p>
                        <button
                            className="text-[.9rem] bg-transparent"
                            onClick={() => handleSelectedNoOfItems(1)}
                        >
                            +
                        </button>
                    </div>
                    <p id="remaining-items-p">
                        Only few(set number) remaining.Don't miss.
                    </p>
                    <div className="flex justify-around w-[90%] mt-[10%]">
                        <button
                            className="rounded-lg py-[1px] px-[20px]  bg-green-700 text-white"
                            onClick={handleBuyNow}
                        >
                            Buy Now
                        </button>
                    </div>
                    <div className="mt-5">
                        <p className="m-0">Free delivery</p>
                        <p className="m-0">
                            Return statement eg. money back garantee withing 10 days
                        </p>
                    </div>
                </div>
            </div>
            <div id="product_reviews-div" className='my-4'>{/* <h3>Product reviews</h3> */}</div>
            {
                relatedProducts && (
                    <div>
                        <h3>You may also like</h3>
                        <div className="flex gap-2 pb-2">
                            {relatedProducts.map((item) => {
                                return (
                                    <Link to={`/product/${item._id}`}
                                        key={Math.random()}
                                        className="relative rounded cursor-pointer text-black bg-lm-bg w-[18vw] pb-1"
                                    >
                                        <img
                                            className="w-[19vw] h-[19vw] rounded-tl rounded-tr"
                                            src={item.itemPhotos[0]}
                                        />
                                        <div className="flex justify-between my-1 mx-2">
                                            <p className="m-0">item x</p>
                                            <p className="m-0"> {item.price}/=</p>
                                        </div>
                                        <p className="my-1 mx-2 overflow-hidden truncate">
                                            {item.description}
                                        </p>
                                        {handleItemRating(item.rating, "text-[6px] sm:text-[10px]")}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Product