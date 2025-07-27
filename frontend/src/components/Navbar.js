 // src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          Alumni Connect
        </Link>
        <div className="space-x-4 text-sm md:text-base">
          <Link to="/events" className="text-gray-700 hover:text-blue-600">
            Event Hub
          </Link>
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600">
            Jobs
          </Link>
          <Link to="/newsletters" className="text-gray-700 hover:text-blue-600">
            Newsletters
          </Link>
          <Link to="/meetings" className="text-gray-700 hover:text-blue-600">
            Meetings
          </Link>
          <Link to="/search-alumni" className="text-gray-700 hover:text-blue-600">
            Search Alumni
          </Link>
          <Link to="/send-mail" className="text-gray-700 hover:text-blue-600">
            Send Mail
          </Link>
          <Link to="/inbox" className="text-gray-700 hover:text-blue-600">
            Inbox
          </Link>
          <Link to="/sent-mails" className="text-gray-700 hover:text-blue-600">
            Sent Mails
          </Link>
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
          <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

