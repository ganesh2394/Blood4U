import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "./../shared/Footer";

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
