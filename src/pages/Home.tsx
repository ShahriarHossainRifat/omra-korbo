import { Helmet } from "react-helmet-async";
import BannerSlider from "../components/home/BannerSlider";
import FeaturedPackages from "../components/home/FeaturedPackages";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Testimonials from "../components/home/Testimonials";
import UmrahGuides from "../components/home/UmrahGuides";
import WhyChooseUs from "../components/home/WhyChooseUs";
import CallToAction from "../components/common/CallToAction";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Omra Korbo - Your Trusted Umrah Travel Partner</title>
        <meta
          name="description"
          content="Omra Korbo offers premium Umrah packages with experienced guides, comfortable accommodations, and personalized service."
        />
      </Helmet>

      <BannerSlider />
      <FeaturedPackages />
      <FeaturedProducts />
      <Testimonials />
      <WhyChooseUs />
      <UmrahGuides />
      <CallToAction />
    </>
  );
};

export default Home;
