import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface CartItem {
    productId: bigint;
    quantity: bigint;
}
export interface backendInterface {
    addProduct(name: string, description: string, price: bigint, imageUrl: string, category: string): Promise<void>;
    addToCart(productId: bigint, quantity: bigint): Promise<void>;
    checkout(): Promise<void>;
    getProductImage(productId: bigint): Promise<string>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    viewCart(): Promise<Array<CartItem>>;
}
