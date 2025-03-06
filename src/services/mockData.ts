export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  featured: boolean;
  limitedOffer?: boolean;
  discount?: number;
  amenities: string[];
  rating: number;
  reviews: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  discount?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export const packages: Package[] = [
  {
    id: "1",
    name: "Economy Umrah Package",
    description:
      "Affordable Umrah package with comfortable accommodations and guided tours.",
    price: 1200,
    duration: "14 days",
    image: "https://images.unsplash.com/photo-1575101261474-5cb5653bb416",
    featured: true,
    limitedOffer: true,
    discount: 15,
    amenities: ["Hotel", "Flights", "Visa", "Transport", "Guide"],
    rating: 4.3,
    reviews: 128,
  },
  {
    id: "2",
    name: "Premium Umrah Package",
    description:
      "Experience luxury with premium hotels near Haram and personalized service.",
    price: 2500,
    duration: "14 days",
    image: "https://images.unsplash.com/photo-1550613787-7612bf93bffc",
    featured: true,
    amenities: [
      "5-Star Hotel",
      "Business Class Flights",
      "VIP Visa",
      "Private Transport",
      "Guide",
    ],
    rating: 4.8,
    reviews: 95,
  },
  {
    id: "3",
    name: "Family Umrah Package",
    description:
      "Special family package with spacious accommodations and child-friendly services.",
    price: 4500,
    duration: "14 days",
    image: "https://images.unsplash.com/photo-1620119853629-0753fc9d7dca",
    featured: true,
    limitedOffer: true,
    discount: 10,
    amenities: [
      "Family Rooms",
      "Flights",
      "Visa",
      "Transport",
      "Guide",
      "Kids Activities",
    ],
    rating: 4.5,
    reviews: 76,
  },
  {
    id: "4",
    name: "Ramadan Umrah Package",
    description:
      "Special Ramadan package to experience the holy month in Makkah and Madinah.",
    price: 3000,
    duration: "21 days",
    image: "https://images.unsplash.com/photo-1571909552531-1601eaec8f79",
    featured: true,
    limitedOffer: true,
    discount: 20,
    amenities: [
      "Hotel",
      "Flights",
      "Visa",
      "Transport",
      "Iftar & Suhoor",
      "Guide",
    ],
    rating: 4.9,
    reviews: 210,
  },
  {
    id: "5",
    name: "Express Umrah Package",
    description:
      "Short duration package perfect for busy professionals with limited time.",
    price: 900,
    duration: "7 days",
    image: "https://images.unsplash.com/photo-1633174754673-95dd2842f8fc",
    featured: false,
    amenities: ["Hotel", "Flights", "Visa", "Transport", "Express Service"],
    rating: 4.2,
    reviews: 45,
  },
  {
    id: "6",
    name: "Deluxe Umrah Package",
    description:
      "All-inclusive deluxe package with the best accommodations and services available.",
    price: 5000,
    duration: "14 days",
    image: "https://images.unsplash.com/photo-1625236466493-72842ceec47b",
    featured: false,
    amenities: [
      "Luxury Hotel",
      "First Class Flights",
      "VIP Visa",
      "Luxury Transport",
      "Personal Guide",
    ],
    rating: 4.9,
    reviews: 63,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Prayer Mat",
    description: "High-quality padded prayer mat with intricate designs.",
    price: 49.99,
    discountedPrice: 39.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1602797992680-57a4964033e9",
    category: "Prayer Essentials",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "2",
    name: "Digital Quran Reader",
    description:
      "Modern digital Quran reader with multiple translations and audio recitation.",
    price: 199.99,
    discountedPrice: 159.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675",
    category: "Electronics",
    rating: 4.8,
    reviews: 92,
  },
  {
    id: "3",
    name: "Ihram Clothing Set",
    description:
      "Comfortable Ihram clothing set made from high-quality cotton.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1522142141546-d4b88675b6e5",
    category: "Clothing",
    rating: 4.5,
    reviews: 78,
  },
  {
    id: "4",
    name: "Luxury Tasbih Beads",
    description: "Handcrafted wooden tasbih beads with elegant design.",
    price: 24.99,
    discountedPrice: 19.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1523251850644-39e28406e17f",
    category: "Prayer Essentials",
    rating: 4.6,
    reviews: 112,
  },
  {
    id: "5",
    name: "Zam Zam Water Bottle",
    description:
      "Special container designed to safely transport Zam Zam water.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1558169550-45825435a09b",
    category: "Accessories",
    rating: 4.4,
    reviews: 65,
  },
  {
    id: "6",
    name: "Travel Neck Pillow",
    description: "Memory foam neck pillow for comfortable travel.",
    price: 19.99,
    discountedPrice: 14.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1530789253388-582c481c54b0",
    category: "Travel",
    rating: 4.3,
    reviews: 87,
  },
  {
    id: "7",
    name: "Islamic Calendar 2025",
    description:
      "Beautiful Islamic calendar with prayer times and important dates.",
    price: 14.99,
    discountedPrice: 11.99,
    discount: 20,
    image: "https://images.unsplash.com/photo-1435527173128-983b87201f4d",
    category: "Accessories",
    rating: 4.2,
    reviews: 42,
  },
  {
    id: "8",
    name: "Travel Prayer Compass",
    description: "Compact and accurate qibla compass for travelers.",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1518065896235-a4c93e088e7a",
    category: "Travel",
    rating: 4.1,
    reviews: 53,
  },
];

// Simulating API calls
export const fetchFeaturedPackages = (): Promise<Package[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(packages.filter((pkg) => pkg.featured));
    }, 500);
  });
};

export const fetchAllPackages = (): Promise<Package[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(packages);
    }, 500);
  });
};

export const fetchLimitedOffers = (): Promise<Package[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(packages.filter((pkg) => pkg.limitedOffer));
    }, 500);
  });
};

export const fetchAllProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const fetchDiscountedProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter((product) => product.discount));
    }, 500);
  });
};
