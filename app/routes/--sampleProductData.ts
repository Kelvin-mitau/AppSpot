interface product{
    _id:string,
    title:string,
    productURL:string,
    documentationURL:string,
    screenshots:string[],
    pricingModel: "oneTime" | "freemium" | "subscription",
    customerReviews:{review:string,rating:number}[],
    features:string[],
    category:string,
    description:string,
    price:number

}
const products:product[] = [
    {
    _id:"1",
    title:"Product xx",
    productURL:"https://productxx",
    documentationURL:"https://productxx/docs",
    screenshots:["/logo.png","/random.png"],
    pricingModel:"oneTime",
    customerReviews:[{review:"Nice product, like it",rating:4},{review:"It's super fast",rating:3}],
    features:["Handle multiple requests simulateneously","Supports websockets out of box"],
    category:"crm",
    description:"RESTful API for easy linking of front-end and back-end.",
    price:400
    },
     {
    _id:"2",
    title:"Product xy",
    productURL:"https://productxx",
    documentationURL:"https://productxx/docs",
    screenshots:["/random.png","/logo.png","/random.png"],
    pricingModel:"subscription",
    customerReviews:[{review:"Nice product, like it",rating:3},{review:"It's super fast",rating:3}],
    features:["Handle multiple requests simulateneously","Supports websockets out of box"],
    category:"crm",
    description:"RESTful API for easy linking of front-end and back-end.",
    price:500
    }
]


export  {products}