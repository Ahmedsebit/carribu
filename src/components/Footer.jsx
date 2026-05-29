const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
      { label: 'Safety', href: '#safety' },
      { label: 'Pricing', href: '#contact' },
    ],
  },
  {
    title: 'Apps',
    links: [
      { label: 'Parent App', href: '#' },
      { label: 'Driver App', href: '#' },
      { label: 'Admin Portal', href: '#' },
      { label: 'API Docs', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: 'mailto:hello@carribu.app' },
    ],
  },
]

const socialLinks = [
  { label: 'Twitter', icon: '𝕏' },
  { label: 'LinkedIn', icon: 'in' },
  { label: 'Instagram', icon: '📷' },
  { label: 'Facebook', icon: 'f' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#" className="logo">
            Carribu<span>.</span>
          </a>
          <p>
            Smart school transport for Africa. Connecting parents, drivers, and
            schools to keep every child safe on every journey.
          </p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            {col.links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Carribu. All rights reserved. Made with ❤️ in Africa.</p>
        <div className="social-links">
          {socialLinks.map((s) => (
            <a key={s.label} href="#" aria-label={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
