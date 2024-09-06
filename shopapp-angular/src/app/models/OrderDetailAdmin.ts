import { Product } from "./product";
import { Order } from './order'
export interface OrderDetailAdmin {
    id: number;
    order_id: number;
    product_id: number;
    product_name: string;
    price: number;
    number_of_products: number;
    total_money: number;
    color?: string; // Dấu "?" cho biết thuộc tính này là tùy chọn
}