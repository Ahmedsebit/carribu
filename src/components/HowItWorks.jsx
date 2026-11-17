import Reveal from './Reveal'

const steps = [
  {
    number: '1',
    title: 'Plan the school setup',
    desc: 'Identify the transport coordinator, fleet size, routes and staff roles. Decide whether each bus will use a configured tracker or phone-based location.',
    outcome: 'A clear fleet list, named owners and tracking approach.',
  },
  {
    number: '2',
    title: 'Validate the student roster',
    desc: 'Prepare admission numbers, names and parent contacts in CSV or Excel. Preview new students, updates and row errors before confirming the valid rows, then assign routes and pickup points.',
    outcome: 'A reviewed roster, linked families and an upload history.',
  },
  {
    number: '3',
    title: 'Run a controlled pilot',
    desc: 'Configure the location source, check device permissions and test a route with staff. Practise pickup, absence, drop-off and stale-location scenarios before involving the full school.',
    outcome: 'A tested trip and a practical plan for missing updates.',
  },
  {
    number: '4',
    title: 'Invite families and roll out',
    desc: 'Confirm parent-child access, share app instructions and check notification setup. Agree the school contact and handover procedures, then expand from the pilot at the school\'s pace.',
    outcome: 'An agreed rollout checklist, not a one-size-fits-all deadline.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <Reveal className="section-header">
        <span className="section-tag">🔄 How It Works</span>
        <h2>A practical route from setup to school run.</h2>
        <p>Start with your people and data. Test the journey before you scale.</p>
      </Reveal>

      <div className="steps-container">
        {steps.map((step) => (
          <Reveal key={step.number} className="step">
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
              <p className="step-outcome"><strong>Checkpoint:</strong> {step.outcome}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="onboarding-checklist content-width">
        <div><span className="content-eyebrow">Bring to your demo</span><h3>Make the conversation specific to your school.</h3></div>
        <ul>
          <li>Approximate fleet and student numbers</li>
          <li>Morning and afternoon route patterns</li>
          <li>Existing trackers and driver handsets</li>
          <li>Your current roster format and rollout goals</li>
        </ul>
      </div>
    </section>
  )
}
