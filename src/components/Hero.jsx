export default function Hero() {
  const handleClick = (e, targetId) => {
    e.preventDefault()
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <h1>
            Every Child's Journey,{' '}
            <span className="highlight">Safe &amp; Seen</span>
          </h1>
          <p className="hero-subtitle">
            The smart school transport platform that connects parents, drivers,
            and schools — so every ride is tracked, every child accounted for.
          </p>
          <p className="hero-swahili">🌍 Karibu — Welcome to peace of mind.</p>
          <div className="hero-buttons">
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => handleClick(e, 'contact')}
            >
              🚀 Request a Demo
            </a>
            <a
              href="#features"
              className="btn-secondary"
              onClick={(e) => handleClick(e, 'features')}
            >
              ▶ See Features
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="phone-mockup secondary">
            <div className="phone-screen">
              <div
                className="phone-status-bar"
                style={{ background: 'var(--leaf)' }}
              >
                👨‍✈️ Driver App
              </div>
              <div className="phone-app-content">
                <div className="phone-header">
                  <h3>Today's Trip</h3>
                  <p>Route A — Morning</p>
                </div>
                <div className="phone-card">
                  <div
                    className="phone-card-icon"
                    style={{ background: '#E8F5E9' }}
                  >
                    ✅
                  </div>
                  <div className="phone-card-text">
                    <h4>Amani K.</h4>
                    <p>Picked up at 7:15 AM</p>
                  </div>
                </div>
                <div className="phone-card">
                  <div
                    className="phone-card-icon"
                    style={{ background: '#FFF3E0' }}
                  >
                    ⏳
                  </div>
                  <div className="phone-card-text">
                    <h4>Zuri M.</h4>
                    <p>Next stop — 2 min away</p>
                  </div>
                </div>
                <div className="phone-card">
                  <div
                    className="phone-card-icon"
                    style={{ background: '#FFEBEE' }}
                  >
                    🔴
                  </div>
                  <div className="phone-card-text">
                    <h4>Jabari O.</h4>
                    <p>Absent today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="phone-status-bar">🎒 Carribu Parent</div>
              <div className="phone-app-content">
                <div className="phone-header">
                  <h3>Live Tracking</h3>
                  <p>Bus is on the way!</p>
                </div>
                <div className="phone-map-placeholder">
                  <div className="map-road"></div>
                  <div className="map-bus-dot">🚌</div>
                </div>
                <div className="phone-card">
                  <div
                    className="phone-card-icon"
                    style={{ background: '#E3F2FD' }}
                  >
                    📍
                  </div>
                  <div className="phone-card-text">
                    <h4>ETA: 6 minutes</h4>
                    <p>Approaching Kilimani Stop</p>
                  </div>
                </div>
                <div className="phone-card">
                  <div
                    className="phone-card-icon"
                    style={{ background: '#FFF3E0' }}
                  >
                    📞
                  </div>
                  <div className="phone-card-text">
                    <h4>Driver: Joseph M.</h4>
                    <p>Tap to call or message</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
