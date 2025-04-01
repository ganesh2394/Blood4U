import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/layout/PublicLayout";
import AuthLayout from "./components/layout/AuthLayout";
import PublicRoutes from "./components/routes/PublicRoutes";
import DashboardLayout from "./components/layout/DashboardLayout";
import PrivateRoute from "./components/routes/PrivateRoute";
import LoadingScreen from "./components/LoadingScreen"; // Direct import for faster loading
import InventoryForm from "./components/form/InventoryForm";

// Lazy loading dashboards
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const OrgDashboard = lazy(() => import("./pages/dashboard/OrgDashboard"));
const DonorDashboard = lazy(() => import("./pages/dashboard/DonorDashboard"));
const HospitalDashboard = lazy(() =>
  import("./pages/dashboard/HospitalDashboard")
);

// Lazy load donor pages for donor
const FindCenter = lazy(() => import("./pages/donor/FindCenter"));
const ScheduleDonation = lazy(() => import("./pages/donor/ScheduleDonation"));
const DonationHistory = lazy(() => import("./pages/donor/DonationHistory"));

// Lazy load pages for organizations
const AwarenessCampaigns = lazy(() =>
  import("./pages/organization/AwarenessCampaigns")
);
const DonationStatistics = lazy(() =>
  import("./pages/organization/DonationStatistics")
);
const OrganizeDrives = lazy(() =>
  import("./pages/organization/OrganizeDrives")
);
const Volunteers = lazy(() => import("./pages/organization/Volunteers"));

// Lazy load pages for admin
const ManageDonations = lazy(() => import("./pages/admin/ManageDonations"));
const ManageUsers = lazy(() => import("./pages/admin/ManageUsers"));
const Reports = lazy(() => import("./pages/admin/Reports"));

// Lazy load pages for hospitals
const ManageAppointments = lazy(() =>
  import("./pages/hospital/ManageAppointments")
);

const RequestBlood = lazy(() => import("./pages/hospital/RequestBlood"));

// Common pages (Shared across roles)
const FAQ = lazy(() => import("./pages/common/FAQ"));
const Settings = lazy(() => import("./pages/common/Settings"));
const ContactSupport = lazy(() => import("./pages/common/ContactSupport"));
const Logout = lazy(() => import("./pages/common/Logout"));
const PrivacyPolicy = lazy(() => import("./pages/common/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/common/TermsOfService"));
const AboutUs = lazy(() => import("./pages/common/AboutUs"));
const ProfilePage = lazy(() => import("./pages/common/ProfilePage"));

// Lazy loading authentication & public pages
const Home = lazy(() => import("./pages/public/Home"));
const About = lazy(() => import("./pages/public/About"));
const Eligibility = lazy(() => import("./pages/public/Eligibility"));
const Contact = lazy(() => import("./pages/public/Contact"));
const DonationCenters = lazy(() => import("./pages/public/DonationCenters"));
const Donation = lazy(() => import("./pages/public/Donation"));
const Register = lazy(() => import("./pages/auth/Register"));
const Login = lazy(() => import("./pages/auth/Login"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/auth/ResetPassword"));

const App = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {/* Public Routes */}
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

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          {/* Common routes for all roles */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact-support" element={<ContactSupport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Organization Routes */}
          <Route element={<PrivateRoute allowedRoles={["organization"]} />}>
            <Route path="/org-dashboard" element={<OrgDashboard />} />
            <Route
              path="/org-dashboard/awareness-campaigns"
              element={<AwarenessCampaigns />}
            />
            <Route path="/org-dashboard/volunteers" element={<Volunteers />} />
            <Route
              path="/org-dashboard/organize-drive"
              element={<OrganizeDrives />}
            />
            <Route
              path="/org-dashboard/donation-statistics"
              element={<DonationStatistics />}
            />
            <Route
              path="/org-dashboard/inventory"
              element={<InventoryForm userRole={"organization"} />}
            />
          </Route>

          {/* Donor Routes */}
          <Route element={<PrivateRoute allowedRoles={["donor"]} />}>
            <Route path="/donor-dashboard" element={<DonorDashboard />} />
            <Route
              path="/donor-dashboard/find-center"
              element={<FindCenter />}
            />
            <Route
              path="/donor-dashboard/schedule"
              element={<ScheduleDonation />}
            />
            <Route
              path="/donor-dashboard/history"
              element={<DonationHistory />}
            />
            <Route
              path="/donor-dashboard/inventory"
              element={<InventoryForm userRole={"donor"} />}
            />
          </Route>

          {/* Hospital Routes */}
          <Route element={<PrivateRoute allowedRoles={["hospital"]} />}>
            <Route path="/hospital-dashboard" element={<HospitalDashboard />} />
            <Route
              path="/hospital-dashboard/request-blood"
              element={<RequestBlood />}
            />
            <Route
              path="/hospital-dashboard/manage-appointments"
              element={<ManageAppointments />}
            />
            <Route
              path="/hospital-dashboard/inventory"
              element={<InventoryForm userRole={"hospital"} />}
            />
          </Route>

          {/* Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin-dashboard/manage-users"
              element={<ManageUsers />}
            />
            <Route path="/admin-dashboard/reports" element={<Reports />} />
            <Route
              path="/admin-dashboard/manage-donations"
              element={<ManageDonations />}
            />
            <Route
              path="/admin-dashboard/inventory"
              element={<InventoryForm userRole={"admin"} />}
            />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
