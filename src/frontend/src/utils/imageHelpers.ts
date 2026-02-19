export function getProductImageUrl(category: string, productId?: bigint): string {
  const categoryMap: Record<string, string> = {
    cleanser: '/assets/generated/cleanser-product.dim_400x400.png',
    moisturizer: '/assets/generated/moisturizer-product.dim_400x400.png',
    serum: '/assets/generated/serum-product.dim_400x400.png',
    mask: '/assets/generated/mask-product.dim_400x400.png',
  };

  const normalizedCategory = category.toLowerCase();
  return categoryMap[normalizedCategory] || '/assets/generated/cleanser-product.dim_400x400.png';
}

export function getHeroBannerUrl(): string {
  return '/assets/generated/hero-banner.dim_1200x400.png';
}
