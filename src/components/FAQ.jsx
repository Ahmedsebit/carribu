import { useState } from 'react'
import Reveal from './Reveal'

const questions = [
  ['Does every bus need a dedicated GPS tracker?', 'Location can come from a configured vehicle tracker or from driver-phone tracking where that mode is configured. Confirm device compatibility, installation and the intended source during setup. A linked tracker going offline does not automatically make the driver phone its fallback.'],
  ['What happens if a tracker, phone or network is offline?', 'Location updates can be delayed or unavailable. Check the time of the last fix rather than treating a visible map point as current. Follow the school contact procedure when an update is missing; the website animation is not evidence that a real bus is moving.'],
  ['Can parents see other students or other schools?', 'Parents follow their linked children and the transport information they are authorized to access. A parent can have linked children at different schools. School administration is scoped by authorized school membership and role. Review those assignments during onboarding.'],
  ['Are pickup notifications and arrival estimates guaranteed?', 'No. Pickup and drop-off status depends on recorded actions. Push notifications depend on device registration, permissions, connectivity and device behavior. ETAs are estimates, not promised arrival times. Use the school contact process if a status is unclear.'],
  ['Can we import our existing student spreadsheet?', 'Yes. The school admin can preview CSV, XLS and XLSX imports. File type and columns are checked before rows are validated. Admission numbers match existing students within the school. Review new students, updates and errors before confirming valid rows; the original upload and result counts remain in the school upload history.'],
  ['What do we need to get started?', 'Bring approximate fleet and student numbers, route patterns, a sample roster structure, existing tracker details and the handsets you intend to use. Plan a controlled pilot to check access, location, recorded student actions and communication before a wider rollout.'],
  ['Which phones and app versions are supported?', 'Ask for the current parent and driver app builds and confirm your target handsets, OS versions and required permissions during onboarding. The mobile illustrations on this page are not device-compatibility guarantees. Available app download links are in the footer.'],
  ['How long is school and student data kept?', 'Confirm access, retention, original-file storage and deletion arrangements with your school before rollout. This landing page does not publish a fixed retention period or replace the school-specific arrangements.'],
  ['How much does Carribu cost?', 'Discuss your fleet size, tracking setup, onboarding and support needs in a demo enquiry so pricing can be scoped to your school. No fixed price, free-trial period or contract term is promised on this page.'],
  ['Where do we go for help?', 'For setup and product enquiries, email hello@carribu.app. Agree support scope and response expectations during onboarding. For an urgent concern about a child or journey, use your school transport contact process instead of waiting for a product-support response.'],
  ['Are the previews and moving bus real live data?', 'No. The moving bus and school-day story are illustrations. Parent and driver previews are labeled concepts, not actual screenshots. The school admin image is the actual admin interface rendered with synthetic demonstration data, not a customer account or a live feed.'],
  ['Does the demo form send a request automatically?', 'No. The form only prepares a draft in your browser. Open your email app and send it yourself, or copy the text into an email to hello@carribu.app. No booking is confirmed and the form does not upload your details. Editing the form clears the old draft.'],
]

export default function FAQ() {
  const [query, setQuery] = useState('')
  const results = questions.filter(pair => pair.join(' ').toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <section className="section faq-section" id="faq" aria-labelledby="faq-heading">
      <Reveal className="section-header">
        <span className="section-tag">Before you climb aboard</span>
        <h2 id="faq-heading">Good questions. Clear answers.</h2>
        <p>The practical details behind the school run.</p>
      </Reveal>
      <div className="faq-content">
        <label htmlFor="faq-search" className="content-eyebrow">Find an answer</label>
        <input id="faq-search" className="faq-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try tracking, spreadsheets or support..." />
        <p className="faq-count" role="status">{results.length} {results.length === 1 ? 'answer' : 'answers'}{query.trim() ? ' found' : ' to explore'}</p>
        <div className="faq-list">
          {results.map(([question, answer]) => (
            <details className="faq-item" key={question}>
              <summary>{question}</summary><p>{answer}</p>
            </details>
          ))}
        </div>
        {!results.length && <div className="faq-empty"><p>No matching answers. Try another word, or include your question in a demo enquiry.</p><button type="button" className="text-link" onClick={() => setQuery('')}>Clear search</button></div>}
        <p className="faq-contact">Need to discuss your setup? <a href="#contact" className="text-link">Prepare a demo enquiry</a></p>
      </div>
    </section>
  )
}
