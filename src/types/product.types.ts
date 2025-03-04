export interface Product {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountPercentage: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
}
