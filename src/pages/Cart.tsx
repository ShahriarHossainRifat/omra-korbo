import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa";
import { RootState } from "../store/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../store/slices/cartSlice";
import { Helmet } from "react-helmet-async";

const Cart = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  return (
    <>
      <Helmet>
        <title>Your Cart | Omra Korbo</title>
      </Helmet>

      <div className="bg-gray-50 py-8 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
            <p className="text-gray-600">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              cart
            </p>
          </div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md p-8 text-center"
            >
              <img
                src="https://illustrations.popsy.co/amber/shopping-cart.svg"
                alt="Empty Cart"
                className="w-48 h-48 mx-auto mb-6"
              />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                to="/packages"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg inline-block transition font-semibold"
              >
                Browse Packages
              </Link>
            </motion.div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-2/3"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-800">
                        Cart Items
                      </h2>
                      <button
                        onClick={handleClearCart}
                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                      >
                        <FaTrash size={14} />
                        Clear Cart
                      </button>
                    </div>
                  </div>

                  <div className="divide-y">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-6 flex flex-col sm:flex-row gap-4"
                      >
                        <div className="w-24 h-24 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-gray-800">
                              {item.name}
                            </h3>
                            <div className="text-right">
                              {item.discountedPrice ? (
                                <>
                                  <div className="text-teal-700 font-bold">
                                    ${item.discountedPrice}
                                  </div>
                                  <div className="text-gray-400 line-through text-sm">
                                    ${item.price}
                                  </div>
                                </>
                              ) : (
                                <div className="text-teal-700 font-bold">
                                  ${item.price}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="text-sm text-gray-600 capitalize mb-4">
                            {item.type}
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity - 1
                                  )
                                }
                                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                              >
                                <FaMinus size={12} />
                              </button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleQuantityChange(
                                    item.id,
                                    item.quantity + 1
                                  )
                                }
                                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                              >
                                <FaPlus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to="/"
                    className="text-teal-600 hover:text-teal-700 flex items-center gap-2"
                  >
                    <FaArrowLeft size={14} />
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:w-1/3"
              >
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">
                        ${(total * 0.05).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-teal-700">
                          ${(total + total * 0.05).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition">
                    Proceed to Checkout
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
