export function localDateString(date = new Date()) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}

const singleLine = value => String(value ?? '').replace(/[\r\n]+/g, ' ').trim()

export function prepareDemoRequest(fields, now = new Date()) {
  const values = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, singleLine(value)]))
  const errors = {}
  if (!values.schoolName) errors.schoolName = 'Enter your school name.'
  if (!values.contactName) errors.contactName = 'Enter a contact name.'
  if (!/^[^\s@]+@[^\s@]+$/.test(values.email || '')) errors.email = 'Enter a valid contact email.'
  if (!/^[1-9]\d*$/.test(values.fleetSize || '') || !Number.isSafeInteger(Number(values.fleetSize))) {
    errors.fleetSize = 'Enter a whole number of buses, at least 1.'
  }
  if (values.preferredDate) {
    const parsed = new Date(`${values.preferredDate}T00:00:00Z`)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.preferredDate) || Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== values.preferredDate) {
      errors.preferredDate = 'Choose a valid preferred date.'
    } else if (values.preferredDate < localDateString(now)) {
      errors.preferredDate = 'Choose today or a future date.'
    }
    if (!values.timezone) errors.timezone = 'Add a timezone for your preferred date.'
  }
  if (values.preferredTime && !values.preferredDate) errors.preferredDate = 'Choose a date to go with your preferred time.'
  if (values.preferredTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(values.preferredTime)) errors.preferredTime = 'Choose a valid time.'
  if (Object.keys(errors).length) return { errors, request: null }

  const subject = `Carribu demo request - ${values.schoolName}`
  const body = [
    'Hello Carribu,',
    '',
    'I would like to explore Carribu for our school.',
    '',
    `School: ${values.schoolName}`,
    `Contact: ${values.contactName}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone || 'Not provided'}`,
    `Fleet size: ${values.fleetSize} ${values.fleetSize === '1' ? 'bus' : 'buses'}`,
    `Preferred date/time: ${values.preferredDate ? `${values.preferredDate}${values.preferredTime ? ` at ${values.preferredTime}` : ' (time to be arranged)'} / ${values.timezone}` : 'To be arranged'}`,
    '',
    'Please contact me to discuss our setup and agree a demo time.',
    'The preferred slot above is a request, not a confirmed booking.',
  ].join('\n')
  return {
    errors,
    request: {
      subject,
      body,
      mailto: `mailto:hello@carribu.app?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    },
  }
}
