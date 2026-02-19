import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, CartItem } from '../backend';

export function useGetProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      const products = await actor.getProducts();
      console.log('[useGetProducts] Fetched products:', products);
      return products;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      const products = await actor.getProductsByCategory(category);
      console.log(`[useGetProductsByCategory] Fetched products for category "${category}":`, products);
      return products;
    },
    enabled: !!actor && !isFetching && !!category,
  });
}

export function useViewCart() {
  const { actor, isFetching } = useActor();

  return useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.viewCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addToCart(productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useCheckout() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.checkout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useAddProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      description,
      price,
      imageUrl,
      category,
      stock,
    }: {
      name: string;
      description: string;
      price: bigint;
      imageUrl: string;
      category: string;
      stock: bigint;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addProduct(name, description, price, imageUrl, category, stock);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useInitializeDefaultProduct() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      console.log('[useInitializeDefaultProduct] Initializing default product (Glow man face wash)');
      return actor.initializeDefaultProduct();
    },
    onSuccess: () => {
      console.log('[useInitializeDefaultProduct] Default product initialized successfully');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}
