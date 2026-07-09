import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import logo from "./assets/logo_full.png";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/common/Scrolltop";
import { Toaster } from "react-hot-toast";

// Lazy-loaded pages — each page is only fetched when first visited
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Campaigns = lazy(() => import("./pages/Campaigns"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Support = lazy(() => import("./pages/Support"));
const Contact = lazy(() => import("./pages/Contact"));
const Publications = lazy(() => import("./pages/Publications"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Legal pages
const GoogleVerification = lazy(() => import("./pages/GoogleVerification"));
const LegalInformation = lazy(() => import("./pages/LegalInformation"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));

// Campaign pages
const NariShakti = lazy(() => import("./pages/campaigns/NariShakti"));
const SuSikshaPathshala = lazy(() => import("./pages/campaigns/SuSikshaPathshala"));
const NayiUdaan = lazy(() => import("./pages/campaigns/NayiUdaan"));
const Khushhaali = lazy(() => import("./pages/campaigns/Khushhaali"));
const MehfilEMuskaan = lazy(() => import("./pages/campaigns/MehfilEMuskaan"));
const JagrukataAbhiyan = lazy(() => import("./pages/campaigns/JagrukataAbhiyan"));
const AooBatenKarein = lazy(() => import("./pages/campaigns/AooBatenKarein"));
const NayiSambhawnayein = lazy(() => import("./pages/campaigns/nayisambhawnayein"));
const StreetAnimalCare = lazy(() => import("./pages/campaigns/StreetAnimalCare"));
const GreenEarth = lazy(() => import("./pages/campaigns/GreenEarth"));
const Basta = lazy(() => import("./pages/campaigns/Basta"));

// Support pages
const Volunteer = lazy(() => import("./pages/support/Volunteer"));
const Internship = lazy(() => import("./pages/support/internship"));
const Donate = lazy(() => import("./pages/support/Doantion"));

// Auth & Dashboard pages
const Login = lazy(() => import("./pages/login"));
const AdminDashboard = lazy(() => import("./pages/Dashboards/adminDashboard"));
const HRDashboard = lazy(() => import("./pages/Dashboards/hrDashboard"));
const MemberDashboard = lazy(() => import("./pages/Dashboards/memberDashboard"));

const SITE_NAME = "Drops of Change Welfare Society";

const PAGE_TITLES = {
  "/": "Home",
  "/about": "About Us",
  "/campaigns": "Our Campaigns",
  "/publications": "Publications",
  "/gallery": "Gallery",
  "/contact": "Contact Us",
  "/support": "Support Us",
  "/support/volunteer": "Become a Volunteer",
  "/support/internship": "Internship Program",
  "/support/donate": "Donate",
  "/login": "Login",
  "/admin-dashboard": "Admin Dashboard",
  "/hr-dashboard": "HR Dashboard",
  "/member-dashboard": "Member Dashboard",
  "/campaigns/narishakti": "Nari Shakti",
  "/campaigns/susikshapathshala": "Su-Shiksha Pathshala",
  "/campaigns/nayiudaan": "Nayi Udaan",
  "/campaigns/khushhaali": "Khushhaali",
  "/campaigns/mehfilemuskaan": "Mehfil-E-Muskaan",
  "/campaigns/jagruktaabhiyan": "Jagrukata Abhiyan",
  "/campaigns/aoobatenkarein": "Aoo Baten Karein",
  "/campaigns/nayisambhawnayein": "Nayi Sambhawnayein",
  "/campaigns/streetanimalcare": "Paws & Care",
  "/campaigns/greenearth": "Green Earth Initiative",
  "/campaigns/basta": "Basta: Daily Pathshala",
  "/google-verification": "Google Verification",
  "/legal-information": "Legal Information",
  "/privacy-policy": "Privacy Policy",
  "/terms-conditions": "Terms & Conditions",
};

function TitleManager() {
  const location = useLocation();
  useEffect(() => {
    const pageTitle = PAGE_TITLES[location.pathname];
    document.title = pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_NAME;
  }, [location.pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <img
        src={logo}
        alt="Loading…"
        className="w-[75px] h-[75px] object-contain animate-pulse"
      />
    </div>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <TitleManager />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Toaster />
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/campaigns/narishakti" element={<NariShakti />} />
              <Route
                path="/campaigns/susikshapathshala"
                element={<SuSikshaPathshala />}
              />
              <Route path="/campaigns/nayiudaan" element={<NayiUdaan />} />
              <Route path="/campaigns/khushhaali" element={<Khushhaali />} />
              <Route
                path="/campaigns/mehfilemuskaan"
                element={<MehfilEMuskaan />}
              />
              <Route
                path="/campaigns/jagruktaabhiyan"
                element={<JagrukataAbhiyan />}
              />
              <Route
                path="/campaigns/aoobatenkarein"
                element={<AooBatenKarein />}
              />
              <Route
                path="/campaigns/nayisambhawnayein"
                element={<NayiSambhawnayein />}
              />
              <Route
                path="/campaigns/streetanimalcare"
                element={<StreetAnimalCare />}
              />
              <Route
                path="/campaigns/greenearth"
                element={<GreenEarth />}
              />
              <Route
                path="/campaigns/basta"
                element={<Basta />}
              />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/support" element={<Support />} />
              <Route path="/support/volunteer" element={<Volunteer />} />
              <Route path="/support/internship" element={<Internship />} />
              <Route path="/support/donate" element={<Donate />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/google-verification" element={<GoogleVerification />} />
              <Route path="/legal-information" element={<LegalInformation />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/hr-dashboard" element={<HRDashboard />} />
              <Route path="/member-dashboard" element={<MemberDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

