// src/components/Layout.js

import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* Top Navigation Bar */}
      <nav className="bg-blue-800 text-white p-4 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Alumni Connect</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/events" className="hover:underline">Events</Link>
            <Link to="/jobs" className="hover:underline">Jobs</Link>
            <Link to="/newsletters" className="hover:underline">Newsletters</Link>
            <Link to="/meetings" className="hover:underline">Meetings</Link>
            <Link to="/search-alumni" className="hover:underline">Search</Link>
            <Link to="/send-mail" className="hover:underline">Mail</Link>
            <Link to="/inbox" className="hover:underline">Inbox</Link>
            <Link to="/sent-mails" className="hover:underline">Sent Mails</Link> {/* ✅ Added */}
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

