import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const destinations = [
  {
    id: 1,
    name: "Makkah",
    image: "https://images.unsplash.com/photo-1591527577166-ce37804157c0",
    description:
      "The holiest city in Islam and the birthplace of Prophet Muhammad.",
    highlight: "Home to the Grand Mosque (Masjid al-Haram) and the Kaaba",
  },
  {
    id: 2,
    name: "Madinah",
    image: "https://images.unsplash.com/photo-1591375457798-5c9a1a189671",
    description:
      "The second holiest city in Islam and the burial place of Prophet Muhammad.",
    highlight: "Visit the Prophet's Mosque (Al-Masjid an-Nabawi)",
  },
  {
    id: 3,
    name: "Jeddah",
    image: "https://images.unsplash.com/photo-1623505516912-ea5733cf5462",
    description:
      "A major urban center with modern amenities and historical significance.",
    highlight: "Gateway to Makkah and home to the floating mosque",
  },
];

const FeaturedDestinations = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800"
          >
            Sacred Destinations
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
            Explore the holiest places in Islam that you will visit during your
            Umrah journey
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl overflow-hidden shadow-lg group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {destination.name}
                </h3>
              </div>

              <div className="p-6 bg-white">
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <div className="mb-5 text-teal-700 font-medium flex items-center gap-2">
                  <span className="text-amber-500">★</span>{" "}
                  {destination.highlight}
                </div>
                <Link
                  to={`/destinations/${destination.id}`}
                  className="inline-block text-teal-600 hover:text-teal-700 font-medium transition border-b-2 border-teal-600 hover:border-teal-700"
                >
                  Learn more
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedDestinations;
