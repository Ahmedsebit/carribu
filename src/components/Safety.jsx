import Reveal from './Reveal'

const safetyItems = [
  {
    icon: '🔐',
    title: 'Role-Based Access',
    desc: 'Five secure roles — super admin, admin, coordinator, driver, and parent — each with carefully scoped permissions.',
  },
  {
    icon: '📝',
    title: 'Complete Audit Trail',
    desc: 'Every check-in, check-out, and absence is logged with timestamps. Full accountability for every journey.',
  },
  {
    icon: '🏫',
    title: 'School-Level Tenancy',
    desc: 'Data is strictly isolated per school. No cross-school access. Your information stays yours.',
  },
  {
    icon: '🔑',
    title: 'Secure Authentication',
    desc: 'JWT-based authentication keeps every session secure. Tokens are encrypted and auto-managed.',
  },
  {
    icon: '📍',
    title: 'Real-Time Visibility',
    desc: 'Live GPS tracking means every trip is visible. Know where the bus is — always.',
  },
  {
    icon: '🚨',
    title: 'Instant Alerts',
    desc: 'Arrival notifications, absence reports, and system alerts keep everyone informed in real time.',
  },
]

export default function Safety() {
  return (
    <section className="section safety-section" id="safety">
      <Reveal className="section-header">
        <span className="section-tag">🛡️ Safety &amp; Trust</span>
        <h2>Built with Safety at the Core</h2>
        <p>
          Every feature is designed to keep children safe and give parents
          confidence.
        </p>
      </Reveal>

      <div className="safety-grid">
        {safetyItems.map((item, i) => (
          <Reveal key={i} className="safety-card">
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
