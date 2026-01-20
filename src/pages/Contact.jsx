import Header from "../components/Header";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Header />

      <section className="max-w-5xl mx-auto mt-16 px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Contact Us
        </h1>

        <p className="text-gray-600 mb-10">
          Have questions or need help? Reach out to us — we’re happy to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Contact Info */}
          <div className="bg-blue-50 p-8 rounded-xl">
            <h2 className="text-2xl font-semibold mb-4">
              Get in Touch
            </h2>

            <p className="mb-4">📍 Kozhikode, Kerala</p>
            <p className="mb-4">📞 +91 9XXXXXXXXX</p>
            <p className="mb-4">✉️ support@weCare.com</p>

            <p className="text-sm text-gray-600 mt-6">
              Our support team is available Monday to Saturday, 9AM – 6PM.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-6">
              Send us a Message
            </h2>

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded mb-4"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border p-3 rounded mb-6"
            />

            <button className="bg-blue-900 text-white px-6 py-3 rounded">
              Send Message
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
