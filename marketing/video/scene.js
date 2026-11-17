const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value))
const ease = value => 1 - (1 - clamp(value)) ** 3
const getJson = async path => {
  const response = await fetch(path)
  if (!response.ok) throw new Error(`Could not load ${path}`)
  return response.json()
}

if (new URLSearchParams(location.search).has('render')) document.documentElement.classList.add('render-mode')

const story = await getJson('./storyboard.json')
const timing = await getJson('./timing.json')
const stage = document.getElementById('stage')
const sceneContainer = document.getElementById('scenes')
const captionBox = document.getElementById('film-captions')
const captionText = captionBox.querySelector('p')
const progress = document.querySelector('.film-progress span')
const slider = document.getElementById('source-position')
const clock = document.getElementById('source-time')
const headers = `
  <div class="film-kente" aria-hidden="true"></div>
  <header class="film-header">
    <div><div class="film-logo">Carribu<span>.</span></div><p class="film-brandline">SCHOOL TRANSPORT, CONNECTED</p></div>
    <p class="film-header-note">PARENTS / DRIVERS / SCHOOLS<br>ONE CONNECTED SCHOOL RUN</p>
  </header>`

const parentPhone = `
  <p class="concept-label">ILLUSTRATIVE PARENT CONCEPT</p>
  <div class="phone-concept">
    <div class="phone-top">Carribu<span>Parent view</span></div>
    <div class="phone-body">
      <p class="phone-route">Morning Route A / DEMO 01</p><h3>Avery Sample</h3>
      <div class="phone-map">
        <svg viewBox="0 0 260 130" aria-hidden="true">
          <path d="M0 25H260M0 90H260M65 0V130M190 0V130" stroke="#FFF8F0" stroke-width="16"/>
          <path d="M32 100H96Q126 100 126 70V38H211" fill="none" stroke="#2E7D32" stroke-width="6" stroke-linecap="round"/>
          <circle cx="32" cy="100" r="8" fill="#FFF8F0" stroke="#2E7D32" stroke-width="3"/>
          <g class="map-example-bus"><rect x="-12" y="-8" width="24" height="16" rx="4" fill="#E8A838" stroke="#8B4513" stroke-width="2"/></g>
          <circle cx="211" cy="38" r="8" fill="#C1512D" stroke="#FFF8F0" stroke-width="3"/>
        </svg><p>Illustration, not a live map</p>
      </div>
      <div class="phone-status"><strong>Pickup recorded</strong><span>Example update / 07:10</span></div>
      <div class="phone-detail"><span>Latest fix</span><strong>Example / 07:20</strong></div>
      <div class="phone-detail"><span>Driver</span><strong>Demo Driver</strong></div>
    </div>
  </div>
  <p class="concept-footnote">Illustration, not an actual app screenshot.<br>All names, times and locations are examples.</p>`

const driverPhone = `
  <p class="concept-label">ILLUSTRATIVE DRIVER CONCEPT</p>
  <div class="phone-concept">
    <div class="phone-top">Carribu<span>Driver view</span></div>
    <div class="phone-body">
      <p class="phone-route">Morning Route A / DEMO 01</p><h3>Your morning run</h3>
      <div class="driver-summary"><strong>2 of 3</strong><span>students picked up in this example</span></div>
      <div class="roster-row"><span class="roster-avatar">A</span><div><strong>Avery Sample</strong><small>Pickup recorded</small></div><span class="roster-mark"></span></div>
      <div class="roster-row"><span class="roster-avatar">J</span><div><strong>Jordan Sample</strong><small>Pickup recorded</small></div><span class="roster-mark"></span></div>
      <div class="roster-row"><span class="roster-avatar">T</span><div><strong>Taylor Example</strong><small>Next stop</small></div><span class="roster-mark pending"></span></div>
    </div>
  </div>
  <p class="concept-footnote">Illustration, not an actual app screenshot.<br>All student names and trip details are examples.</p>`

