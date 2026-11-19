import { useEffect, useRef } from 'react'
import './ScrollJourney.css'

const stops = [
  { id: 'hero', name: 'Home', section: 'Welcome aboard', sign: 'HOME', note: 'Follow an illustrated route, not a live bus.' },
  { id: 'school-day', name: 'The morning run', section: 'A school day', sign: 'START', note: 'See the day through a family, driver and school.' },
  { id: 'features', name: 'The pickup', section: 'Apps & features', sign: 'PICKUP', note: 'Switch roles to explore each perspective.' },
  { id: 'how-it-works', name: 'On the road', section: 'Getting started', sign: 'SETUP', note: 'Prepare the people, roster and pilot journey.' },
  { id: 'safety', name: 'Safe passage', section: 'Trust & support', sign: 'SAFETY', note: 'Understand access, location and communication.' },
  { id: 'faq', name: 'Ask the guide', section: 'Questions', sign: 'HELP', note: 'Get clear answers before the next stop.' },
  { id: 'contact', name: 'School gates', section: 'Demo enquiry', sign: 'SCHOOL', note: 'Prepare an email draft for your school.' },
]

function distanceAtY(path, length, y) {
  let low = 0
  let high = length
  for (let i = 0; i < 20; i++) {
    const middle = (low + high) / 2
    if (path.getPointAtLength(middle).y < y) low = middle
    else high = middle
  }
  return (low + high) / 2
}

