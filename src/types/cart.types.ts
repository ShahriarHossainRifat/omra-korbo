import { Package } from "./package.types";
import { Product } from "./product.types";

export interface CartPackageItem {
  package: Package;
  quantity: number;
}

export interface CartProductItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  packages: CartPackageItem[];
  products: CartProductItem[];
}
