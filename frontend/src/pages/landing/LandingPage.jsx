import Hero from "./heroSection/Hero"
import About from "./about/AboutSection"
import Contact from "./contact/Contact"

export default function LandingPage() {
    return (
        // landing page container
        <div className="font-inter">
            <Hero />
            <About />
            <Contact />
        </div>
    )
}