const content = {
  welcome: `
    <div class="hero-title"><p class="film-eyebrow">Parents. Drivers. Schools.</p><h1 class="film-title"><span>One connected</span><span class="accent">school run.</span></h1></div>
    <p class="film-lead hero-lead" data-enter=".5">Clearer trip visibility.<br>Student transport records.<br>Everyday communication.</p>
    <div class="film-journey" data-journey="welcome"></div>`,
  journey: `
    <div class="journey-heading"><p class="film-eyebrow">From the front door to the school gates</p><h2 class="film-title">Every stop, a clearer picture.</h2></div>
    <div class="journey-stops"><div><span>01</span>Home</div><div><span>02</span>Pickup</div><div><span>03</span>On the road</div><div><span>04</span>School</div></div>
    <div class="film-journey" data-journey="journey"></div>
    <p class="film-note">Illustrative school-day journey / not live vehicle tracking</p>`,
  families: `
    <div class="split-copy"><p class="film-eyebrow">For families</p><h2 class="film-title"><span>Your child.</span><span class="accent">A clearer picture.</span></h2>
      <ul class="film-points"><li data-enter=".8">Linked children and assigned transport</li><li data-enter="2.7">Recorded pickup and drop-off updates</li><li data-enter="5.6">Driver contact when you need it</li></ul></div>${parentPhone}`,
  drivers: `
    <div class="split-copy"><p class="film-eyebrow">For drivers</p><h2 class="film-title"><span>The next stop,</span><span class="accent">without the guesswork.</span></h2>
      <ul class="film-points"><li data-enter=".8">Assigned trips and student lists</li><li data-enter="2.7">Pickup, absence and drop-off actions</li><li data-enter="5.6">Recorded progress for the school to review</li></ul></div>${driverPhone}`,
  schools: `
    <div class="school-copy"><p class="film-eyebrow">For the school office</p><h2 class="film-title"><span>The school run,</span><span class="accent">seen together.</span></h2>
      <ul class="film-points"><li data-enter=".8">Students, routes and fleet</li><li data-enter="3">Assigned drivers and trips</li><li data-enter="6">Recorded progress to review</li></ul></div>
    <p class="school-proof-label">ACTUAL ADMIN INTERFACE / SYNTHETIC DEMO DATA</p>
    <div class="school-image"><img src="../assets/school-admin-preview.png" width="1440" height="1080" alt="The actual Carribu admin dashboard using synthetic Example Academy data."></div>
    <p class="school-proof-note">Actual interface screenshot, cropped for this layout.</p>`,
  onboarding: `
    <div class="onboarding-title"><p class="film-eyebrow">Start small. Test the journey. Then roll out.</p><h2 class="film-title"><span>Prepare the roster.</span><span class="accent">Prove the journey.</span></h2></div>
    <div class="import-categories">
      <div class="import-category" data-enter=".6"><h3>New students</h3><p>Preview before adding</p></div>
      <div class="import-category" data-enter="1.7"><h3>Existing students</h3><p>Review proposed updates</p></div>
      <div class="import-category" data-enter="2.8"><h3>Row errors</h3><p>Correct or skip invalid rows</p></div>
    </div>
    <p class="rollout-label">A PRACTICAL ROLLOUT, AT YOUR SCHOOL'S PACE</p>
    <div class="film-rollout">
      <div data-enter="4.3"><small>01 / PLAN</small><strong>Set the scope.</strong><span>Fleet, routes and roles</span></div>
      <div data-enter="5"><small>02 / PREPARE</small><strong>Review the roster.</strong><span>Student and parent links</span></div>
      <div data-enter="5.7"><small>03 / PILOT</small><strong>Try a staff run.</strong><span>Devices and trip actions</span></div>
      <div data-enter="6.4"><small>04 / ROLL OUT</small><strong>Bring families in.</strong><span>Contacts and handovers</span></div>
    </div>
    <p class="film-note">Illustrative import categories. Review the file and row results before confirming valid rows.</p>`,
  contact: `
    <div class="outro-copy"><p class="film-eyebrow">The next stop is your school</p><h2 class="film-title"><span>Your routes.</span><span>Your questions.</span><span class="accent">Let's talk.</span></h2>
      <p class="film-lead">Request a demo for your transport team.</p><a class="outro-email" href="mailto:hello@carribu.app?subject=Carribu%20school%20demo%20enquiry">hello@carribu.app</a></div>
    <div class="outro-qr"><img src="../assets/email-qr.svg" width="450" height="450" alt="QR code to prepare a demo enquiry email to hello@carribu.app."></div>
    <p class="qr-label">Scan to draft an email<small>Send from your own email app.</small></p>
    <p class="film-note outro-note">Location updates and notifications depend on setup, connectivity and device state.</p>`,
}

