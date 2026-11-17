import Reveal from './Reveal'

const safetyItems = [
  {
    icon: '🔐',
    title: 'Role-Based Access',
    desc: 'Authenticated roles separate school administration, coordination, driver and parent workflows. Access depends on the assigned role and authorized school membership.',
  },
  {
    icon: '📝',
    title: 'Recorded Trip Actions',
    desc: 'Pickup, drop-off and absence records provide a trip history to review. These are recorded transport actions, not a substitute for school handover checks.',
  },
  {
    icon: '🏫',
    title: 'School & Family Context',
    desc: 'School workflows are scoped to authorized school access. Parents follow their linked children, including children at different schools where access is authorized.',
  },
  {
    icon: '🔑',
    title: 'Authenticated Sessions',
    desc: 'Signed session tokens authenticate API requests. School administrators should review who has access and remove accounts that no longer need it.',
  },
  {
    icon: '📍',
    title: 'Location with Context',
    desc: 'Active-trip location depends on the configured source, permissions and connectivity. Check the timestamp: a last-known point is not a fresh GPS fix.',
  },
  {
    icon: '🚨',
    title: 'Notification Expectations',
    desc: 'Trip updates and alerts support communication. Push delivery and presentation depend on setup, network and device state; they are not guaranteed.',
  },
]

export default function Safety() {
  return (
    <section className="section safety-section" id="safety">
      <Reveal className="section-header">
        <span className="section-tag">🛡️ Safety &amp; Trust</span>
        <h2>Clear responsibilities. Better visibility.</h2>
        <p>
          Support your school&apos;s transport procedures with useful records,
          appropriate access and honest expectations.
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
      <div className="trust-details content-width">
        <div>
          <h3>Data handling, agreed before rollout.</h3>
          <p>Student profiles, parent contacts, transport records and retained import files need an agreed access and retention process. Discuss retention and deletion arrangements with your school; this page does not set a retention policy.</p>
        </div>
        <div>
          <h3>A real conversation about support.</h3>
          <p>Use <a href="mailto:hello@carribu.app">hello@carribu.app</a> for product and setup enquiries. Confirm support scope and response expectations during onboarding. For an urgent transport concern, follow your school&apos;s contact procedure rather than waiting for an app alert.</p>
        </div>
      </div>
    </section>
  )
}
