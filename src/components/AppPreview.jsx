const perspectives = {
  parents: {
    title: 'Your child. Your route. A clearer picture.',
    description: 'Follow the latest available location, review recorded pickup updates and contact the driver from the parent experience.',
    points: ['Linked children and their assigned transport', 'Location freshness alongside approximate arrival estimates', 'Recorded trip updates and driver contact'],
  },
  drivers: {
    title: 'The next stop, without the guesswork.',
    description: 'An example morning run brings the itinerary, student list and transport actions into one driver workflow.',
    points: ['Assigned trips and ordered stops', 'Pickup, absence and drop-off actions', 'Recorded progress the school can review'],
  },
  admins: {
    title: 'The school run, seen together.',
    description: 'The actual admin interface brings fleet, trip and driver information into a shared operational overview.',
    points: ['School-scoped fleet and trip overview', 'Student imports with validation and upload history', 'Route, roster and driver administration'],
  },
}

export default function AppPreview({ role }) {
  const perspective = perspectives[role]
  return (
    <div className={`app-showcase content-width app-showcase-${role}`}>
      <div className="app-showcase-copy">
        <span className="content-eyebrow">One example morning. Three perspectives.</span>
        <h3>{perspective.title}</h3>
        <p>{perspective.description}</p>
        <ul>{perspective.points.map(point => <li key={point}>{point}</li>)}</ul>
        <a href="#contact" className="text-link">Explore this in a demo <span aria-hidden="true">&rarr;</span></a>
      </div>
      {role === 'admins' ? (
        <figure className="admin-preview">
          <a href="/images/school-admin-preview.png" target="_blank" rel="noopener noreferrer" aria-label="Open full-size school admin screenshot with sample data">
            <img src="/images/school-admin-preview.png" alt="Actual Carribu school admin dashboard showing sample fleet totals, an active trip and a completed trip for Example Academy."
              width="1440" height="1080" loading="lazy" decoding="async" />
          </a>
          <figcaption>Actual admin interface, rendered with synthetic demo data. Select the image to enlarge.</figcaption>
        </figure>
      ) : (
        <figure className="mobile-preview">
          <div className="preview-phone" aria-label={`Illustrative ${role === 'parents' ? 'parent' : 'driver'} app preview`}>
            <div className="preview-phone-header"><span>Carribu</span><span>{role === 'parents' ? 'Parent view' : 'Driver view'}</span></div>
            <div className="preview-phone-body">
              <span className="preview-trip-label">Morning Route A / DEMO 01</span>
              <h4>{role === 'parents' ? 'Avery Sample' : 'Your morning run'}</h4>
              {role === 'parents' ? <>
                <div className="preview-map" aria-hidden="true">
                  <svg viewBox="0 0 260 130">
                    <path d="M0 25 H260 M0 90 H260 M65 0 V130 M190 0 V130" stroke="#FFF8F0" strokeWidth="16" />
                    <path d="M32 100 H96 Q126 100 126 70 V38 H211" fill="none" stroke="#2E7D32" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="32" cy="100" r="8" fill="#FFF8F0" stroke="#2E7D32" strokeWidth="3" />
                    <rect x="114" y="56" width="24" height="16" rx="4" fill="#E8A838" stroke="#8B4513" strokeWidth="2" />
                    <circle cx="211" cy="38" r="8" fill="#C1512D" stroke="#FFF8F0" strokeWidth="3" />
                  </svg>
                  <span>Illustration, not a live map</span>
                </div>
                <div className="preview-status"><span className="preview-status-dot" /><div><strong>Pickup recorded</strong><small>Example update / 07:10</small></div></div>
                <div className="preview-detail"><span>Latest fix</span><strong>Example / 07:20</strong></div>
                <div className="preview-detail"><span>Driver</span><strong>Demo Driver</strong></div>
              </> : <>
                <div className="preview-run-summary"><strong>2 of 3</strong><span>students picked up in this example</span></div>
                {[['Avery Sample', 'Pickup recorded'], ['Jordan Sample', 'Pickup recorded'], ['Taylor Example', 'Next stop']].map(([name, status]) => (
                  <div className="preview-roster" key={name}><span className="preview-avatar">{name[0]}</span><div><strong>{name}</strong><small>{status}</small></div><span className={`preview-roster-dot${status === 'Next stop' ? ' pending' : ''}`} /></div>
                ))}
                <div className="preview-next-stop"><small>UP NEXT</small><strong>Example pickup point</strong><span>Follow the assigned itinerary</span></div>
              </>}
            </div>
          </div>
          <figcaption>Illustrative {role === 'parents' ? 'parent' : 'driver'} concept, not an actual app screenshot. All names, times and locations are examples.</figcaption>
        </figure>
      )}
    </div>
  )
}
