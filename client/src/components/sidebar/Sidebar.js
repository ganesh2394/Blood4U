import React from "react";
import DonorSidebar from "./donor/DonorSidebar";
import AdminSidebar from "./admin/AdminSidebar";
import HospitalSidebar from "./hospital/HospitalSidebar";
import OrganizationSidebar from "./organisation/OrganisationSidebar";

const Sidebar = ({ role }) => {
  const renderSidebar = () => {
    switch (role) {
      case "donor":
        return <DonorSidebar />;
      case "admin":
        return <AdminSidebar />;
      case "hospital":
        return <HospitalSidebar />;
      case "organization":
        return <OrganizationSidebar />;
      default:
        return <DonorSidebar />;
    }
  };

  return (
    <div className="w-64 bg-white shadow-md h-screen">
      {/* Role-Specific Sidebar */}
      {renderSidebar()}
    </div>
  );
};

export default Sidebar;
