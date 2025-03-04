import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Package } from "../types/package.types";
import { Product } from "../types/product.types";

// Define types for cart items directly here instead of importing
interface CartPackageItem {
  package: Package;
  quantity: number;
}

interface CartProductItem {
  product: Product;
  quantity: number;
}

interface Cart {
  packages: CartPackageItem[];
  products: CartProductItem[];
}

// Define Cart Context interface
interface CartContextType {
  cart: Cart;
  totalItems: number;
  addPackage: (pkg: Package, quantity: number) => void;
  removePackage: (id: string) => void;
  updatePackageQuantity: (id: string, quantity: number) => void;
  addProduct: (product: Product, quantity: number) => void;
  removeProduct: (id: string) => void;
  updateProductQuantity: (id: string, quantity: number) => void;
  getTotal: () => number;
  clearCart: () => void;
}

// Create context with default values
const CartContext = createContext<CartContextType>({
  cart: { packages: [], products: [] },
  totalItems: 0,
  addPackage: () => {},
  removePackage: () => {},
  updatePackageQuantity: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  updateProductQuantity: () => {},
  getTotal: () => 0,
  clearCart: () => {},
});

// Create provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Cart>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : { packages: [], products: [] };
  });

  // Calculate total items
  const totalItems =
    cart.packages.reduce((sum, item) => sum + item.quantity, 0) +
    cart.products.reduce((sum, item) => sum + item.quantity, 0);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addPackage = (pkg: Package, quantity: number) => {
    setCart((prev) => {
      const existingIndex = prev.packages.findIndex(
        (item) => item.package.id === pkg.id
      );

      if (existingIndex >= 0) {
        // Package already in cart, update quantity
        const updatedPackages = [...prev.packages];
        updatedPackages[existingIndex].quantity += quantity;
        return { ...prev, packages: updatedPackages };
      } else {
        // Add new package to cart
        return {
          ...prev,
          packages: [...prev.packages, { package: pkg, quantity }],
        };
      }
    });
  };

  const removePackage = (id: string) => {
    setCart((prev) => ({
      ...prev,
      packages: prev.packages.filter((item) => item.package.id !== id),
    }));
  };

  const updatePackageQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removePackage(id);
      return;
    }

    setCart((prev) => ({
      ...prev,
      packages: prev.packages.map((item) =>
        item.package.id === id ? { ...item, quantity } : item
      ),
    }));
  };

  const addProduct = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existingIndex = prev.products.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex >= 0) {
        // Product already in cart, update quantity
        const updatedProducts = [...prev.products];
        updatedProducts[existingIndex].quantity += quantity;
        return { ...prev, products: updatedProducts };
      } else {
        // Add new product to cart
        return {
          ...prev,
          products: [...prev.products, { product, quantity }],
        };
      }
    });
  };

  const removeProduct = (id: string) => {
    setCart((prev) => ({
      ...prev,
      products: prev.products.filter((item) => item.product.id !== id),
    }));
  };

  const updateProductQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(id);
      return;
    }

    setCart((prev) => ({
      ...prev,
      products: prev.products.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      ),
    }));
  };

  const getTotal = () => {
    const packageTotal = cart.packages.reduce((sum, item) => {
      return sum + item.package.price * item.quantity;
    }, 0);

    const productTotal = cart.products.reduce((sum, item) => {
      const discountedPrice =
        item.product.originalPrice *
        (1 - item.product.discountPercentage / 100);
      return sum + discountedPrice * item.quantity;
    }, 0);

    return packageTotal + productTotal;
  };

  const clearCart = () => {
    setCart({ packages: [], products: [] });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        addPackage,
        removePackage,
        updatePackageQuantity,
        addProduct,
        removeProduct,
        updateProductQuantity,
        getTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
