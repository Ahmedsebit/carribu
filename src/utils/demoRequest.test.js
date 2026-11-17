import assert from 'node:assert/strict'
import test from 'node:test'
import { prepareDemoRequest } from './demoRequest.js'

const now = new Date(2026, 10, 17, 12)
const details = {
  schoolName: ' Example Academy ', contactName: ' Demo Coordinator ', email: 'demo@example.test',
  phone: '', fleetSize: '3', preferredDate: '', preferredTime: '', timezone: 'Africa/Nairobi',
}

test('creates an encoded draft with no automatic booking or sending', () => {
  const { errors, request } = prepareDemoRequest({
    ...details, schoolName: 'A & B / École', contactName: 'Name + Example',
    preferredDate: '2026-11-18', preferredTime: '09:30',
  }, now)
  assert.deepEqual(errors, {})
  const url = new URL(request.mailto)
  assert.equal(url.pathname, 'hello@carribu.app')
  assert.equal(url.searchParams.get('subject'), 'Carribu demo request - A & B / École')
  assert.equal(url.searchParams.get('body'), request.body)
  assert.match(request.body, /Contact: Name \+ Example/)
  assert.match(request.body, /2026-11-18 at 09:30 \/ Africa\/Nairobi/)
  assert.match(request.body, /not a confirmed booking/)
})

test('rejects whitespace-only required fields, malformed email and invalid bus counts', () => {
  for (const [field, values] of Object.entries({
    schoolName: ['  '], contactName: ['\n '], email: ['not-an-email', 'a b@example.test'],
    fleetSize: ['', '0', '-1', '1.5', 'Infinity', '9007199254740992'],
  })) {
    for (const value of values) {
      const { errors, request } = prepareDemoRequest({ ...details, [field]: value }, now)
      assert.ok(errors[field], `${field}: ${value}`)
      assert.equal(request, null)
    }
  }
})

test('validates preferred date, time and timezone without requiring a slot', () => {
  for (const [changes, field] of [
    [{ preferredDate: '2026-11-16' }, 'preferredDate'],
    [{ preferredDate: '2026-02-30' }, 'preferredDate'],
    [{ preferredDate: 'not-a-date' }, 'preferredDate'],
    [{ preferredTime: '09:30' }, 'preferredDate'],
    [{ preferredDate: '2026-11-18', preferredTime: '25:01' }, 'preferredTime'],
    [{ preferredDate: '2026-11-18', timezone: ' ' }, 'timezone'],
  ]) {
    assert.ok(prepareDemoRequest({ ...details, ...changes }, now).errors[field])
  }
  assert.ok(prepareDemoRequest(details, now).request)
  assert.ok(prepareDemoRequest({ ...details, preferredDate: '2026-11-17' }, now).request)
})

test('keeps form text in one subject line and handles optional contact details', () => {
  const { request } = prepareDemoRequest({ ...details, schoolName: 'Demo\nSchool\r\nExample', fleetSize: '1' }, now)
  assert.equal(request.subject, 'Carribu demo request - Demo School Example')
  assert.match(request.body, /Fleet size: 1 bus\n/)
  assert.match(request.body, /Phone: Not provided/)
  assert.match(request.body, /Preferred date\/time: To be arranged/)
})
