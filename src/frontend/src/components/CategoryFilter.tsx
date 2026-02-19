import { Button } from './ui/button';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'cleanser', label: 'Cleansers' },
  { value: 'moisturizer', label: 'Moisturizers' },
  { value: 'serum', label: 'Serums' },
  { value: 'mask', label: 'Masks' },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selectedCategory === category.value ? 'default' : 'outline'}
          onClick={() => onCategoryChange(category.value)}
          className="rounded-full"
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
