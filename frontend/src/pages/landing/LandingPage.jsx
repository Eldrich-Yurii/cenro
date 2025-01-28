import Hero from "./heroSection/Hero"
import About from "./about/AboutSection"

export default function LandingPage() {
    return (
        // landing page container
        <div className="font-inter">
            <Hero />
            <About />
        </div>
    )
}