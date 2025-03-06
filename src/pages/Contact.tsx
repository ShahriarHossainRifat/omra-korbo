import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  link?: string | null;
}

const ContactInfo = ({
  icon,
  title,
  content,
  link = null,
}: ContactInfoProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
  >
    <div className="flex items-start gap-4">
      <div className="text-teal-600 text-2xl mt-1">{icon}</div>
      <div>
        <h3 className="font-bold text-gray-800 text-lg mb-1">{title}</h3>
        {link ? (
          <a
            href={link}
            className="text-teal-600 hover:text-teal-700 hover:underline transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          <p className="text-gray-600">{content}</p>
        )}
      </div>
    </div>
  </motion.div>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus("success");
      setLoading(false);
      // Reset form after success
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Omra Korbo</title>
        <meta
          name="description"
          content="Get in touch with our Umrah experts for personalized assistance with your pilgrimage journey."
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
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-teal-50"
            >
              Our team is here to assist you with your Umrah journey
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <ContactInfo
                icon={<FaMapMarkerAlt />}
                title="Our Office"
                content="123 Islam Road, Dhaka, Bangladesh"
              />
              <ContactInfo
                icon={<FaPhone />}
                title="Phone"
                content="+880 1234-567890"
                link="tel:+8801234567890"
              />
              <ContactInfo
                icon={<FaEnvelope />}
                title="Email"
                content="info@omrakorbo.com"
                link="mailto:info@omrakorbo.com"
              />
              <ContactInfo
                icon={<FaWhatsapp />}
                title="WhatsApp"
                content="+880 1234-567890"
                link="https://wa.me/8801234567890"
              />

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="font-bold text-gray-800 text-lg mb-3">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition"
                  >
                    <FaFacebook />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 hover:bg-teal-600 hover:text-white transition"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Send Us a Message
                </h2>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg">
                    Thank you for contacting us! We'll get back to you shortly.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                    Something went wrong. Please try again later.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="name"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="email"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-medium mb-2"
                        htmlFor="subject"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Package Information">
                          Package Information
                        </option>
                        <option value="Booking Question">
                          Booking Question
                        </option>
                        <option value="Product Information">
                          Product Information
                        </option>
                        <option value="Feedback">Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="message"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      rows={6}
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition flex items-center justify-center disabled:opacity-70"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-96 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.5983460988937!2d90.41279491498255!3d23.79656188456681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7715a40c603%3A0xec01cd75f33139f5!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1615213568940!5m2!1sen!2sbd"
          className="w-full h-full"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen={false}
          aria-hidden="false"
          tabIndex={0}
          loading="lazy"
        ></iframe>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Find quick answers to common questions about our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                How far in advance should I book my Umrah package?
              </h3>
              <p className="text-gray-600">
                We recommend booking at least 3-4 months in advance to secure
                the best rates and availability, especially during peak seasons.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Do you provide visa assistance?
              </h3>
              <p className="text-gray-600">
                Yes, all our Umrah packages include complete visa processing
                assistance. We handle all the documentation and applications on
                your behalf.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                What is your cancellation policy?
              </h3>
              <p className="text-gray-600">
                Our standard policy allows free cancellation up to 45 days
                before departure. Cancellations between 30-45 days incur a 25%
                fee, and those under 30 days may be subject to higher fees.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Can I customize my Umrah package?
              </h3>
              <p className="text-gray-600">
                Absolutely! We offer fully customizable packages to meet your
                specific needs. Contact our team to discuss your requirements
                for a personalized itinerary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
