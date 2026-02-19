export function getProductImageUrl(category: string, productId?: bigint, productName?: string): string {
  // Check for specific product: Glow man face wash
  if (productId === BigInt(1) || productName === 'Glow man face wash') {
    console.log('[getProductImageUrl] Matched Glow man face wash, returning dedicated image');
    return '/assets/generated/glow-man-facewash.dim_800x800.png';
  }

  const categoryMap: Record<string, string> = {
    cleanser: '/assets/generated/cleanser-product.dim_400x400.png',
    moisturizer: '/assets/generated/moisturizer-product.dim_400x400.png',
    serum: '/assets/generated/serum-product.dim_400x400.png',
    mask: '/assets/generated/mask-product.dim_400x400.png',
  };

  const normalizedCategory = category.toLowerCase();
  const imageUrl = categoryMap[normalizedCategory] || '/assets/generated/cleanser-product.dim_400x400.png';
  
  console.log('[getProductImageUrl] Product image mapping:', {
    productId: productId ? Number(productId) : 'N/A',
    productName: productName || 'N/A',
    category,
    normalizedCategory,
    imageUrl
  });
  
  return imageUrl;
}

export function getHeroBannerUrl(): string {
  return '/assets/generated/hero-banner.dim_1200x400.png';
}
