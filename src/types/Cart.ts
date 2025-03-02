export interface Cart {
    id: number;
    user_id: string;
    product_id: string;
    product_title: string;
    product_price: number;
    product_quantity: number;
    status: string;
    image_url: string;
}