function Bus() {
  return (
    <g className="journey-bus-art">
      <ellipse cx="0" cy="5" rx="26" ry="43" fill="var(--brand-blue-dark)" opacity=".18" />
      <g fill="var(--brand-blue-dark)">
        <rect x="-25" y="-25" width="9" height="16" rx="3" />
        <rect x="16" y="-25" width="9" height="16" rx="3" />
        <rect x="-25" y="13" width="9" height="16" rx="3" />
        <rect x="16" y="13" width="9" height="16" rx="3" />
      </g>
      <rect x="-20" y="-39" width="40" height="78" rx="10" fill="#C77B21" />
      <rect x="-19" y="-38" width="38" height="74" rx="9" fill="var(--brand-amber)" stroke="#FFF0C1" strokeWidth="2" />
      <rect x="-14" y="-31" width="28" height="11" rx="4" fill="var(--brand-blue-deep)" />
      <path d="M-11 -28 H9" stroke="#8EC7C6" strokeWidth="2" strokeLinecap="round" />
      <rect x="-13" y="-15" width="26" height="32" rx="5" fill="#FFDC85" />
      <path d="M-9 -10 H9 M-9 10 H9" stroke="var(--brand-amber)" strokeWidth="2" />
      <text x="0" y="4" textAnchor="middle" fill="#6C4018" fontSize="8" fontWeight="800" letterSpacing="1">BUS</text>
      <path d="M-13 22 Q0 18 13 22 L12 30 H-12 Z" fill="var(--brand-blue-deep)" />
      <path d="M-9 23 H7" stroke="#8EC7C6" strokeWidth="2" strokeLinecap="round" />
      <rect x="-17" y="32" width="7" height="4" rx="2" fill="#FFFBE5" />
      <rect x="10" y="32" width="7" height="4" rx="2" fill="#FFFBE5" />
      <path d="M-14 -36 H-9 M9 -36 H14" stroke="var(--brand-red)" strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

export default function ScrollJourney() {
  const layerRef = useRef(null)
  const pathRef = useRef(null)
  const trailRef = useRef(null)
  const busRef = useRef(null)
  const stopRefs = useRef([])
  const navigationRef = useRef(null)
  const statusRef = useRef(null)
  const noteRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const layer = layerRef.current
    const page = layer.closest('.journey-page')
    const path = pathRef.current
    const sections = stops.map(stop => document.getElementById(stop.id))
    if (sections.some(section => !section)) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let needsLayout = true
    let disposed = false
    let layout
    let previousStatus = ''
    let previousActive = -1

    const measure = () => {
      const bounds = page.getBoundingClientRect()
      const width = bounds.width
      const mobile = width <= 640
      const gutter = mobile ? 22 : Math.min(64, width * 0.045)
      const focus = Math.min(Math.max(window.innerHeight * 0.52, 180), 420)
      const top = bounds.top + window.scrollY
      const points = sections.map((section, index) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top + window.scrollY - top
        return {
          x: index % 2 ? width - gutter : gutter,
          y: index === 0 ? focus : sectionTop + Math.min(focus - 80, rect.height - 80),
          boundary: sectionTop,
        }
      })
      const bend = mobile ? 42 : 70
      let d = `M ${points[0].x} ${points[0].y}`
      for (let index = 1; index < points.length; index++) {
        const from = points[index - 1]
        const to = points[index]
        const crossing = to.boundary
        d += ` L ${from.x} ${crossing - bend}`
        d += ` C ${from.x} ${crossing - bend / 3} ${to.x} ${crossing + bend / 3} ${to.x} ${crossing + bend}`
        d += ` L ${to.x} ${to.y}`
      }
      layer.setAttribute('viewBox', `0 0 ${width} ${bounds.height}`)
      for (const road of layer.querySelectorAll('.journey-road')) road.setAttribute('d', d)
      points.forEach((point, index) => {
        stopRefs.current[index].setAttribute('transform', `translate(${point.x} ${point.y})`)
      })
      layout = { top, focus, points, length: path.getTotalLength(), scale: mobile ? 0.63 : 1 }
      previousActive = -1
      layer.dataset.ready = 'true'
    }

    const update = () => {
      frame = 0
      if (disposed) return
      if (needsLayout) {
        measure()
        needsLayout = false
      }
      const { top, focus, points, length, scale } = layout
      const y = Math.max(points[0].y, Math.min(points.at(-1).y, window.scrollY + focus - top))
      const distance = distanceAtY(path, length, y)
      const point = path.getPointAtLength(distance)
      const before = path.getPointAtLength(Math.max(0, distance - 2))
      const after = path.getPointAtLength(Math.min(length, distance + 2))
      const angle = Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI - 90
      busRef.current.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle}) scale(${scale})`)
      trailRef.current.setAttribute('stroke-dasharray', `${distance} ${length}`)
      progressRef.current.style.transform = `scaleX(${distance / length})`

      let active = 0
      points.forEach((stop, index) => { if (y >= stop.y - 20) active = index })
      const arrived = Math.abs(y - points[active].y) <= 24 || active === stops.length - 1
      const label = arrived
        ? `${stops[active].name} / ${stops[active].section}`
        : `Next stop: ${stops[active + 1].name}`
      if (label !== previousStatus) {
        statusRef.current.textContent = label
        previousStatus = label
      }
      for (const [index, link] of [...navigationRef.current.querySelectorAll('a')].entries()) {
        if (index === active) link.setAttribute('aria-current', 'step')
        else link.removeAttribute('aria-current')
        link.dataset.visited = String(index <= active)
        stopRefs.current[index].dataset.visited = String(index <= active)
      }
      navigationRef.current.dataset.arrived = String(active === stops.length - 1)
      if (active !== previousActive) {
        noteRef.current.textContent = stops[active].note
        const list = navigationRef.current.querySelector('ol')
        const current = list.querySelector('[aria-current="step"]')
        const left = current.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft
        list.scrollLeft = Math.max(0, left - (list.clientWidth - current.offsetWidth) / 2)
        previousActive = active
      }
    }

    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    const remeasure = () => { needsLayout = true; schedule() }
    const observer = new ResizeObserver(remeasure)
    observer.observe(page)
    sections.forEach(section => observer.observe(section))
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', remeasure)
    window.addEventListener('load', remeasure)
    motion.addEventListener('change', schedule)
    document.fonts.ready.then(() => { if (!disposed) remeasure() })
    schedule()
    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', remeasure)
      window.removeEventListener('load', remeasure)
      motion.removeEventListener('change', schedule)
    }
  }, [])

  return (
    <>
      <svg ref={layerRef} className="journey-layer" aria-hidden="true" focusable="false" preserveAspectRatio="none">
        <path className="journey-road journey-road-edge" />
        <path ref={pathRef} className="journey-road journey-road-surface" />
        <path ref={trailRef} className="journey-road journey-road-trail" strokeDasharray="0 1" />
        <path className="journey-road journey-road-dashes" />
        {stops.map((stop, index) => (
          <g key={stop.id} className="journey-stop" ref={element => { stopRefs.current[index] = element }}>
            <circle className="journey-stop-ring" r="15" />
            <circle className="journey-stop-core" r="9" />
            <text className="journey-stop-number" y="4" textAnchor="middle">{index + 1}</text>
            <text className="journey-stop-sign" y="-27" textAnchor="middle">{stop.sign}</text>
            {index === 0 && <g className="journey-landmark" transform="translate(-12 35)">
              <path d="M-3 9 L12 -3 L27 9" fill="none" stroke="var(--brand-red)" strokeWidth="4" strokeLinejoin="round" />
              <path d="M1 8 V27 H23 V8" fill="var(--brand-blue-light)" stroke="var(--brand-maroon)" strokeWidth="2" />
              <path d="M9 27 V16 H16 V27" fill="var(--brand-red)" />
            </g>}
            {index === 2 && <g className="journey-landmark" transform="translate(-12 35)">
              <path d="M12 18 V47" stroke="var(--brand-maroon)" strokeWidth="4" />
              <rect x="-2" y="0" width="28" height="24" rx="4" fill="var(--surface-muted)" stroke="var(--brand-blue)" strokeWidth="2" />
              <text x="12" y="15" textAnchor="middle" fill="var(--brand-blue)" fontSize="8" fontWeight="800">STOP</text>
            </g>}
            {index < stops.length - 1 && <g className="journey-scenery" style={{ '--scenery-side': index % 2 ? -1 : 1 }}>
              <path d="M0 5 V30" stroke="var(--brand-maroon)" strokeWidth="4" />
              <circle cy="0" r="13" fill="#57885A" /><circle cx="7" cy="-7" r="9" fill="#79A866" />
            </g>}
            {index === 4 && <g className="journey-crossing" transform="translate(-16 170)" fill="var(--surface-muted)" opacity=".8">
              {[0, 9, 18, 27].map(y => <rect key={y} y={y} width="32" height="4" rx="1" />)}
            </g>}
            {index === stops.length - 1 && <g className="journey-landmark" transform="translate(-17 35)">
              <path d="M0 10 H34 V32 H0 Z" fill="var(--brand-blue-light)" stroke="var(--brand-maroon)" strokeWidth="2" />
              <path d="M-3 10 L17 -3 L37 10" fill="var(--brand-red)" />
              <path d="M14 32 V20 H21 V32 M5 16 H10 M25 16 H30" fill="var(--brand-blue-deep)" stroke="var(--brand-blue-deep)" strokeWidth="2" />
              <path d="M17 -3 V-14 H29 L25 -10 L29 -7 H17" fill="var(--brand-amber)" stroke="var(--brand-maroon)" />
              <path d="M-5 30 V47 M39 30 V47 M-5 36 H9 V47 M39 36 H25 V47" fill="none" stroke="var(--brand-maroon)" strokeWidth="2" />
            </g>}
          </g>
        ))}
        <g ref={busRef} className="journey-bus"><Bus /></g>
      </svg>
      <nav className="journey-navigation" aria-label="Illustrated bus journey through Carribu" ref={navigationRef}>
        <div className="journey-navigation-copy">
          <span className="journey-eyebrow">Explore Carribu</span>
          <p ref={statusRef} role="status" aria-live="polite" aria-atomic="true">Home / Welcome aboard</p>
          <span ref={noteRef} className="journey-navigation-note">{stops[0].note}</span>
        </div>
        <ol>
          {stops.map((stop, index) => (
            <li key={stop.id}>
              <a href={`#${stop.id}`} aria-label={`${stop.section} - ${stop.name}`} title={`${stop.name}: ${stop.section}`}>
                <span aria-hidden="true">{index + 1}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="journey-navigation-track" aria-hidden="true"><span ref={progressRef} /></div>
      </nav>
    </>
  )
}
