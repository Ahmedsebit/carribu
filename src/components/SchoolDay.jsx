import { useState } from 'react'
import Reveal from './Reveal'

const stages = [
  {
    name: 'At home', time: '07:00', title: 'The day starts with a shared plan.',
    summary: 'A school, a driver and a family should not have to piece the morning together in separate conversations.',
    parents: 'Check the assigned route and pickup details for your linked child.',
    drivers: 'Review the scheduled trip, vehicle and student list before setting off.',
    schools: 'Set up the roster, driver and route so everyone works from the same plan.',
    event: 'Example: morning trip scheduled',
  },
  {
    name: 'At pickup', time: '07:10', title: 'A pickup becomes a recorded action.',
    summary: 'The driver records the pickup or absence. The school and family can then follow the recorded trip status.',
    parents: 'View the pickup update for your child. Push presentation depends on device setup and connectivity.',
    drivers: 'Mark the student picked up, or record an absence instead of leaving an unclear status.',
    schools: 'Review pickup progress and investigate students whose status needs attention.',
    event: 'Example: Avery Sample - pickup recorded',
  },
  {
    name: 'On the road', time: '07:20', title: 'More context than a dot on a map.',
    summary: 'Location, trip progress and the next stop help explain what is happening. The timestamp matters as much as the position.',
    parents: 'Check the latest available bus position and approximate ETA, alongside its freshness.',
    drivers: 'Follow the trip itinerary and keep student actions up to date at each stop.',
    schools: 'Monitor active trips and distinguish a current fix from a last-known location.',
    event: 'Example: Morning Route A - trip in progress',
  },
  {
    name: 'At school', time: '07:35', title: 'Finish with a clear handover record.',
    summary: 'Recorded drop-offs and trip logs give the school and family a transport history to review.',
    parents: 'Check the recorded drop-off update and use the school contact process if anything is unclear.',
    drivers: 'Record drop-offs and resolve the student roster before completing the trip.',
    schools: 'Review the completed journey and follow the school handover procedure. A recorded action is not independent proof of safety.',
    event: 'Example: school drop-off recorded',
  },
]

export default function SchoolDay() {
  const [active, setActive] = useState(0)
  const stage = stages[active]
  const selectWithKeyboard = event => {
    const directions = { ArrowRight: 1, ArrowLeft: -1, Home: -active, End: stages.length - 1 - active }
    if (!(event.key in directions)) return
    event.preventDefault()
    const next = (active + directions[event.key] + stages.length) % stages.length
    setActive(next)
    event.currentTarget.querySelectorAll('[role="tab"]')[next].focus()
  }

  return (
    <section className="section school-day-section" id="school-day" aria-labelledby="school-day-heading">
      <Reveal className="section-header">
        <span className="section-tag">A school day, connected</span>
        <h2 id="school-day-heading">One morning. Everyone in the loop.</h2>
        <p>Follow an example journey from the front door to the school gates.</p>
      </Reveal>
      <div className="school-day-experience content-width">
        <div className="school-day-tabs" role="tablist" aria-label="Stages of a school day" onKeyDown={selectWithKeyboard}>
          {stages.map((item, index) => (
            <button key={item.name} id={`day-tab-${index}`} role="tab" type="button"
              aria-selected={active === index} aria-controls="school-day-panel" tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}>
              <span className="day-step-number">0{index + 1}</span>
              <span>{item.name}<small>Example {item.time}</small></span>
            </button>
          ))}
        </div>
        <div className="school-day-landscape">
          <svg viewBox="0 0 640 180" aria-hidden="true" focusable="false">
            <path d="M0 112 Q120 55 255 96 T640 77 V180 H0Z" fill="var(--brand-blue-tint)" />
            <path d="M0 140 Q160 99 340 135 T640 113 V180 H0Z" fill="var(--brand-blue-light)" />
            <path d="M43 120 H597" stroke="var(--brand-blue-light)" strokeWidth="35" strokeLinecap="round" />
            <path d="M43 120 H597" stroke="var(--brand-blue-dark)" strokeWidth="26" strokeLinecap="round" />
            <path d="M43 120 H597" stroke="#FFE7AF" strokeWidth="2" strokeDasharray="9 10" />
            <g transform="translate(45 32)">
              <path d="M-9 24 L16 2 L41 24" fill="var(--brand-red)" />
              <path d="M-3 24 H35 V60 H-3Z" fill="var(--surface-muted)" stroke="var(--brand-maroon)" strokeWidth="2" />
              <path d="M11 60 V39 H24 V60" fill="var(--brand-amber)" />
            </g>
            <g transform="translate(220 46)">
              <path d="M10 15 V47" stroke="var(--brand-maroon)" strokeWidth="4" />
              <rect x="-5" y="-2" width="31" height="24" rx="4" fill="var(--surface-muted)" stroke="var(--brand-blue)" strokeWidth="3" />
              <text x="10" y="13" textAnchor="middle" fill="var(--brand-blue)" fontSize="9" fontWeight="700">STOP</text>
            </g>
            {[147, 352, 424].map(x => <g key={x} transform={`translate(${x} 39)`}>
              <path d="M0 18 V53" stroke="var(--brand-maroon)" strokeWidth="5" />
              <circle cy="10" r="20" fill="#57885A" /><circle cx="10" cy="3" r="13" fill="#79A866" />
            </g>)}
            <g transform="translate(535 24)">
              <path d="M-5 25 L25 4 L55 25" fill="var(--brand-red)" />
              <path d="M0 25 H50 V68 H0Z" fill="var(--surface-muted)" stroke="var(--brand-maroon)" strokeWidth="2" />
              <path d="M19 68 V45 H32 V68 M7 35 H14 M36 35 H43" stroke="var(--brand-blue-deep)" strokeWidth="5" />
              <path d="M25 4 V-14 H45 L37 -8 L45 -2 H25" fill="var(--brand-amber)" stroke="var(--brand-maroon)" />
            </g>
            <g className="school-day-bus" style={{ transform: `translate(${[64, 230, 396, 560][active]}px, 120px)` }}>
              <rect x="-23" y="-17" width="46" height="28" rx="5" fill="var(--brand-amber)" stroke="var(--surface-muted)" strokeWidth="2" />
              {[-15, -3, 9].map(x => <rect key={x} x={x} y="-12" width="8" height="9" rx="1" fill="var(--brand-blue-deep)" />)}
              <circle cx="-13" cy="12" r="6" fill="var(--brand-blue-dark)" /><circle cx="13" cy="12" r="6" fill="var(--brand-blue-dark)" />
            </g>
          </svg>
          <span className="sample-label">Illustrative morning - not live tracking</span>
        </div>
        <div id="school-day-panel" role="tabpanel" aria-labelledby={`day-tab-${active}`} tabIndex={0} className="school-day-panel">
          <div className="school-day-story">
            <span className="content-eyebrow">Stop 0{active + 1} / {stage.name}</span>
            <h3>{stage.title}</h3>
            <p>{stage.summary}</p>
            <div className="example-event"><span aria-hidden="true" />{stage.event}</div>
          </div>
          <div className="day-perspectives">
            {[['parents', 'For the family'], ['drivers', 'For the driver'], ['schools', 'For the school']].map(([key, title]) => (
              <div key={key}><h4>{title}</h4><p>{stage[key]}</p></div>
            ))}
          </div>
        </div>
      </div>
      <p className="section-footnote">Sample times only. Actual trip progress, estimates and notifications depend on recorded actions, configuration and connectivity.</p>
    </section>
  )
}
