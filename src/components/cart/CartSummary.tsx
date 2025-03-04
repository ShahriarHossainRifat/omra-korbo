import { useCart } from "../../context/CartContext";

const CartSummary = () => {
  const { cart, getTotal } = useCart();

  const subtotal = getTotal();
  const tax = subtotal * 0.05; // 5% tax rate
  const total = subtotal + tax;

  const packageCount = cart.packages.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const productCount = cart.products.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Packages ({packageCount})</dt>
          <dd className="text-sm font-medium text-gray-900">
            $
            {cart.packages
              .reduce(
                (sum, item) => sum + item.package.price * item.quantity,
                0
              )
              .toFixed(2)}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Products ({productCount})</dt>
          <dd className="text-sm font-medium text-gray-900">
            $
            {cart.products
              .reduce((sum, item) => {
                const discountedPrice =
                  item.product.originalPrice *
                  (1 - item.product.discountPercentage / 100);
                return sum + discountedPrice * item.quantity;
              }, 0)
              .toFixed(2)}
          </dd>
        </div>

        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="text-sm text-gray-600">Subtotal</dt>
          <dd className="text-sm font-medium text-gray-900">
            ${subtotal.toFixed(2)}
          </dd>
        </div>

        <div className="flex items-center justify-between">
          <dt className="text-sm text-gray-600">Tax (5%)</dt>
          <dd className="text-sm font-medium text-gray-900">
            ${tax.toFixed(2)}
          </dd>
        </div>

        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <dt className="text-base font-medium text-gray-900">Total</dt>
          <dd className="text-base font-medium text-gray-900">
            ${total.toFixed(2)}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <button
          type="button"
          className="w-full bg-green-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
