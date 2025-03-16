import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import AuthLayout from "./components/layout/AuthLayout";
import PublicRoutes from "./components/routes/PublicRoutes";
import ProtectedRoutes from "./components/routes/ProtectedRoutes";
import DashboardLayout from "./components/layout/DashboardLayout";

// Lazy loading components
const LoadingScreen = lazy(() => import("./components/LoadingScreen "));
// lazy laoding pages
const Dashboard = lazy("./pages/public/Dashboard");
const Home = lazy(() => import("./pages/public/Home"));
const About = lazy(() => import("./pages/public/About"));
const Eligibility = lazy(() => import("./pages/public/Eligibility"));
const Contact = lazy(() => import("./pages/public/Contact"));
const DonationCenters = lazy(() => import("./pages/public/DonationCenters"));
const Donation = lazy(() => import("./pages/public/Donation"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));

const App = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donation />} />
            <Route path="/centers" element={<DonationCenters />} />
          </Route>
        </Route>

        <Route element={<PublicRoutes />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
