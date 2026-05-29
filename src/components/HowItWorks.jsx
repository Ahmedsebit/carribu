import Reveal from './Reveal'

const steps = [
  {
    number: '1',
    title: 'Register Your School',
    desc: "Sign up online and set up your school profile. Add your vehicles, routes, and staff. We'll help you configure everything.",
  },
  {
    number: '2',
    title: 'Enrol Students & Assign Routes',
    desc: "Import your students, assign them to routes and pickup points. Link parents to their children's profiles for instant access.",
  },
  {
    number: '3',
    title: 'Drivers Hit the Road',
    desc: 'Drivers download the app, log in, and see their daily trips. GPS tracking starts automatically — every pickup is logged.',
  },
  {
    number: '4',
    title: 'Parents Track in Real Time',
    desc: "Parents see their child's bus live on the map, get ETA updates, and communicate directly with the driver. Peace of mind, delivered.",
  },
]

export default function HowItWorks() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <Reveal className="section-header">
        <span className="section-tag">🔄 How It Works</span>
        <h2>Up and Running in Days, Not Months</h2>
        <p>Getting started with Carribu is simple — here's how.</p>
      </Reveal>

      <div className="steps-container">
        {steps.map((step) => (
          <Reveal key={step.number} className="step">
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
