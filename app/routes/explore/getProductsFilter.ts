const getProductsFilter = (url:string) => {
    const params = new URL(url).searchParams
    let paramsObj: { [key: string]: string } = {};
    params.forEach((value: string, key: string) => {
        if (key && value != '') paramsObj[key] = value;
    });

    function getSortObj(){
        if (paramsObj.sort == "ascendingPrice") {
            return {price:1}   
        }
        else if (paramsObj.sort == "descendingPrice") {
            return {price:1} 
        }
        else if (paramsObj.sort == "rating") {
            return {rating:-1}  
        }
        else {
            return null
        }
    }

    function getSearchFilterArr() {
        if (paramsObj.search){
            const queryRegExp = new RegExp(paramsObj.search, "gim")
            return  [{ title: queryRegExp }, { description: queryRegExp }]
         }
         else{
            return null
         }
    }

    //@ts-ignore
    const sortObj: null | {price?:number,rating:number} = getSortObj() 
    const categoryObj = paramsObj.category ? {category:paramsObj.category} : {}
    const searchObj = getSearchFilterArr() ? {$or: getSearchFilterArr() } : {}

    return (
        {
            filter:{$and:[categoryObj,searchObj]},
            sort:sortObj
        })
    
}

export default getProductsFilter