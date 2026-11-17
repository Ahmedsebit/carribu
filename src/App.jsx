import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Safety from './components/Safety'
import CTA from './components/CTA'
import Footer from './components/Footer'
import KenteBorder from './components/KenteBorder'
import ScrollJourney from './components/ScrollJourney'
import SchoolDay from './components/SchoolDay'
import FAQ from './components/FAQ'
import './components/LandingDetails.css'

export default function App() {
  return (
    <div className="journey-page">
      <KenteBorder />
      <Navbar />
      <Hero />
      <SchoolDay />
      <Features />
      <KenteBorder />
      <HowItWorks />
      <Safety />
      <KenteBorder />
      <FAQ />
      <CTA />
      <KenteBorder />
      <Footer />
      <ScrollJourney />
    </div>
  )
}
