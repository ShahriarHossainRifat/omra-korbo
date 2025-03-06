import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaCheckCircle,
  FaMapMarkedAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const guides = [
  {
    id: 1,
    title: "Complete Umrah Guide",
    icon: <FaBookOpen className="text-amber-500 text-3xl" />,
    description:
      "Step-by-step instructions for performing Umrah rituals correctly.",
    link: "/guides/umrah",
  },
  {
    id: 2,
    title: "Pre-Travel Checklist",
    icon: <FaCheckCircle className="text-amber-500 text-3xl" />,
    description:
      "Essential items to pack and preparations to make before your journey.",
    link: "/guides/checklist",
  },
  {
    id: 3,
    title: "Sacred Sites Map",
    icon: <FaMapMarkedAlt className="text-amber-500 text-3xl" />,
    description:
      "Interactive maps of Makkah and Madinah with important landmarks.",
    link: "/guides/maps",
  },
  {
    id: 4,
    title: "Best Times for Umrah",
    icon: <FaCalendarAlt className="text-amber-500 text-3xl" />,
    description:
      "Recommended seasons and months for a more comfortable experience.",
    link: "/guides/seasons",
  },
];

const UmrahGuides = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800"
          >
            Umrah Resources & Guides
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
            Prepare for your spiritual journey with our comprehensive guides and
            resources
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide, index) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-teal-50 to-emerald-50 p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="mb-4">{guide.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {guide.title}
              </h3>
              <p className="text-gray-600 mb-4">{guide.description}</p>
              <Link
                to={guide.link}
                className="text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                Read more →
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/guides"
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg inline-block transition font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            View All Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UmrahGuides;
