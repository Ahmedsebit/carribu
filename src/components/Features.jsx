import { useState } from 'react'
import Reveal from './Reveal'

const featureData = {
  parents: {
    label: '👨‍👩‍👧 For Parents',
    items: [
      {
        icon: '📍',
        title: 'Live Bus Tracking',
        desc: "Watch your child's bus in real time on the map. See speed, location, and driver details — right from your phone.",
      },
      {
        icon: '⏱️',
        title: 'ETA to Your Stop',
        desc: "Know exactly when the bus will arrive at your child's pickup point. No more waiting and wondering.",
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
        desc: 'Child staying home? Notify the driver instantly so they can skip the stop and stay on schedule.',
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
        desc: 'Your location is automatically shared during active trips so parents and schools always know where you are.',
      },
      {
        icon: '🗺️',
        title: 'Navigation to Next Stop',
        desc: 'Get turn-by-turn directions to the next pickup or drop-off point. Never miss a stop.',
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

  return (
    <section className="section features-section" id="features">
      <Reveal className="section-header">
        <span className="section-tag">✨ Features</span>
        <h2>Everything Your School Transport Needs</h2>
        <p>
          Three powerful apps, one seamless platform — built for the way African
          schools move.
        </p>
      </Reveal>

      <Reveal className="feature-tabs">
        {tabKeys.map((key) => (
          <button
            key={key}
            className={`feature-tab${activeTab === key ? ' active' : ''}`}
            role="tab"
            aria-selected={activeTab === key}
            aria-controls={`panel-${key}`}
            onClick={() => setActiveTab(key)}
          >
            {featureData[key].label}
          </button>
        ))}
      </Reveal>

      {tabKeys.map((key) => (
        <div
          key={key}
          className={`feature-panel${activeTab === key ? ' active' : ''}`}
          id={`panel-${key}`}
          role="tabpanel"
        >
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
