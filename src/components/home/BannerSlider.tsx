import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { fetchLimitedOffers, type Package } from "../../services/mockData";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/effect-fade";

const BannerSlider = () => {
  const [offers, setOffers] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOffers = async () => {
      try {
        const data = await fetchLimitedOffers();
        setOffers(data);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      } finally {
        setLoading(false);
      }
    };

    getOffers();
  }, []);

  if (loading) {
    return (
      <div className="h-[90vh] bg-gray-100 animate-pulse flex items-center justify-center">
        <span className="text-gray-400">Loading amazing offers...</span>
      </div>
    );
  }

  if (offers.length === 0) {
    return null;
  }

  return (
    <div className="relative h-[90vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (_index, className) => {
            return `<span class="${className} w-3 h-3 bg-white bg-opacity-50 rounded-full transition-all duration-300"></span>`;
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        className="h-full w-full"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer.id} className="relative">
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(${offer.image})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />

            <div className="relative z-20 h-full flex items-center">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="max-w-xl text-white"
                >
                  <div className="inline-block px-4 py-1.5 bg-amber-500 text-white font-semibold rounded-lg mb-6 shadow-lg">
                    Limited Time Offer - {offer.discount}% OFF
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    {offer.name}
                  </h2>
                  <p className="text-lg mb-8 text-gray-200">
                    {offer.description}
                  </p>
                  <div className="mb-8 flex flex-wrap gap-3">
                    {offer.amenities.slice(0, 4).map((amenity, index) => (
                      <span
                        key={index}
                        className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm border border-white/20"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div>
                      <span className="text-gray-300 line-through">
                        ${offer.price}
                      </span>
                      <div className="text-3xl font-bold text-white">
                        $
                        {(
                          offer.price -
                          (offer.price * (offer.discount || 0)) / 100
                        ).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-300">
                        {offer.duration}
                      </div>
                    </div>
                    <Link
                      to={`/packages/${offer.id}`}
                      className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-8 py-4 rounded-lg font-semibold transition inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Book Now
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation buttons */}
      <div className="swiper-button-prev !hidden md:!flex !w-12 !h-12 !text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm !rounded-full transition-all after:!text-lg"></div>
      <div className="swiper-button-next !hidden md:!flex !w-12 !h-12 !text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm !rounded-full transition-all after:!text-lg"></div>
    </div>
  );
};

export default BannerSlider;
