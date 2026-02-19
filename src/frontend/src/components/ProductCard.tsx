import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import type { Product } from '../backend';
import { getProductImageUrl } from '../utils/imageHelpers';
import { useAddToCart } from '../hooks/useQueries';
import { toast } from 'sonner';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useAddToCart();
  const [imageError, setImageError] = useState(false);
  
  const imageUrl = getProductImageUrl(product.category, product.id, product.name);
  
  console.log('[ProductCard] Rendering product:', {
    id: Number(product.id),
    name: product.name,
    category: product.category,
    imageUrl,
    price: Number(product.price)
  });

  const handleAddToCart = () => {
    addToCart.mutate(
      { productId: product.id, quantity: BigInt(1) },
      {
        onSuccess: () => {
          toast.success('Added to cart!', {
            description: `${product.name} has been added to your cart.`,
          });
        },
        onError: () => {
          toast.error('Failed to add to cart', {
            description: 'Please try again.',
          });
        },
      }
    );
  };

  const handleImageError = () => {
    console.error('[ProductCard] Image failed to load:', imageUrl);
    setImageError(true);
  };

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg" data-product-id={Number(product.id)} data-product-name={product.name}>
      <div className="relative aspect-square overflow-hidden bg-sage-50">
        <img
          src={imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
        />
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-sage-100 text-sage-600">
            <span className="text-sm">Image not available</span>
          </div>
        )}
        <Badge className="absolute right-3 top-3 bg-cream-50 text-sage-800">
          {product.category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold text-sage-900">{product.name}</h3>
        <p className="mb-3 line-clamp-2 text-sm text-sage-600">{product.description}</p>
        <p className="text-xl font-bold text-terracotta-600">₹{Number(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={addToCart.isPending}
          className="w-full"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {addToCart.isPending ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
