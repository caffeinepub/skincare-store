import { getHeroBannerUrl } from '../utils/imageHelpers';
import { Button } from './ui/button';

export default function HeroBanner() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-2xl">
      <img
        src={getHeroBannerUrl()}
        alt="Natural skincare products"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-sage-900/70 to-sage-900/30" />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Natural Beauty, Naturally Yours
            </h1>
            <p className="text-lg text-cream-100">
              Discover our curated collection of premium skincare products, crafted with natural
              ingredients for radiant, healthy skin.
            </p>
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="bg-cream-50 text-sage-900 hover:bg-cream-100"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
