import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Safety from './components/Safety'
import CTA from './components/CTA'
import Footer from './components/Footer'
import KenteBorder from './components/KenteBorder'

export default function App() {
  return (
    <>
      <KenteBorder />
      <Navbar />
      <Hero />
      <Features />
      <KenteBorder />
      <HowItWorks />
      <Safety />
      <KenteBorder />
      <CTA />
      <KenteBorder />
      <Footer />
    </>
  )
}
