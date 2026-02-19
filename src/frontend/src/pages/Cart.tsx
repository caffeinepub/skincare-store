import { useNavigate } from '@tanstack/react-router';
import { ShoppingBag } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import CartItem from '../components/CartItem';
import { useCart } from '../hooks/useCart';
import { Skeleton } from '../components/ui/skeleton';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, totalAmount, totalItems, isLoading } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-cream-50 py-8">
        <div className="container mx-auto px-4">
          <Skeleton className="mb-8 h-10 w-48" />
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-cream-50">
        <div className="text-center">
          <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-sage-300" />
          <h2 className="mb-2 text-2xl font-bold text-sage-900">Your cart is empty</h2>
          <p className="mb-6 text-sage-600">Add some products to get started!</p>
          <Button onClick={() => navigate({ to: '/' })}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-cream-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-sage-900">Shopping Cart</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => (
              <CartItem key={Number(item.productId)} item={item} />
            ))}
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-sage-600">Items ({totalItems})</span>
                  <span className="font-medium text-sage-900">₹{totalAmount.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-sage-600">Shipping</span>
                  <span className="font-medium text-sage-900">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-sage-900">Total</span>
                  <span className="text-terracotta-600">₹{totalAmount.toFixed(0)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate({ to: '/checkout' })}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate({ to: '/' })}
                >
                  Continue Shopping
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
