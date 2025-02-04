import { Routes, Route } from "react-router"
import { useEffect } from "react"
import LandingPage from "../pages/landing/LandingPage"
import Announcements from "../pages/announcements/Announcements"
import Hero from "../pages/landing/heroSection/Hero"
import LoginPage from "../pages/login/LoginPage"
import SignUp from "../pages/signup/SignUp"
import ProtectedRoute from "../components/ProtectedRoutes"
import Dashboard  from "../pages/dashboard/Dashboard"
import Admin  from "../pages/dashboard/AdminDashboard"
import Employee  from "../pages/dashboard/EmployeeDashboard"


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
            <Route path="/" element={<LandingPage />} />
            <Route path="/#home" element={<Hero />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["user"]}><Dashboard/></ProtectedRoute>}/>
            <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><Admin/></ProtectedRoute>}/>
            <Route path="/employeedashboard" element={<ProtectedRoute allowedRoles={["employee"]}><Employee/></ProtectedRoute>}/>
        </Routes>
    )
}