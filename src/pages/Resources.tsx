import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaCheckCircle,
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaPrayingHands,
  FaLanguage,
  FaClinicMedical,
  FaShoppingBag,
  FaPlane,
  FaLandmark,
} from "react-icons/fa";

const guides = [
  {
    id: 1,
    title: "Complete Umrah Guide",
    icon: <FaBookOpen className="text-amber-500 text-3xl" />,
    description:
      "Step-by-step instructions for performing Umrah rituals correctly with detailed explanations of each step and its significance.",
    link: "/guides/umrah",
    featured: true,
  },
  {
    id: 2,
    title: "Pre-Travel Checklist",
    icon: <FaCheckCircle className="text-amber-500 text-3xl" />,
    description:
      "Essential items to pack and preparations to make before your journey to ensure a smooth and worry-free pilgrimage experience.",
    link: "/guides/checklist",
    featured: true,
  },
  {
    id: 3,
    title: "Sacred Sites Map",
    icon: <FaMapMarkedAlt className="text-amber-500 text-3xl" />,
    description:
      "Interactive maps of Makkah and Madinah with important landmarks, prayer locations, and historical sites to visit.",
    link: "/guides/maps",
    featured: true,
  },
  {
    id: 4,
    title: "Best Times for Umrah",
    icon: <FaCalendarAlt className="text-amber-500 text-3xl" />,
    description:
      "Recommended seasons and months for a more comfortable experience, with insights on crowd levels and weather conditions.",
    link: "/guides/seasons",
    featured: true,
  },
  {
    id: 5,
    title: "Umrah Prayers & Supplications",
    icon: <FaPrayingHands className="text-amber-500 text-3xl" />,
    description:
      "Collection of essential duas and prayers for each stage of your Umrah journey, with Arabic text, transliteration, and translations.",
    link: "/guides/prayers",
  },
  {
    id: 6,
    title: "Arabic Phrase Guide",
    icon: <FaLanguage className="text-amber-500 text-3xl" />,
    description:
      "Common Arabic phrases and expressions that will be useful during your stay in Saudi Arabia, with pronunciation guides.",
    link: "/guides/arabic",
  },
  {
    id: 7,
    title: "Health Tips for Pilgrims",
    icon: <FaClinicMedical className="text-amber-500 text-3xl" />,
    description:
      "Advice on staying healthy during your pilgrimage, including hydration, sun protection, and managing common health issues.",
    link: "/guides/health",
  },
  {
    id: 8,
    title: "Shopping Guide",
    icon: <FaShoppingBag className="text-amber-500 text-3xl" />,
    description:
      "Tips on where to shop, what to buy, and how to get the best deals on souvenirs and gifts in Makkah and Madinah.",
    link: "/guides/shopping",
  },
  {
    id: 9,
    title: "Transportation in Saudi Arabia",
    icon: <FaPlane className="text-amber-500 text-3xl" />,
    description:
      "Information on getting around Saudi Arabia, including airport transfers, taxis, buses, and travel between holy sites.",
    link: "/guides/transportation",
  },
  {
    id: 10,
    title: "Historical Sites Guide",
    icon: <FaLandmark className="text-amber-500 text-3xl" />,
    description:
      "Explore the rich Islamic history through detailed guides to historical sites and landmarks in Makkah and Madinah.",
    link: "/guides/historical-sites",
  },
];

interface Guide {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  featured?: boolean;
}

interface ResourceCardProps {
  guide: Guide;
  featured?: boolean;
}

const ResourceCard = ({ guide, featured = false }: ResourceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`group hover:shadow-xl transition duration-300 rounded-2xl overflow-hidden ${
        featured
          ? "border-2 border-amber-200 shadow-amber-100 bg-gradient-to-br from-amber-50 to-white"
          : "border border-gray-100 shadow-md bg-white"
      }`}
    >
      <div className="p-6">
        <div
          className={`mb-4 transition duration-300 ${
            featured
              ? "text-amber-500 group-hover:scale-110"
              : "text-teal-600 group-hover:text-amber-500"
          }`}
        >
          {guide.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-700 transition duration-300">
          {guide.title}
        </h3>
        <p className="text-gray-600 mb-4">{guide.description}</p>
        <Link
          to={guide.link}
          className={`inline-flex items-center gap-1 font-medium ${
            featured
              ? "text-amber-600 hover:text-amber-700"
              : "text-teal-600 hover:text-teal-700"
          } transition duration-300`}
        >
          Read more{" "}
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

const Resources = () => {
  // Separate featured guides for the top section
  const featuredGuides = guides.filter((guide) => guide.featured);
  const otherGuides = guides.filter((guide) => !guide.featured);

  return (
    <>
      <Helmet>
        <title>Umrah Resources & Guides | Omra Korbo</title>
        <meta
          name="description"
          content="Prepare for your spiritual journey with our comprehensive Umrah guides and resources."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative py-16 md:py-24 bg-gradient-to-r from-teal-600 to-emerald-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa5c3d0cf"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Umrah Resources & Guides
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-teal-50 mb-8"
            >
              Comprehensive information to help you prepare for a meaningful and
              spiritually fulfilling journey
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex justify-center"
            >
              <Link
                to="/contact"
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-medium transition shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30"
              >
                Ask Us a Question
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Guides Section */}
      <div className="py-16 bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-800"
            >
              Essential Umrah Guides
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-1 bg-amber-500 mx-auto mt-2"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-600 mt-4 max-w-2xl mx-auto"
            >
              Start with these key resources to help you prepare for your
              spiritual journey
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredGuides.map((guide) => (
              <ResourceCard key={guide.id} guide={guide} featured={true} />
            ))}
          </div>
        </div>
      </div>

      {/* All Resources Section */}
      <div className="py-16 bg-gradient-to-b from-teal-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-800"
            >
              Additional Resources
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
              Explore our complete collection of guides and resources for a
              comprehensive understanding
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherGuides.map((guide) => (
              <ResourceCard key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Need Personal Guidance?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our experienced team is here to answer your questions and provide
            personalized advice for your Umrah journey.
          </p>
          <Link
            to="/contact"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Contact Our Umrah Experts
          </Link>
        </div>
      </div>
    </>
  );
};

export default Resources;
