import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { localDateString, prepareDemoRequest } from '../utils/demoRequest'

const fields = [
  { name: 'schoolName', label: 'School name', autoComplete: 'organization', required: true, maxLength: 160 },
  { name: 'contactName', label: 'Your name', autoComplete: 'name', required: true, maxLength: 120 },
  { name: 'email', label: 'Contact email', type: 'email', autoComplete: 'email', required: true, maxLength: 254 },
  { name: 'phone', label: 'Phone number', type: 'tel', autoComplete: 'tel', maxLength: 60 },
  { name: 'fleetSize', label: 'Number of buses', type: 'number', min: 1, step: 1, required: true },
  { name: 'preferredDate', label: 'Preferred date', type: 'date' },
  { name: 'preferredTime', label: 'Preferred time', type: 'time' },
  { name: 'timezone', label: 'Timezone', placeholder: 'For example, Africa/Nairobi', maxLength: 100 },
]

export default function CTA() {
  const [values, setValues] = useState(() => ({
    schoolName: '', contactName: '', email: '', phone: '', fleetSize: '', preferredDate: '', preferredTime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
  }))
  const [errors, setErrors] = useState({})
  const [draft, setDraft] = useState(null)
  const [copyState, setCopyState] = useState(null)
  const draftHeading = useRef(null)

  useEffect(() => {
    if (draft) draftHeading.current?.focus()
  }, [draft])

  const changeField = event => {
    const { name, value } = event.target
    setValues(current => ({ ...current, [name]: value }))
    setDraft(null)
    setErrors({})
    setCopyState(null)
  }

  const prepare = event => {
    event.preventDefault()
    const result = prepareDemoRequest(values)
    setErrors(result.errors)
    setDraft(result.request)
    setCopyState(null)
    if (!result.request) event.currentTarget.elements.namedItem(Object.keys(result.errors)[0])?.focus()
  }

  const copyRequest = async () => {
    const text = `To: hello@carribu.app\nSubject: ${draft.subject}\n\n${draft.body}`
    try {
      await navigator.clipboard.writeText(text)
      setCopyState({ body: draft.body, message: 'Copied. Paste into your email app and send it to hello@carribu.app.' })
    } catch {
      setCopyState({ body: draft.body, message: 'Automatic copying is unavailable. Select and copy the prepared text below, then paste it into your email app.' })
    }
  }

  return (
    <section className="cta-section demo-section" id="contact" aria-labelledby="demo-heading">
      <Reveal className="section-header">
        <span className="section-tag">The next stop is your school</span>
        <h2 id="demo-heading">Let&apos;s talk about your school run.</h2>
        <p>Bring your routes, your questions and your rollout goals.</p>
      </Reveal>
      <div className="demo-layout content-width">
        <aside className="demo-intro">
          <span className="content-eyebrow">A useful first conversation</span>
          <h3>A demo with your school in mind.</h3>
          <ul><li>Walk through the school, driver and parent workflows.</li><li>Discuss your fleet, existing tracking and roster import.</li><li>Scope onboarding, support and pricing needs.</li></ul>
          <div className="demo-transparency"><strong>This form prepares an email draft.</strong><p>It does not send automatically or upload your details. You choose whether to send it from your email app. A preferred time is not a confirmed booking.</p></div>
          <p>Prefer to write directly?<br /><a href="mailto:hello@carribu.app">hello@carribu.app</a></p>
        </aside>
        <form className="demo-form" onSubmit={prepare} aria-label="Prepare a demo enquiry">
          <p className="demo-form-note">Required fields are marked *. Please do not include student records or sensitive information.</p>
          <div className="demo-form-fields">
            {fields.map(({ name, label, required, ...input }) => (
              <div className="demo-field" key={name}>
                <label htmlFor={`demo-${name}`}>{label}{required ? ' *' : <span> (optional{ name === 'timezone' && values.preferredDate ? ' unless a date is chosen' : ''})</span>}</label>
                <input {...input} id={`demo-${name}`} name={name} value={values[name]} onChange={changeField}
                  required={required || (name === 'timezone' && Boolean(values.preferredDate))}
                  min={name === 'preferredDate' ? localDateString() : input.min}
                  aria-invalid={Boolean(errors[name]) || undefined}
                  aria-describedby={errors[name] ? `demo-${name}-error` : undefined} />
                {errors[name] && <span className="demo-field-error" id={`demo-${name}-error`}>{errors[name]}</span>}
              </div>
            ))}
          </div>
          <p className="demo-form-note">Check the timezone if you request a preferred date or time. Details stay in this page&apos;s temporary state; refreshing starts a new form.</p>
          {Object.keys(errors).length > 0 && <p className="demo-field-error" role="alert">Please correct the highlighted details before preparing your draft.</p>}
          <button type="submit" className="btn-primary">Prepare email draft <span aria-hidden="true">&rarr;</span></button>
        </form>
        {draft && <div className="demo-draft">
          <span className="content-eyebrow">You are in control</span>
          <h3 tabIndex={-1} ref={draftHeading}>Draft ready - not sent.</h3>
          <p>Open your email app, review the details and send the request yourself. If no email app opens, copy the text instead.</p>
          <div className="demo-draft-actions"><a className="btn-primary" href={draft.mailto}>Open email app</a><button type="button" className="demo-copy-button" onClick={copyRequest}>Copy request</button></div>
          <p role="status" className="demo-copy-status">{copyState?.body === draft.body ? copyState.message : ''}</p>
          <label htmlFor="demo-prepared-text">Prepared request (selectable text)</label>
          <textarea id="demo-prepared-text" readOnly rows={12} value={`To: hello@carribu.app\nSubject: ${draft.subject}\n\n${draft.body}`} />
          <p className="demo-form-note">Change a form field to replace this draft. Nothing has been sent by this website.</p>
        </div>}
      </div>
    </section>
  )
}
