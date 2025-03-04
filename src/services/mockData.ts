import { Package, Category } from "../types/package.types";
import { Product } from "../types/product.types";
import { User } from "../types/auth.types";

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password123",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
  },
  {
    id: "3",
    name: "Sarah Ahmed",
    email: "sarah@example.com",
    password: "sarah456",
  },
];

// Mock Categories
export const categories: Category[] = [
  {
    id: "hajj",
    name: "Hajj Packages",
    description:
      "Complete Hajj packages with accommodation, transportation, and guidance.",
    benefits: [
      "Accommodations in Makkah and Madinah",
      "Experienced guides throughout the journey",
      "Transportation between all ritual sites",
      "Meals included",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1591800730812-b6aea2a71f4a?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "umrah",
    name: "Umrah Packages",
    description:
      "Flexible Umrah packages for a blessed journey any time of the year.",
    benefits: [
      "Year-round availability",
      "Customizable stays",
      "Hotel options for all budgets",
      "Guided support for rituals",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1537057151866-0d3f5b3aaab7?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: "family",
    name: "Family Packages",
    description:
      "Special arrangements for families traveling together for Hajj or Umrah.",
    benefits: [
      "Family-friendly accommodations",
      "Special rates for children",
      "Connected rooms available",
      "Family guides and support",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1617516202891-0cc5379c1b9c?q=80&w=2670&auto=format&fit=crop",
  },
];

// Mock Packages
export const packages: Package[] = [
  {
    id: "1",
    name: "Premium Hajj Package",
    description:
      "Our premium all-inclusive Hajj package offers 5-star accommodations in Makkah and Madinah with close proximity to the Haram. Includes transportation, meals, and expert guidance throughout your journey.",
    price: 7999,
    category: "hajj",
    imageUrl:
      "https://images.unsplash.com/photo-1537057151866-0d3f5b3aaab7?q=80&w=2670&auto=format&fit=crop",
    duration: 21,
    included: [
      "5-star hotel accommodations in Makkah and Madinah",
      "VIP transportation including luxury coaches",
      "All meals included (breakfast, lunch, dinner)",
      "Experienced English-speaking guides",
      "Visa processing and documentation assistance",
      "Medical support and insurance",
      "Ziyarat (visits to historical sites)",
    ],
    notIncluded: [
      "Airfare to and from Saudi Arabia",
      "Personal expenses and shopping",
      "Optional premium services",
      "Qurbani/Udhiya arrangements",
    ],
    featured: true,
    rating: 4.9,
    reviews: 127,
  },
  {
    id: "2",
    name: "Standard Hajj Package",
    description:
      "A comprehensive Hajj package that balances quality and affordability with comfortable accommodations and all necessary services for a fulfilling pilgrimage experience.",
    price: 5999,
    category: "hajj",
    imageUrl:
      "https://images.unsplash.com/photo-1542644481-1ebeca1d50bd?q=80&w=2670&auto=format&fit=crop",
    duration: 18,
    included: [
      "4-star hotel accommodations in Makkah and Madinah",
      "Air-conditioned transportation",
      "Three meals daily",
      "Multilingual guides",
      "Visa processing",
      "Basic health coverage",
      "Ziyarat of main historical sites",
    ],
    notIncluded: [
      "International airfare",
      "Personal expenses",
      "Extra services not mentioned in package",
      "Qurbani/Udhiya arrangements",
    ],
    featured: false,
    rating: 4.7,
    reviews: 93,
  },
  {
    id: "3",
    name: "Economy Hajj Package",
    description:
      "An affordable Hajj package providing all essential services needed for completing your pilgrimage comfortably within budget constraints.",
    price: 4599,
    category: "hajj",
    imageUrl:
      "https://images.unsplash.com/photo-1503146234394-631200675614?q=80&w=2670&auto=format&fit=crop",
    duration: 15,
    included: [
      "3-star hotel accommodations",
      "Shared transportation",
      "Three meals daily",
      "Group guidance in multiple languages",
      "Visa processing assistance",
      "Basic health support",
      "Essential Ziyarat",
    ],
    notIncluded: [
      "Flights to Saudi Arabia",
      "Personal expenses",
      "Optional services",
      "Qurbani/Udhiya",
    ],
    featured: false,
    rating: 4.5,
    reviews: 78,
  },
  {
    id: "4",
    name: "Premium Umrah Package",
    description:
      "A luxury Umrah experience with premium accommodations very close to the Haram, personalized service, and flexible scheduling.",
    price: 3299,
    category: "umrah",
    imageUrl:
      "https://images.unsplash.com/photo-1591800730812-b6aea2a71f4a?q=80&w=2670&auto=format&fit=crop",
    duration: 14,
    included: [
      "5-star hotel accommodations with Haram view options",
      "Private transportation",
      "All meals at premium restaurants",
      "24/7 personal guide services",
      "Express visa processing",
      "Comprehensive travel insurance",
      "Extended Ziyarat program",
    ],
    notIncluded: [
      "International flights",
      "Shopping expenses",
      "Phone calls and internet",
      "Services not specified",
    ],
    featured: true,
    rating: 4.8,
    reviews: 145,
  },
  {
    id: "5",
    name: "Standard Umrah Package",
    description:
      "A well-balanced Umrah package with quality accommodations, reliable services, and experienced guides to ensure a smooth pilgrimage.",
    price: 1999,
    category: "umrah",
    imageUrl:
      "https://images.unsplash.com/photo-1532258170929-e5c30dad3edc?q=80&w=2670&auto=format&fit=crop",
    duration: 10,
    included: [
      "4-star hotel accommodations within walking distance to Haram",
      "Shared transportation services",
      "Daily breakfast and dinner",
      "Group guidance",
      "Standard visa processing",
      "Basic travel insurance",
      "Main Ziyarat sites",
    ],
    notIncluded: [
      "International airfare",
      "Lunch meals",
      "Personal expenses",
      "Additional tours",
    ],
    featured: false,
    rating: 4.6,
    reviews: 89,
  },
  {
    id: "6",
    name: "Family Umrah Special",
    description:
      "Specially designed for families, this package offers connecting rooms, child-friendly services, and flexible scheduling to accommodate family needs.",
    price: 2599,
    category: "family",
    imageUrl:
      "https://images.unsplash.com/photo-1617516202891-0cc5379c1b9c?q=80&w=2670&auto=format&fit=crop",
    duration: 12,
    included: [
      "Family rooms or connected rooms in 4-star hotels",
      "Private family transportation",
      "All meals with child options",
      "Family-friendly guides",
      "Visa processing for all members",
      "Family travel insurance",
      "Child-appropriate Ziyarat explanations",
    ],
    notIncluded: [
      "International flights",
      "Personal shopping",
      "Special requests",
      "Additional excursions",
    ],
    featured: true,
    rating: 4.7,
    reviews: 120,
  },
  {
    id: "7",
    name: "Family Hajj Journey",
    description:
      "A comprehensive family Hajj package with special arrangements for children and elderly family members, with appropriate accommodations and support.",
    price: 6999,
    category: "family",
    imageUrl:
      "https://images.unsplash.com/photo-1597600159211-d6c104f408d1?q=80&w=2574&auto=format&fit=crop",
    duration: 20,
    included: [
      "Family suites in 4-star hotels",
      "Private family transportation during critical rites",
      "All meals with family dining options",
      "Specialized guides for families",
      "Priority visa processing",
      "Comprehensive family health coverage",
      "Family-focused educational programs",
    ],
    notIncluded: [
      "Airfare to Saudi Arabia",
      "Shopping and souvenirs",
      "Special services outside package",
      "Qurbani/Udhiya arrangements",
    ],
    featured: true,
    rating: 4.8,
    reviews: 86,
  },
];

// Mock Products
export const products: Product[] = [
  {
    id: "1",
    name: "Ihram Cloth Set",
    description:
      "High-quality white Ihram cloth set for men, comfortable and easy to wear during Hajj or Umrah.",
    originalPrice: 49.99,
    discountPercentage: 10,
    category: "Clothing",
    imageUrl:
      "https://images.unsplash.com/photo-1595459648327-42bd8126a7df?q=80&w=2574&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "2",
    name: "Prayer Mat - Premium",
    description:
      "Portable, lightweight prayer mat with compass, perfect for travel during your pilgrimage.",
    originalPrice: 35.99,
    discountPercentage: 5,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1584611722221-dc9fc8328760?q=80&w=2574&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "3",
    name: "Digital Quran Reader",
    description:
      "Compact digital Quran reader with translation in multiple languages and audio recitation.",
    originalPrice: 129.99,
    discountPercentage: 15,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1596631192137-c8c92ac905bf?q=80&w=2670&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "4",
    name: "Zamzam Water Bottle",
    description:
      "Special container designed for carrying Zamzam water back home safely.",
    originalPrice: 19.99,
    discountPercentage: 0,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1593201464149-284f60748989?q=80&w=2574&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "5",
    name: "Hajj & Umrah Guide Book",
    description:
      "Comprehensive guide with step-by-step instructions, prayers, and maps for pilgrims.",
    originalPrice: 24.99,
    discountPercentage: 8,
    category: "Books",
    imageUrl:
      "https://images.unsplash.com/photo-1595329054270-41bb077f1cb3?q=80&w=2574&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "6",
    name: "Travel Prayer Clock",
    description:
      "Automatic prayer time calculator that adjusts to your location with built-in compass.",
    originalPrice: 45.99,
    discountPercentage: 12,
    category: "Electronics",
    imageUrl:
      "https://images.unsplash.com/photo-1619891918601-a4b766034ddf?q=80&w=2574&auto=format&fit=crop",
    inStock: false,
  },
  {
    id: "7",
    name: "Islamic Prayer Beads",
    description:
      "Traditional prayer beads (Tasbih) made of aromatic wood with 99 beads for dhikr.",
    originalPrice: 15.99,
    discountPercentage: 0,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1584058559222-9738adac3055?q=80&w=2574&auto=format&fit=crop",
    inStock: true,
  },
  {
    id: "8",
    name: "Ladies Prayer Garment",
    description:
      "Elegant and comfortable prayer garment for women, includes hijab and full-length prayer dress.",
    originalPrice: 59.99,
    discountPercentage: 15,
    category: "Clothing",
    imageUrl:
      "https://images.unsplash.com/photo-1577306097422-a66ab28a6273?q=80&w=2574&auto=format&fit=crop",
    inStock: true,
  },
];
