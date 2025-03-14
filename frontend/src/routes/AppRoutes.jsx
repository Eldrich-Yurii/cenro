import { Routes, Route } from "react-router";
import { useEffect } from "react";
import LandingPage from "../pages/landing/LandingPage";
import Announcements from "../pages/announcements/Announcements";
import Hero from "../pages/landing/heroSection/Hero";
import LoginPage from "../pages/login/LoginPage";
import SignUp from "../pages/signup/SignUp";
import ProtectedRoute from "../components/ProtectedRoutes";
import AdminEmpAccount from "../pages/accounts/adminEmpAccount/AdminEmpAccount";
import NormalUserAccount from "../pages/accounts/normalUserAccount/NormalUserAccount";
import Dashboard from "../pages/accounts/adminEmpAccount/adminEmpDashboard/Dashboard"
import EmployeesTable from "../pages/accounts/adminEmpAccount/users/EmployeesTable";
import CenroClients from "../pages/accounts/adminEmpAccount/users/CenroClients";
import BusinessApplications from "../pages/accounts/adminEmpAccount/applications/BusinessApplications";
import WebinarSched from "../pages/accounts/adminEmpAccount/webinar/WebinarSched";
import InspectAndFinalCert from "../pages/accounts/adminEmpAccount/inspectionAndFinalCert/InspectAndFinalCert";
import CertForAttendees from "../pages/accounts/adminEmpAccount/webinar/CertForAttendees";
import SuppAndTicket from "../pages/accounts/adminEmpAccount/ticket/SuppAndTicket";
import EmpLogs from "../pages/accounts/adminEmpAccount/emplogs/EmpLogs";
import AdminSettings from "../pages/accounts/adminEmpAccount/settings/Settings";
import UserDashboard from "../pages/accounts/normalUserAccount/dashboard/UserDashboard";
import MyApplication from "../pages/accounts/normalUserAccount/application/MyApplication";
import WebSched from "../pages/accounts/normalUserAccount/webinar/WebinarSched";
import WebCert from "../pages/accounts/normalUserAccount/webinar/WebCert";
import FinalCert from "../pages/accounts/normalUserAccount/finalCert/FinalCert";
import Notif from "../pages/accounts/normalUserAccount/notification/Notif";
import FAQs from "../pages/accounts/normalUserAccount/chatsupport/FaqsChat";
import Tickets from "../pages/accounts/normalUserAccount/chatsupport/Tickets";
import Settings from "../pages/accounts/normalUserAccount/settings/Settings";

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
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/user-account" element={<NormalUserAccount />}>
          <Route index element={<UserDashboard />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="my-application" element={<MyApplication />} />
          <Route path="webinar-schedule" element={<WebSched />} />
          <Route path="webinar-certificate" element={<WebCert />} />
          <Route path="final-certificate" element={<FinalCert />} />
          <Route path="notifications" element={<Notif />} />
          <Route path="frequently-asked-questions" element={<FAQs />} />
          <Route path="support-ticket" element={<Tickets />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* admin account */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "employee"]} />}>
        <Route path="/emp" element={<AdminEmpAccount />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<EmployeesTable />} />
          <Route path="users" element={<CenroClients />} />
          <Route
            path="business-application"
            element={<BusinessApplications />}
          />
          <Route path="webinar-schedule" element={<WebinarSched />} />
          <Route
            path="inspection-and-final-certificate"
            element={<InspectAndFinalCert />}
          />
          <Route
            path="certificate-for-attendees"
            element={<CertForAttendees />}
          />
          <Route path="support-and-tickets" element={<SuppAndTicket />} />
          <Route path="employee-logs" element={<EmpLogs />} />
          <Route path="admin-settings" element={<AdminSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}
