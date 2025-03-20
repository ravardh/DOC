import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Campaigns from "./pages/Campaigns";
import Gallery from "./pages/Gallery";
import Support from "./pages/Support";
import Contact from "./pages/Contact";
import NariShakti from "./pages/campaigns/NariShakti";
import SuSikshaPathshala from "./pages/campaigns/SuSikshaPathshala";
import NayiUdaan from "./pages/campaigns/NayiUdaan";
import Khushhaali from "./pages/campaigns/Khushhaali";
import MehfilEMuskaan from "./pages/campaigns/MehfilEMuskaan";
import JagrukataAbhiyan from "./pages/campaigns/JagrukataAbhiyan";
import Volunteer from "./pages/support/Volunteer";
import Internship from "./pages/support/internship";
import Donate from "./pages/support/Doantion";
import AooBatenKarein from "./pages/campaigns/AooBatenKarein";
import NayiSambhawnayein from "./pages/campaigns/nayisambhawnayein";
import AdminDashboard from "./pages/Dashboards/adminDashboard";
import Login from "./pages/login";
import HRDashboard from "./pages/Dashboards/hrDashboard";
import ScrollToTop from "./components/common/Scrolltop";
import StreetAnimalCare from "./pages/Campaigns/StreetAnimalCare";
import GreenEarth from "./pages/Campaigns/GreenEarth";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaigns/nari-shakti" element={<NariShakti />} />
            <Route
              path="/campaigns/su-siksha-pathshala"
              element={<SuSikshaPathshala />}
            />
            <Route path="/campaigns/nayi-udaan" element={<NayiUdaan />} />
            <Route path="/campaigns/khushhaali" element={<Khushhaali />} />
            <Route
              path="/campaigns/mehfil-e-muskaan"
              element={<MehfilEMuskaan />}
            />
            <Route
              path="/campaigns/jagrukata-abhiyan"
              element={<JagrukataAbhiyan />}
            />
            <Route
              path="/campaigns/aao-baat-karein"
              element={<AooBatenKarein />}
            />
            <Route
              path="/campaigns/nayi-sambhawnayein"
              element={<NayiSambhawnayein />}
            />
            <Route
              path="/campaigns/streetanimalcare"
              element={<StreetAnimalCare />}
            />
            <Route
              path=" /campaigns/greenearth"
              element={<GreenEarth />}
            />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/support" element={<Support />} />
            <Route path="/support/volunteer" element={<Volunteer />} />
            <Route path="/support/internship" element={<Internship />} />
            <Route path="/support/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/hr-dashboard" element={<HRDashboard />} />
            <Route path="/campaigns/streetanimalcare" element={<StreetAnimalCare />} />
            <Route path="/campaigns/greenearth" element={<GreenEarth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
