import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Drawing Study', tech: '2D / 3D inputs', desc: 'Customer drawings or sample parts are reviewed for tolerance, parting line, machining allowance, draft, shrinkage, and practical manufacturing risks.' },
  { num: '02', title: 'Design + CAM', tech: 'CAD/CAM planning', desc: 'Patterns, dies, core boxes, fixtures, or component details are modelled and toolpaths are planned for controlled VMC machining.' },
  { num: '03', title: 'Material Preparation', tech: 'Aluminium / CI / MS / tool steel', desc: 'Material is selected, cut, squared, and prepared before entering the machine floor so geometry starts from a stable base.' },
  { num: '04', title: 'VMC Machining', tech: 'Milling', desc: 'Roughing and finishing operations form cavities, locating faces, holes, pockets, profiles, and functional details.' },
  { num: '05', title: 'Fitting + Finishing', tech: 'Bench work + assembly', desc: 'Skilled hands remove burrs, polish working faces, match surfaces, assemble details, and make the tool ready for trial or dispatch.' },
  { num: '06', title: 'Inspection + Dispatch', tech: 'Dimensional release', desc: 'Critical dimensions, fitment, finish, and customer requirements are checked before packing and delivery.' },
]

export default function Process() {
  return (
    <section className="process-section section-brutal bg-dark" id="process">
      <div className="container">
        <div className="section-header-brutal">
          <div>
            <div className="bracket-text">[ Manufacturing Workflow ]</div>
            <h2>From drawing to production-ready tooling.</h2>
          </div>
          <p className="section-kicker">Every project follows a disciplined six-stage workflow — from drawing study to final inspection and dispatch.</p>
        </div>
        <div className="process-timeline">
          {steps.map((s, i) => (
            <motion.div className="process-step" key={s.num} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-50px' }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <div className="step-number">{s.num}</div>
              <div className="step-content">
                <h3>{s.title}</h3>
                <span className="step-tech">{s.tech}</span>
                <p>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
