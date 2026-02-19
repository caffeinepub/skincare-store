import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../hooks/useCart';
import { SiInstagram, SiFacebook } from 'react-icons/si';

export default function Layout() {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-sage-200 bg-cream-50/95 backdrop-blur supports-[backdrop-filter]:bg-cream-50/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-sage-800 transition-colors hover:text-sage-600"
          >
            <Sparkles className="h-6 w-6" />
            <span className="text-xl font-semibold tracking-tight">Pure Glow</span>
          </button>

          <nav className="flex items-center gap-6">
            <Button
              variant={currentPath === '/' ? 'default' : 'ghost'}
              onClick={() => navigate({ to: '/' })}
              className="text-sm font-medium"
            >
              Shop
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate({ to: '/cart' })}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="default"
                  className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full px-1 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-sage-200 bg-sage-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-2 text-sage-800">
                <Sparkles className="h-5 w-5" />
                <span className="text-lg font-semibold">Pure Glow</span>
              </div>
              <p className="text-sm text-sage-600">
                Natural skincare for radiant, healthy skin. Crafted with care, powered by nature.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-sage-800">Quick Links</h3>
              <ul className="space-y-2 text-sm text-sage-600">
                <li>
                  <button onClick={() => navigate({ to: '/' })} className="hover:text-sage-800">
                    Shop All
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate({ to: '/cart' })} className="hover:text-sage-800">
                    Cart
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-sage-800">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-sage-600 transition-colors hover:text-sage-800"
                  aria-label="Instagram"
                >
                  <SiInstagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-sage-600 transition-colors hover:text-sage-800"
                  aria-label="Facebook"
                >
                  <SiFacebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-sage-200 pt-8 text-center text-sm text-sage-600">
            <p>
              © {new Date().getFullYear()} Pure Glow. Built with love using{' '}
              <a
                href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                  typeof window !== 'undefined' ? window.location.hostname : 'unknown-app'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-sage-700 hover:text-sage-900"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
