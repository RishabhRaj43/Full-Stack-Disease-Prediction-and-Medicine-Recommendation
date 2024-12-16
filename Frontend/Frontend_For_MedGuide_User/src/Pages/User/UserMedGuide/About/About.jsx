import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[]);
  const teamMembers = [
    {
      name: "Rishabh Raj Verma",
      role: "Full Stack Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Rajeshwari ",
      role: "Full Stack Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Amit kr. Gosai",
      role: "Full Stack Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Nehal Haider",
      role: "Full Stack Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Gaurav ",
      role: "Full Stack Developer",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-gray-200 text-gray-800">
      {/* About Section */}
      <section className="w-full py-20 px-6 md:px-16 bg-gradient-to-r from-blue-200 via-white to-purple-200">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About MedGuide
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            MedGuide is your trusted companion for personalized health
            predictions, expert advice, and insightful recommendations. Our goal
            is to empower you to take charge of your well-being with the help of
            cutting-edge technology and medical expertise.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="w-full py-20 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600">
              At MedGuide, our mission is to make healthcare more accessible,
              reliable, and personalized. By combining advanced algorithms and
              expert medical insights, we aim to deliver timely, accurate, and
              actionable health recommendations to everyone, everywhere.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Why Choose MedGuide?
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Accurate health insights</li>
                <li>Trusted medical professionals</li>
                <li>24/7 support for your health journey</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="w-full py-20 px-6 md:px-16 bg-gradient-to-r from-purple-300 via-white to-blue-300">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Innovation
              </h3>
              <p className="text-gray-600">
                Continuously improving through advanced technology and AI
                solutions.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Trust
              </h3>
              <p className="text-gray-600">
                Building confidence with reliable and expert-driven advice.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-600 mb-4">
                Accessibility
              </h3>
              <p className="text-gray-600">
                Ensuring healthcare solutions are available to everyone, always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="w-full py-20 px-6 md:px-16 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center py-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg shadow-lg"
              >
                <img
                  src={member.imageUrl}
                  className="w-32 h-32 rounded-full object-cover"
                  alt={member.name}
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
