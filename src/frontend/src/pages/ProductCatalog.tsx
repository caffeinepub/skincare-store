import { useState, useEffect } from 'react';
import { useGetProducts, useGetProductsByCategory, useAddProduct, useInitializeDefaultProduct } from '../hooks/useQueries';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import HeroBanner from '../components/HeroBanner';
import { Skeleton } from '../components/ui/skeleton';

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isInitialized, setIsInitialized] = useState(false);
  const { data: allProducts = [], isLoading: isLoadingAll } = useGetProducts();
  const { data: categoryProducts = [], isLoading: isLoadingCategory } = useGetProductsByCategory(
    selectedCategory === 'all' ? '' : selectedCategory
  );
  const addProduct = useAddProduct();
  const initializeDefaultProduct = useInitializeDefaultProduct();

  const products = selectedCategory === 'all' ? allProducts : categoryProducts;
  const isLoading = selectedCategory === 'all' ? isLoadingAll : isLoadingCategory;

  console.log('[ProductCatalog] Current state:', {
    selectedCategory,
    productsCount: products.length,
    isLoading,
    isInitialized,
    products: products.map(p => ({ id: Number(p.id), name: p.name, category: p.category }))
  });

  // Initialize default product and sample products if none exist
  useEffect(() => {
    if (!isLoadingAll && !isInitialized) {
      console.log('[ProductCatalog] Checking if initialization needed. Products count:', allProducts.length);
      
      // First, ensure the default "Glow man face wash" product exists
      initializeDefaultProduct.mutate(undefined, {
        onSuccess: () => {
          console.log('[ProductCatalog] Default product initialization completed');
          
          // Then add sample products if catalog is still empty
          if (allProducts.length === 0) {
            console.log('[ProductCatalog] Adding sample products');
            const sampleProducts = [
              {
                name: 'Gentle Foaming Cleanser',
                description: 'A mild, pH-balanced cleanser that removes impurities while maintaining skin\'s natural moisture barrier.',
                price: BigInt(2499),
                imageUrl: '/assets/generated/cleanser-product.dim_400x400.png',
                category: 'cleanser',
                stock: BigInt(100),
              },
              {
                name: 'Hydrating Daily Moisturizer',
                description: 'Lightweight yet deeply nourishing moisturizer with hyaluronic acid and natural botanicals.',
                price: BigInt(3499),
                imageUrl: '/assets/generated/moisturizer-product.dim_400x400.png',
                category: 'moisturizer',
                stock: BigInt(100),
              },
              {
                name: 'Vitamin C Brightening Serum',
                description: 'Potent antioxidant serum that brightens skin tone and reduces the appearance of dark spots.',
                price: BigInt(4999),
                imageUrl: '/assets/generated/serum-product.dim_400x400.png',
                category: 'serum',
                stock: BigInt(100),
              },
              {
                name: 'Purifying Clay Mask',
                description: 'Deep-cleansing mask with natural clay and botanical extracts to detoxify and refine pores.',
                price: BigInt(2999),
                imageUrl: '/assets/generated/mask-product.dim_400x400.png',
                category: 'mask',
                stock: BigInt(100),
              },
              {
                name: 'Nourishing Night Cream',
                description: 'Rich, restorative night cream that works while you sleep to repair and rejuvenate skin.',
                price: BigInt(4299),
                imageUrl: '/assets/generated/moisturizer-product.dim_400x400.png',
                category: 'moisturizer',
                stock: BigInt(100),
              },
              {
                name: 'Exfoliating Gel Cleanser',
                description: 'Gentle exfoliating cleanser with natural fruit enzymes for smooth, radiant skin.',
                price: BigInt(2799),
                imageUrl: '/assets/generated/cleanser-product.dim_400x400.png',
                category: 'cleanser',
                stock: BigInt(100),
              },
            ];

            sampleProducts.forEach((product) => {
              addProduct.mutate(product);
            });
          }
          
          setIsInitialized(true);
        },
        onError: (error) => {
          console.error('[ProductCatalog] Failed to initialize default product:', error);
          setIsInitialized(true); // Mark as initialized even on error to prevent infinite loop
        }
      });
    }
  }, [isLoadingAll, allProducts.length, isInitialized, initializeDefaultProduct, addProduct]);

  return (
    <div className="bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <HeroBanner />

        <div id="products-section" className="mt-12 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-sage-900">Our Collection</h2>
              <p className="mt-1 text-sage-600">Discover products tailored to your skin's needs</p>
            </div>
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-square w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sage-600">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={Number(product.id)} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
