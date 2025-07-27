import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import Events from "./pages/Events";
import Jobs from "./pages/Jobs";
import Meetings from "./pages/Meetings";
import SearchAlumni from "./pages/SearchAlumni";
import SendMail from "./pages/SendMail";
import Inbox from './pages/Inbox';
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewsletterPage from './pages/NewsletterPage';
import SentMails from "./pages/SentMails";

 

function App() {
  return (
    <Router>
      <Routes>
        {/* All routes wrapped inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/sent-mails" element={<SentMails />} />
          <Route path="/events" element={<Events />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="/newsletters" element={<NewsletterPage />} />
          <Route path="meetings" element={<Meetings />} />
          <Route path="search-alumni" element={<SearchAlumni />} />
          <Route path="send-mail" element={<SendMail />} />
          <Route path="/inbox" element={<Inbox />} />

          {/* Public routes outside the main layout or can be inside depending on your app design */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Optional: catch all unmatched routes */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

