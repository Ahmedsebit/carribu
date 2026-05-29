import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setMenuOpen(false)
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-inner">
        <a href="#" className="logo" onClick={(e) => e.preventDefault()}>
          Carribu<span>.</span>
        </a>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          <li>
            <a href="#features" onClick={(e) => handleNavClick(e, 'features')}>
              Features
            </a>
          </li>
          <li>
            <a
              href="#how-it-works"
              onClick={(e) => handleNavClick(e, 'how-it-works')}
            >
              How It Works
            </a>
          </li>
          <li>
            <a href="#safety" onClick={(e) => handleNavClick(e, 'safety')}>
              Safety
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="nav-cta"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Get Started
            </a>
          </li>
        </ul>
        <button
          className="hamburger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