const elements = story.scenes.map(scene => {
  const element = document.createElement('section')
  element.className = `film-scene scene-${scene.id}${['welcome', 'contact'].includes(scene.id) ? ' dark' : ''}`
  element.setAttribute('aria-label', scene.label)
  element.innerHTML = headers + content[scene.id]
  sceneContainer.append(element)
  return {
    ...scene, element,
    entries: [...element.querySelectorAll('[data-enter]')].map(entry => ({ element: entry, delay: Number(entry.dataset.enter) })),
  }
})

const artworkResponse = await fetch('../assets/school-run.svg')
if (!artworkResponse.ok) throw new Error('Could not load the school-run artwork')
const artwork = await artworkResponse.text()
const journeys = [...document.querySelectorAll('[data-journey]')].map(container => {
  const prefix = `${container.dataset.journey}-`
  const markup = artwork.replace(/id="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
    .replace(/aria-labelledby="([^"]+)"/g, (_, ids) => `aria-labelledby="${ids.split(' ').map(id => prefix + id).join(' ')}"`)
  container.innerHTML = markup
  const path = container.querySelector('[data-video-road]')
  const trail = path.cloneNode()
  trail.removeAttribute('data-video-road')
  trail.setAttribute('stroke', '#E8A838')
  trail.setAttribute('stroke-width', '32')
  trail.setAttribute('opacity', '.3')
  path.after(trail)
  return {
    scene: container.dataset.journey, path, trail,
    bus: container.querySelector('[data-video-bus]'), length: path.getTotalLength(),
  }
})

await document.fonts.ready
await Promise.all([...document.images].map(image => image.decode()))

function renderFrame(seconds) {
  const time = clamp(seconds, 0, story.duration)
  for (const scene of elements) {
    const local = time - scene.start
    const visible = time < scene.end || scene.end === story.duration
    const opacity = visible ? scene.start === 0 ? 1 : clamp((local + .4) / .4) : 0
    scene.element.style.opacity = String(opacity)
    scene.element.setAttribute('aria-hidden', String(opacity < .5))
    for (const entry of scene.entries) {
      const amount = ease((local - entry.delay) / .7)
      entry.element.style.opacity = String(amount)
      entry.element.style.transform = `translateY(${(1 - amount) * 22}px)`
    }
  }
  for (const journey of journeys) {
    const scene = story.scenes.find(scene => scene.id === journey.scene)
    const portion = clamp((time - scene.start) / (scene.end - scene.start))
    const distance = journey.length * (journey.scene === 'welcome' ? .35 + .14 * portion : .14 + .73 * portion)
    const point = journey.path.getPointAtLength(distance)
    const before = journey.path.getPointAtLength(Math.max(0, distance - 2))
    const after = journey.path.getPointAtLength(Math.min(journey.length, distance + 2))
    const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI
    journey.bus.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle}) translate(-75 -84)`)
    journey.trail.setAttribute('stroke-dasharray', `${distance} ${journey.length}`)
  }
  const journeyPortion = clamp((time - 9) / 11)
  document.querySelectorAll('.journey-stops div').forEach((stop, index) => {
    stop.classList.toggle('visited', journeyPortion >= [0, .23, .6, .88][index])
  })
  const parentPortion = clamp((time - 20) / 11)
  document.querySelector('.map-example-bus').setAttribute('transform', `translate(${32 + 94 * parentPortion} ${100 - 38 * parentPortion})`)
  document.querySelector('.school-image img').style.transform = `scale(${1 + .015 * clamp((time - 42) / 13)})`
  const cue = timing.cues.find(cue => time >= cue.start && time < cue.end)
  captionText.textContent = cue?.text || ''
  captionBox.style.opacity = cue ? '1' : '0'
  progress.style.transform = `scaleX(${time / story.duration})`
  slider.value = String(time)
  clock.textContent = `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')} / 1:15`
  stage.dataset.time = time.toFixed(3)
}

const resize = () => {
  stage.style.transform = `scale(${stage.parentElement.clientWidth / story.width})`
}
new ResizeObserver(resize).observe(stage.parentElement)
slider.addEventListener('input', () => renderFrame(Number(slider.value)))
resize()
renderFrame(3)
window.renderFrame = renderFrame
window.videoStory = story
window.videoTiming = timing
window.videoReady = true
