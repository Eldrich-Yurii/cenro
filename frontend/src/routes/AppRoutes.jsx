import { Routes, Route } from "react-router"
import { useEffect } from "react"
import LandingPage from "../pages/landing/LandingPage"
import Announcements from "../pages/announcements/Announcements"
import Hero from "../pages/landing/heroSection/Hero"
import Login from "../pages/login/LoginPage"


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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Announcements />} />
        </Routes>
    )
}