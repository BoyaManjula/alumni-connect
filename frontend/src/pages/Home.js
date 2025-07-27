import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section with Background Image */}
      <section
        className="text-white text-center py-28 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6">
          <h1 className="text-5xl font-bold mb-4">Welcome to Alumni Connect</h1>
          <p className="text-xl max-w-2xl mx-auto">
            A vibrant platform to reconnect, collaborate, and grow with your fellow alumni.
          </p>
          <Link to="/login">
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">Platform Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Reconnect with Classmates"
              icon="🤝"
              description="Search and connect with fellow alumni from your batch or department."
            />
            <FeatureCard
              title="Event Hub"
              icon="📅"
              description="Stay in the loop with upcoming alumni events, reunions, and webinars."
            />
            <FeatureCard
              title="Career Networking"
              icon="💼"
              description="Explore job opportunities, internships, and mentoring from senior alumni."
            />
            <FeatureCard
              title="Success Stories"
              icon="🏆"
              description="Get inspired by featured alumni achievements and journeys."
            />
            <FeatureCard
              title="Message Board"
              icon="💬"
              description="Engage in group discussions, polls, and share announcements."
            />
            <FeatureCard
              title="Secure Profiles"
              icon="🔐"
              description="Your data is safe—update and manage your profile securely anytime."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">What Alumni Say</h2>
          <div className="grid md:grid-cols-2 gap-10">
            <Testimonial
              name="Anjali Mehta"
              role="Software Engineer, Google"
              quote="Alumni Connect helped me get in touch with my batchmates and opened up new career opportunities!"
            />
            <Testimonial
              name="Ravi Kumar"
              role="Entrepreneur"
              quote="The platform brought our alumni community closer than ever. Events are so well coordinated now!"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-blue-100 text-gray-600">
        © 2025 Alumni Connect. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ title, icon, description }) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow hover:shadow-lg transition">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Testimonial({ name, role, quote }) {
  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow">
      <p className="italic text-lg mb-4">“{quote}”</p>
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-600">{role}</div>
    </div>
  );
}

export default Home;

