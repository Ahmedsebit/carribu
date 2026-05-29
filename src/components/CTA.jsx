import Reveal from './Reveal'

export default function CTA() {
  return (
    <section className="cta-section" id="contact">
      <Reveal className="cta-inner">
        <h2>Ready to Transform Your School Transport?</h2>
        <p>
          Join the schools across Africa that trust Carribu to keep their
          students safe on every journey.
        </p>
        <a href="mailto:hello@carribu.app" className="btn-primary">
          🌍 Get Started Today
        </a>
      </Reveal>
    </section>
  )
}
