export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  duration: number;
  included: string[];
  notIncluded: string[];
  featured?: boolean;
  rating?: number; // Make sure these are defined
  reviews?: number; // as optional properties
}

export interface Category {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  imageUrl: string;
}
