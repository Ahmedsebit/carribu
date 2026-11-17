import useAppLinks from '../hooks/useAppLinks'

export default function Footer() {
  const { adminUrl, parentApp, driverApp } = useAppLinks()

  const footerColumns = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Safety', href: '#safety' },
        { label: 'Discuss Pricing', href: '#contact' },
      ],
    },
    {
      title: 'Apps',
      links: [
        { label: 'Parent App', href: parentApp.downloadUrl, external: true },
        { label: 'Driver App', href: driverApp.downloadUrl, external: true },
        { label: 'Admin Portal', href: adminUrl, external: true },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'The School Day', href: '#school-day' },
        { label: 'FAQs', href: '#faq' },
        { label: 'Demo Enquiry', href: '#contact' },
        { label: 'Contact', href: 'mailto:hello@carribu.app' },
      ],
    },
  ]

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <a href="#hero" className="logo">
            Carribu<span>.</span>
          </a>
          <p>
            Smart school transport for Africa. Connecting parents, drivers, and
            schools with clearer journey information and transport records.
          </p>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title} className="footer-col">
            <h4>{col.title}</h4>
            {col.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.external && link.href !== '#'
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Carribu. All rights reserved. Made with ❤️ in Africa.</p>
      </div>
    </footer>
  )
}
