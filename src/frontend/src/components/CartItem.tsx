import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import type { CartItemWithProduct } from '../hooks/useCart';
import { getProductImageUrl } from '../utils/imageHelpers';
import { useAddToCart } from '../hooks/useQueries';
import { toast } from 'sonner';

interface CartItemProps {
  item: CartItemWithProduct;
}

export default function CartItem({ item }: CartItemProps) {
  const addToCart = useAddToCart();

  if (!item.product) {
    return null;
  }

  const handleUpdateQuantity = (newQuantity: bigint) => {
    if (newQuantity < BigInt(1)) return;

    addToCart.mutate(
      { productId: item.productId, quantity: newQuantity },
      {
        onError: () => {
          toast.error('Failed to update quantity', {
            description: 'Please try again.',
          });
        },
      }
    );
  };

  const handleRemove = () => {
    addToCart.mutate(
      { productId: item.productId, quantity: BigInt(0) },
      {
        onSuccess: () => {
          toast.success('Item removed from cart');
        },
        onError: () => {
          toast.error('Failed to remove item', {
            description: 'Please try again.',
          });
        },
      }
    );
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-sage-50">
            <img
              src={getProductImageUrl(item.product.category, item.productId)}
              alt={item.product.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="font-semibold text-sage-900">{item.product.name}</h3>
              <p className="text-sm text-sage-600">{item.product.category}</p>
              <p className="mt-1 font-semibold text-terracotta-600">
                ${Number(item.product.price).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleUpdateQuantity(item.quantity - BigInt(1))}
                  disabled={addToCart.isPending || item.quantity <= BigInt(1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{Number(item.quantity)}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleUpdateQuantity(item.quantity + BigInt(1))}
                  disabled={addToCart.isPending}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-semibold text-sage-900">${item.subtotal.toFixed(2)}</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={handleRemove}
                  disabled={addToCart.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
