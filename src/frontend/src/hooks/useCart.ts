import { useMemo } from 'react';
import { useViewCart, useGetProducts } from './useQueries';
import type { Product } from '../backend';

export interface CartItemWithProduct {
  productId: bigint;
  quantity: bigint;
  product?: Product;
  subtotal: number;
}

export function useCart() {
  const { data: cartItems = [], isLoading: isCartLoading } = useViewCart();
  const { data: products = [], isLoading: isProductsLoading } = useGetProducts();

  const cartWithProducts = useMemo<CartItemWithProduct[]>(() => {
    return cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const subtotal = product ? Number(product.price) * Number(item.quantity) : 0;
      return {
        ...item,
        product,
        subtotal,
      };
    });
  }, [cartItems, products]);

  const totalAmount = useMemo(() => {
    return cartWithProducts.reduce((sum, item) => sum + item.subtotal, 0);
  }, [cartWithProducts]);

  const totalItems = useMemo(() => {
    return cartWithProducts.reduce((sum, item) => sum + Number(item.quantity), 0);
  }, [cartWithProducts]);

  return {
    cartItems: cartWithProducts,
    totalAmount,
    totalItems,
    isLoading: isCartLoading || isProductsLoading,
  };
}
