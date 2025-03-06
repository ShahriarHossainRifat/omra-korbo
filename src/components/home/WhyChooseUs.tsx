import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaMosque,
  FaUserFriends,
  FaMoneyBillWave,
  FaHeadset,
  FaPrayingHands,
} from "react-icons/fa";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <FaShieldAlt className="text-4xl text-amber-500" />,
    title: "Safe & Secure",
    description:
      "Your safety is our top priority, with trusted accommodations and transportation.",
  },
  {
    icon: <FaMosque className="text-4xl text-amber-500" />,
    title: "Close to Haram",
    description:
      "We prioritize accommodations within walking distance to the holy sites.",
  },
  {
    icon: <FaUserFriends className="text-4xl text-amber-500" />,
    title: "Experienced Guides",
    description:
      "Our multilingual guides have deep knowledge of rituals and sacred sites.",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-amber-500" />,
    title: "Competitive Pricing",
    description:
      "Quality services at affordable rates with transparent pricing.",
  },
  {
    icon: <FaHeadset className="text-4xl text-amber-500" />,
    title: "24/7 Support",
    description:
      "Our support team is available around the clock to assist you.",
  },
  {
    icon: <FaPrayingHands className="text-4xl text-amber-500" />,
    title: "Spiritual Experience",
    description:
      "We focus on creating a meaningful and spiritually enriching journey.",
  },
];

const WhyChooseUs = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800"
          >
            Why Choose Omra Korbo
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-teal-600 mx-auto mt-2"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 mt-4 max-w-2xl mx-auto"
          >
            With over 15 years of experience in Umrah services, we're committed
            to making your spiritual journey comfortable, memorable, and
            hassle-free
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-100 transform hover:-translate-y-1"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
