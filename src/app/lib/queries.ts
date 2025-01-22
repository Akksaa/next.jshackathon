import { client } from "@/sanity/lib/client"

export const allProductsQuery = `*[ _type == "foodProduct"]{
    _id,
    name,
    slug,
    price,
    tags,
    inventory,
    ingredients[],
    nutritionalInfo,
    discountPrice,
    category,
    isDiscounted,
    images[] { asset-> { _id, url } },
    description,
    
}` 

export const oneProduct = `*[ _type == "foodProduct" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    price,
    tags,
    inventory,
    ingredients[],
    nutritionalInfo,
    discountPrice,
    category,
    isDiscounted,
    images[] { asset-> { _id, url } },
    description,
    
}`

export const menuProducts = async (category:string) => {
    
    const query = `*[ _type == "foodProduct" && category == "${category}"]{
        _id,
        name,
        slug,
        price,
        tags,
        inventory,
        ingredients[],
        nutritionalInfo,
        discountPrice,
        category,
        isDiscounted,
        images[] { asset-> { _id, url } },
        description,
        
    }`
    const products = await client.fetch(query);
    return products;
}
