import { Routes, Route } from "react-router";
import { useEffect } from "react";
import LandingPage from "../pages/landing/LandingPage";
import Announcements from "../pages/announcements/Announcements";
import Hero from "../pages/landing/heroSection/Hero";
import LoginPage from "../pages/login/LoginPage";
import SignUp from "../pages/signup/SignUp";
import ProtectedRoute from "../components/ProtectedRoutes";
import AdminAccount from "../pages/accounts/adminAccount/AdminAccount";
import EmployeeAccount from "../pages/accounts/employeeAccount/EmployeeAccount";
import NormalUserAccount from "../pages/accounts/normalUserAccount/NormalUserAccount";
import AdminDashboard from "../pages/accounts/adminAccount/adminDashboard/AdminDashboard";
import EmployeesTable from "../pages/accounts/adminAccount/users/EmployeesTable";
import CenroClients from "../pages/accounts/adminAccount/users/CenroClients";
import BusinessApplications from "../pages/accounts/adminAccount/applications/BusinessApplications"
import WebinarSched from "../pages/accounts/adminAccount/webinar/WebinarSched";
import InspectAndFinalCert from "../pages/accounts/adminAccount/inspectionAndFinalCert/InspectAndFinalCert";
import CertForAttendees from "../pages/accounts/adminAccount/webinar/CertForAttendees";
import SuppAndTicket from "../pages/accounts/adminAccount/ticket/SuppAndTicket";
import EmpLogs from "../pages/accounts/adminAccount/emplogs/EmpLogs"
import AdminSettings from "../pages/accounts/adminAccount/settings/Settings"



export default function AppRoutes() {
  useEffect(() => {
    // Scroll to the section when the hash changes
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []); // Listen for hash changes in the URL

  return (
    <Routes>
      {/* <Route element={<PublicLayout/>}> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/#home" element={<Hero />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      {/* </Route> */}

      {/* normal-user-account */}
      <Route element={<ProtectedRoute allowedRoles={["user"]}/>}>
      <Route path="/user-account" element={<NormalUserAccount/>}/>
      </Route>

      {/* admin account */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminAccount />}>
          <Route index element={<AdminDashboard />} /> 
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user-employee" element={<EmployeesTable />} />
          <Route path="user-cenro-clients" element={<CenroClients />} />
          <Route path="business-application" element={<BusinessApplications />} />
          <Route path="webinar-schedule" element={<WebinarSched />} />
          <Route path="inspection-and-final-certificate" element={<InspectAndFinalCert />} />
          <Route path="certificate-for-attendees" element={<CertForAttendees />} />
          <Route path="support-and-tickets" element={<SuppAndTicket />} />
          <Route path="employee-logs" element={<EmpLogs />} />
          <Route path="admin-settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* employee-account */}
      <Route element={<ProtectedRoute allowedRoles={["employee"]}/>}>
      <Route path="/employee-account" element={<EmployeeAccount/>}/>
      </Route>
    </Routes>
  );
}
