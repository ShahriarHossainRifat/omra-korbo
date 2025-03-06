import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "First-time pilgrim",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "I was nervous about my first Umrah, but Omra Korbo made everything so easy. Their team was supportive throughout the journey, and the accommodations were excellent. I'll definitely choose them again!",
    rating: 5,
  },
  {
    id: 2,
    name: "Fatima Zahra",
    role: "Family traveler",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "Traveling with my entire family was no hassle with Omra Korbo's family package. The special arrangements for children and elderly family members showed their attention to detail. Highly recommended for family Umrah trips.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mohammad Rahman",
    role: "Repeat customer",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    text: "This was my third Umrah with Omra Korbo, and they continue to impress. Their packages offer great value, and their knowledge of the sacred sites enhances the spiritual experience. Looking forward to my next journey with them.",
    rating: 5,
  },
  {
    id: 4,
    name: "Aisha Begum",
    role: "Senior traveler",
    image: "https://randomuser.me/api/portraits/women/62.jpg",
    text: "As a senior citizen with mobility issues, I was concerned about performing Umrah. Omra Korbo's staff provided exceptional assistance throughout. Their wheelchair arrangements and proximity to the Haram made everything convenient.",
    rating: 4,
  },
];

const Testimonials = () => {
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
            What Our Pilgrims Say
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-teal-600 mx-auto mt-2"
          ></motion.div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="py-8"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-xl shadow-lg h-full flex flex-col"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-teal-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="mt-2 mb-4 text-amber-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                <div className="flex-grow">
                  <FaQuoteLeft className="text-teal-100 text-4xl mb-2" />
                  <p className="text-gray-600 italic">{testimonial.text}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
