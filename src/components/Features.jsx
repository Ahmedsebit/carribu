import { useState } from 'react'
import Reveal from './Reveal'
import AppPreview from './AppPreview'

const featureData = {
  parents: {
    label: '👨‍👩‍👧 For Parents',
    items: [
      {
        icon: '📍',
        title: 'Live Bus Tracking',
        desc: "Follow the latest available location for your child's active trip. Check its timestamp, speed and driver details.",
      },
      {
        icon: '⏱️',
        title: 'ETA to Your Stop',
        desc: "See an approximate arrival estimate for your child's pickup point. Actual arrival depends on traffic, trip progress and location freshness.",
      },
      {
        icon: '💬',
        title: 'Chat with Driver',
        desc: "Message your child's driver or coordinator directly. Get real-time updates and arrival notifications.",
      },
      {
        icon: '📞',
        title: 'One-Tap Call Driver',
        desc: 'Need to reach the driver urgently? Tap once to call them directly from the app.',
      },
      {
        icon: '🚫',
        title: 'Report Absence',
        desc: 'Child staying home? Report the absence so the driver and school can plan the trip with that context.',
      },
      {
        icon: '👧',
        title: 'View Children & Routes',
        desc: "See all your children's profiles, assigned routes, pickup points, and transport details in one place.",
      },
    ],
  },
  drivers: {
    label: '🚐 For Drivers',
    items: [
      {
        icon: '📋',
        title: "Today's Trips",
        desc: 'See all scheduled trips for the day at a glance. Start trips with one tap and manage your schedule effortlessly.',
      },
      {
        icon: '✅',
        title: 'Student Check-In/Out',
        desc: 'Mark each student as picked up, dropped off, or absent. Every status is logged and visible to parents and school.',
      },
      {
        icon: '📡',
        title: 'Live GPS Broadcasting',
        desc: 'Active trips use the configured vehicle tracker or phone location source. Updates depend on permissions, configuration and connectivity.',
      },
      {
        icon: '🗺️',
        title: 'Navigation to Next Stop',
        desc: 'Open navigation to the next pickup or drop-off point from the assigned trip itinerary.',
      },
      {
        icon: '💬',
        title: 'Message Parents',
        desc: 'Chat with parents and coordinators. Send arrival alerts, respond to absence reports, and stay connected.',
      },
      {
        icon: '🛣️',
        title: 'My Routes & Students',
        desc: 'View assigned routes, vehicle info, and the ordered list of students at each stop.',
      },
    ],
  },
  admins: {
    label: '🏫 For Schools',
    items: [
      {
        icon: '📊',
        title: 'School Dashboard',
        desc: "See total vehicles, students, routes, drivers, and today's trips — all at a glance from your admin panel.",
      },
      {
        icon: '🎓',
        title: 'Student Management',
        desc: 'Add, edit, search, and manage students. Track grades, pickup points, and parent links in one system.',
      },
      {
        icon: '🗺️',
        title: 'Route Planning',
        desc: 'Create and edit routes, assign vehicles and drivers, order pickup stops, and manage morning & afternoon runs.',
      },
      {
        icon: '🚐',
        title: 'Fleet Management',
        desc: "Track every vehicle's capacity, service dates, insurance expiry, and operational status.",
      },
      {
        icon: '📅',
        title: 'Trip Scheduling',
        desc: 'Schedule trips, start/end them, filter by date or status, and review detailed trip logs and histories.',
      },
      {
        icon: '🏫',
        title: 'Multi-School Support',
        desc: 'Manage multiple schools from one platform. Every record is securely scoped to the right school.',
      },
    ],
  },
}

const tabKeys = Object.keys(featureData)

export default function Features() {
  const [activeTab, setActiveTab] = useState('parents')
  const handleTabKey = event => {
    const index = tabKeys.indexOf(activeTab)
    const movement = { ArrowRight: 1, ArrowLeft: -1, Home: -index, End: tabKeys.length - 1 - index }
    if (!(event.key in movement)) return
    event.preventDefault()
    const next = (index + movement[event.key] + tabKeys.length) % tabKeys.length
    setActiveTab(tabKeys[next])
    event.currentTarget.querySelectorAll('[role="tab"]')[next].focus()
  }

  return (
    <section className="section features-section" id="features">
      <Reveal className="section-header">
        <span className="section-tag">✨ Features</span>
        <h2>Everything Your School Transport Needs</h2>
        <p>
          Explore a shared school run from the family, driver and school perspective.
        </p>
      </Reveal>

      <div className="feature-tabs" role="tablist" aria-label="Explore Carribu by role" onKeyDown={handleTabKey}>
        {tabKeys.map((key) => (
          <button
            key={key}
            id={`tab-${key}`}
            type="button"
            className={`feature-tab${activeTab === key ? ' active' : ''}`}
            role="tab"
            aria-selected={activeTab === key}
            aria-controls={`panel-${key}`}
            tabIndex={activeTab === key ? 0 : -1}
            onClick={() => setActiveTab(key)}
          >
            {featureData[key].label}
          </button>
        ))}
      </div>

      {tabKeys.map((key) => (
        <div
          key={key}
          className={`feature-panel${activeTab === key ? ' active' : ''}`}
          id={`panel-${key}`}
          role="tabpanel"
          aria-labelledby={`tab-${key}`}
          hidden={activeTab !== key}
          tabIndex={0}
        >
          <AppPreview role={key} />
          <div className="feature-grid">
            {featureData[key].items.map((item, i) => (
              <Reveal key={i} className="feature-card">
                <div className={`feature-icon ${key === 'parents' ? 'parent' : key === 'drivers' ? 'driver' : 'admin'}`}>
                  {item.icon}
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
