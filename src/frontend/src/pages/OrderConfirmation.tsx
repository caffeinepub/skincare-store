import { useNavigate } from '@tanstack/react-router';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function OrderConfirmation() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-cream-50 py-8">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-2xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sage-100">
              <CheckCircle className="h-10 w-10 text-sage-600" />
            </div>
            <CardTitle className="text-3xl">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-sage-600">
              Thank you for your purchase! Your order has been successfully placed and will be
              processed shortly.
            </p>

            <div className="rounded-lg bg-sage-50 p-6">
              <h3 className="mb-2 font-semibold text-sage-900">What's Next?</h3>
              <ul className="space-y-2 text-sm text-sage-600">
                <li>You'll receive an email confirmation shortly</li>
                <li>We'll notify you when your order ships</li>
                <li>Track your order status in your account</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={() => navigate({ to: '/' })} size="lg">
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
