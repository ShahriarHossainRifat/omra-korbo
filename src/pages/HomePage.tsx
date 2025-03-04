import { Link } from "react-router-dom";
import { products, packages } from "../services/mockData";
import PackageCard from "../components/packages/PackageCard";
import ProductCard from "../components/products/ProductCard";
import BackgroundImage from "../components/common/BackgroundImage";
import AnimateOnView from "../components/common/AnimateOnView";
import LazyImage from "../components/common/LazyImage";

const HomePage = () => {
  // Get featured products (first 3 for this example)
  const featuredProducts = products.slice(0, 3);

  // Get featured packages
  const featuredPackages = packages.filter((pkg) => pkg.featured).slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <BackgroundImage
        src="https://images.unsplash.com/photo-1587979730174-95eb4e62639a?q=80&w=2670&auto=format&fit=crop"
        overlay={true}
        overlayColor="#000"
        overlayOpacity={0.6}
        className="min-h-[600px] flex items-center"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6 fade-in-up">
              Begin Your Sacred Journey
            </h1>
            <p
              className="text-xl mb-8 fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Experience a spiritual journey like no other with our
              comprehensive Hajj and Umrah packages designed for comfort,
              convenience, and devotion.
            </p>
            <div
              className="flex gap-4 fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Link to="/packages/all" className="btn btn-primary">
                Explore Packages
              </Link>
              <Link to="/products" className="btn btn-outline btn-secondary">
                Shop Essentials
              </Link>
            </div>
          </div>
        </div>
      </BackgroundImage>

      {/* Featured Packages Section */}
      <div className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <AnimateOnView animation="fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-4">
              Featured Packages
            </h2>
            <p className="text-center mb-12 max-w-2xl mx-auto">
              Discover our most popular packages carefully designed to provide
              you with the most fulfilling spiritual experience.
            </p>
          </AnimateOnView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPackages.map((pkg, index) => (
              <AnimateOnView
                key={pkg.id}
                animation="scale-in"
                delay={index * 200}
              >
                <PackageCard pkg={pkg} />
              </AnimateOnView>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link to="/packages/all" className="btn btn-outline btn-primary">
              View All Packages
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <AnimateOnView animation="fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-4">
              Pilgrimage Essentials
            </h2>
            <p className="text-center mb-12 max-w-2xl mx-auto">
              Prepare for your journey with our selection of high-quality
              pilgrimage products.
            </p>
          </AnimateOnView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <AnimateOnView
                key={product.id}
                animation="fade-in-up"
                delay={index * 200}
              >
                <ProductCard product={product} />
              </AnimateOnView>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link to="/products" className="btn btn-outline">
              Shop All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <BackgroundImage
        src="https://images.unsplash.com/photo-1581888517319-2f76808544ec?q=80&w=2670&auto=format&fit=crop"
        overlay={true}
        overlayColor="#000"
        overlayOpacity={0.8}
        className="py-24"
        fixed={true}
      >
        <div className="container mx-auto px-4">
          <AnimateOnView animation="fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-16 text-white">
              Trusted by Thousands of Pilgrims
            </h2>
          </AnimateOnView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Years of Experience" },
              { number: "10,000+", label: "Pilgrims Served" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <AnimateOnView
                key={index}
                animation="scale-in"
                delay={index * 150}
                className="text-center text-white"
              >
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl">{stat.label}</div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </BackgroundImage>

      {/* Testimonials */}
      <div className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <AnimateOnView animation="fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-4">
              What Our Pilgrims Say
            </h2>
            <p className="text-center mb-12 max-w-2xl mx-auto">
              Hear from those who have traveled with us on their sacred journey.
            </p>
          </AnimateOnView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Ahmed K.",
                photo: "https://i.pravatar.cc/150?img=11",
                text: "The care and attention provided by the team made my Hajj journey so much smoother than I expected. Every detail was handled professionally.",
              },
              {
                name: "Amina J.",
                photo: "https://i.pravatar.cc/150?img=44",
                text: "This was my second Umrah with Omra Korbo, and I wouldn't choose any other service. The accommodations were excellent and close to the Haram.",
              },
              {
                name: "Mohammed S.",
                photo: "https://i.pravatar.cc/150?img=67",
                text: "Traveling with my family was made easy with their family package. The guides were knowledgeable and patient with our children.",
              },
            ].map((testimonial, index) => (
              <AnimateOnView
                key={index}
                animation="fade-in-up"
                delay={index * 200}
                className="card bg-base-100 shadow-xl hover-lift"
              >
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <LazyImage
                          src={testimonial.photo}
                          alt={testimonial.name}
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-lg">{testimonial.name}</h3>
                      <div className="rating rating-sm">
                        {[...Array(5)].map((_, i) => (
                          <input
                            key={i}
                            type="radio"
                            name={`rating-${index}`}
                            className="mask mask-star-2 bg-orange-400"
                            readOnly
                            checked={i === 4}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="italic">"{testimonial.text}"</p>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-primary-content py-16">
        <div className="container mx-auto px-4 text-center">
          <AnimateOnView animation="bounce-in">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="mb-8 max-w-2xl mx-auto">
              Begin your sacred pilgrimage today with our expert guidance and
              comprehensive services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/packages/all" className="btn btn-secondary">
                Browse Packages
              </Link>
              <Link to="/auth" className="btn btn-outline btn-secondary">
                Create Account
              </Link>
            </div>
          </AnimateOnView>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
