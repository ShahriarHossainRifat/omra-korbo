import { Package } from "../../types/package.types";
import { Product } from "../../types/product.types";
import { useCart } from "../../context/CartContext";

interface CartItemProps {
  type: "package" | "product";
  item: Package | Product;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ type, item, quantity }) => {
  const {
    updatePackageQuantity,
    updateProductQuantity,
    removePackage,
    removeProduct,
  } = useCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (type === "package") {
      updatePackageQuantity(item.id, newQuantity);
    } else {
      updateProductQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    if (type === "package") {
      removePackage(item.id);
    } else {
      removeProduct(item.id);
    }
  };

  const getItemPrice = () => {
    if (type === "package") {
      return (item as Package).price;
    } else {
      const product = item as Product;
      return product.originalPrice * (1 - product.discountPercentage / 100);
    }
  };

  return (
    <div className="py-6 border-b border-gray-200 flex">
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md">
        <img
          src={item.imageUrl || "https://placehold.co/600x400"}
          alt={
            type === "package" ? (item as Package).name : (item as Product).name
          }
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              {type === "package"
                ? (item as Package).name
                : (item as Product).name}
            </h3>
            <p className="ml-4">${(getItemPrice() * quantity).toFixed(2)}</p>
          </div>
          {type === "product" && (item as Product).discountPercentage > 0 && (
            <p className="mt-1 text-sm text-gray-500">
              {(item as Product).discountPercentage}% off
            </p>
          )}
        </div>

        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center">
            <label
              htmlFor={`quantity-${item.id}`}
              className="mr-2 text-gray-500"
            >
              Qty
            </label>
            <select
              id={`quantity-${item.id}`}
              name={`quantity-${item.id}`}
              value={quantity}
              onChange={handleQuantityChange}
              className="select select-bordered select-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={handleRemove}
              className="btn btn-ghost btn-sm"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
