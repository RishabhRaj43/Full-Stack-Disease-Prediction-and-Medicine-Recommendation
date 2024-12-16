import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const Home_2 = () => {
  return (
    <div className="font-sans bg-white text-gray-800">
      {/* Features Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="text-center mb-10">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Why Choose MedGuide?
          </motion.h2>
          <p className="text-lg text-gray-600 mt-4">
            Our AI-driven platform offers quick and personalized health
            insights, allowing you to make informed decisions and take charge of
            your health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          <motion.div
            className="text-center p-6 bg-white rounded-lg shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Accurate Predictions
            </h3>
            <p className="text-gray-600">
              Our system uses advanced algorithms to give you personalized
              health predictions.
            </p>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-white rounded-lg shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Expert Doctors
            </h3>
            <p className="text-gray-600">
              Connect with qualified medical professionals to gain insights and
              advice on your health.
            </p>
          </motion.div>

          <motion.div
            className="text-center p-6 bg-white rounded-lg shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Get round-the-clock access to health support, ensuring peace of
              mind anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-gray-100">
        <div className="text-center mb-10">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            What Our Users Say
          </motion.h2>
          <p className="text-lg text-gray-600 mt-4">
            Hear from those who have already experienced the benefits of
            MedGuide.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-10 px-6">
          <motion.div
            className="w-full md:w-1/3 p-8 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <p className="text-lg text-gray-600 italic">
              "MedGuide helped me predict my health needs in a simple and
              efficient way. It's like having a doctor on call!"
            </p>
            <p className="mt-4 font-semibold text-gray-800">John Doe</p>
            <p className="text-gray-500">User</p>
          </motion.div>

          <motion.div
            className="w-full md:w-1/3 p-8 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-lg text-gray-600 italic">
              "The platform is user-friendly and gave me accurate health advice.
              It’s reassuring to have access to such great insights."
            </p>
            <p className="mt-4 font-semibold text-gray-800">Jane Smith</p>
            <p className="text-gray-500">User</p>
          </motion.div>

          <motion.div
            className="w-full md:w-1/3 p-8 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <p className="text-lg text-gray-600 italic">
              "MedGuide provided me with health predictions that helped me make
              important decisions for my well-being."
            </p>
            <p className="mt-4 font-semibold text-gray-800">Sam Lee</p>
            <p className="text-gray-500">User</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home_2;
