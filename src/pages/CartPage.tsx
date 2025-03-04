import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import LazyImage from "../components/common/LazyImage";

const CartPage = () => {
  const {
    cart,
    removeProduct,
    removePackage,
    updateProductQuantity,
    updatePackageQuantity,
    getTotal,
    clearCart,
  } = useCart();

  const [removingItem, setRemovingItem] = useState<string | null>(null);
  const [itemsLoaded, setItemsLoaded] = useState(false);

  const isEmpty = cart.products.length === 0 && cart.packages.length === 0;

  // Simulate loading delay for better animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setItemsLoaded(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveProduct = (id: string) => {
    setRemovingItem(`product-${id}`);
    setTimeout(() => {
      removeProduct(id);
      setRemovingItem(null);
    }, 300);
  };

  const handleRemovePackage = (id: string) => {
    setRemovingItem(`package-${id}`);
    setTimeout(() => {
      removePackage(id);
      setRemovingItem(null);
    }, 300);
  };

  if (isEmpty) {
    return (
      <div className="hero min-h-[60vh] bg-base-200 fade-in">
        <div className="hero-content text-center">
          <div className="max-w-md bounce-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 mx-auto text-base-content opacity-30 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="py-6">
              Start adding items to your cart to see them here.
            </p>
            <Link to="/packages/all" className="btn btn-primary mr-2">
              Browse Packages
            </Link>
            <Link to="/products" className="btn btn-outline">
              Shop Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 fade-in">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        Your Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 fade-in-up">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg">
              {cart.products.length + cart.packages.length}{" "}
              {cart.products.length + cart.packages.length === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </div>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => clearCart()}
            >
              Clear Cart
            </button>
          </div>

          <div className="card bg-base-100 shadow-xl overflow-x-auto">
            <div className="card-body p-0">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Products */}
                  {cart.products.map((item) => {
                    const discountedPrice =
                      item.product.originalPrice *
                      (1 - item.product.discountPercentage / 100);
                    const isRemoving =
                      removingItem === `product-${item.product.id}`;

                    return (
                      <tr
                        key={`product-${item.product.id}`}
                        className={`${itemsLoaded ? "scale-in" : "opacity-0"} ${
                          isRemoving ? "animate-fade-out" : ""
                        }`}
                        style={{
                          transformOrigin: "center",
                          animationDelay: "0.1s",
                        }}
                      >
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <LazyImage
                                  src={item.product.imageUrl}
                                  alt={item.product.name}
                                />
                              </div>
                            </div>
                            <div>
                              <Link
                                to={`/product/${item.product.id}`}
                                className="font-bold hover:text-primary transition-colors duration-200"
                              >
                                {item.product.name}
                              </Link>
                              <div className="badge badge-ghost">
                                {item.product.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col">
                            <span>${discountedPrice.toFixed(2)}</span>
                            {item.product.discountPercentage > 0 && (
                              <span className="text-xs line-through opacity-60">
                                ${item.product.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>
                          <select
                            className="select select-bordered select-sm w-20"
                            value={item.quantity}
                            onChange={(e) =>
                              updateProductQuantity(
                                item.product.id,
                                parseInt(e.target.value)
                              )
                            }
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="font-medium">
                          ${(discountedPrice * item.quantity).toFixed(2)}
                        </td>
                        <td>
                          <button
                            className="btn btn-ghost btn-sm btn-circle"
                            onClick={() => handleRemoveProduct(item.product.id)}
                            disabled={isRemoving}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {/* Packages */}
                  {cart.packages.map((item) => {
                    const isRemoving =
                      removingItem === `package-${item.package.id}`;

                    return (
                      <tr
                        key={`package-${item.package.id}`}
                        className={`${itemsLoaded ? "scale-in" : "opacity-0"} ${
                          isRemoving ? "animate-fade-out" : ""
                        }`}
                        style={{
                          transformOrigin: "center",
                          animationDelay: "0.2s",
                        }}
                      >
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <LazyImage
                                  src={
                                    item.package.imageUrl ||
                                    "https://placehold.co/100x100?text=Package"
                                  }
                                  alt={item.package.name}
                                />
                              </div>
                            </div>
                            <div>
                              <Link
                                to={`/package/${item.package.id}`}
                                className="font-bold hover:text-primary transition-colors duration-200"
                              >
                                {item.package.name}
                              </Link>
                              <div className="badge badge-ghost">
                                {item.package.category}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>${item.package.price.toFixed(2)}</td>
                        <td>
                          <select
                            className="select select-bordered select-sm w-20"
                            value={item.quantity}
                            onChange={(e) =>
                              updatePackageQuantity(
                                item.package.id,
                                parseInt(e.target.value)
                              )
                            }
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="font-medium">
                          ${(item.package.price * item.quantity).toFixed(2)}
                        </td>
                        <td>
                          <button
                            className="btn btn-ghost btn-sm btn-circle"
                            onClick={() => handleRemovePackage(item.package.id)}
                            disabled={isRemoving}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className="col-span-1 fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="card bg-base-100 shadow-xl sticky top-4">
            <div className="card-body">
              <h2 className="card-title text-xl">Order Summary</h2>
              <div className="divider my-1"></div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
              </div>
              <div className="divider my-1"></div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>

              <div className="card-actions flex-col mt-6 gap-3">
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    // In a real app, this would navigate to checkout
                    alert(
                      "Proceeding to checkout! In a real app, we'd navigate to the checkout page."
                    );
                  }}
                >
                  Proceed to Checkout
                </button>
                <Link to="/packages/all" className="btn btn-outline btn-block">
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Need help with your order?
                  <br />
                  Contact our support team at
                  <br />
                  <a
                    href="mailto:support@omrakorbo.com"
                    className="link link-primary"
                  >
                    support@omrakorbo.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
