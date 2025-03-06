import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";

const CartToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastItem, setLastItem] = useState<{
    name: string;
    quantity: number;
  } | null>(null);
  const { items } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    // If items change and we have at least one item
    if (items.length > 0) {
      const currentItem = items[items.length - 1];
      setLastItem({
        name: currentItem.name,
        quantity: currentItem.quantity,
      });
      setIsVisible(true);

      // Hide toast after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [items]);

  return (
    <AnimatePresence>
      {isVisible && lastItem && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white py-3 px-4 rounded-full shadow-lg z-50 flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <FaCheck />
          </div>
          <div>
            <div className="font-medium">
              {lastItem.name}
              {lastItem.quantity > 1 && <span> (x{lastItem.quantity})</span>}
            </div>
            <div className="text-green-600 text-sm">
              Successfully added to cart
            </div>
          </div>
          <div className="ml-2 bg-gray-100 text-gray-500 px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <HiOutlineShoppingBag />
            <span>{items.length} items</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartToast;
