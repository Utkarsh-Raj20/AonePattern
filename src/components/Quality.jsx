import { motion } from 'framer-motion'
import { Shield, Ruler, Microscope, FileCheck, Award, Target } from 'lucide-react'

const items = [
  { icon: Target, title: 'Tolerance Review', desc: 'Critical dimensions are reviewed before machining so the process supports the final fit, not just the drawing.' },
  { icon: Ruler, title: 'Dimensional Checks', desc: 'Machined faces, hole positions, cavity details, and mating surfaces are checked through the build.' },
  { icon: Shield, title: 'Material Control', desc: 'Material selection is matched to the tooling use case: aluminium, cast iron, MS, EN series, or tool steel as required.' },
  { icon: Microscope, title: 'Surface Finish', desc: 'Working faces are deburred, polished, and hand finished where the application demands clean release or accurate location.' },
  { icon: FileCheck, title: 'Trial Fitment', desc: 'Assemblies are checked for movement, alignment, matching, and practical shop-floor usability before dispatch.' },
  { icon: Award, title: 'Customer Satisfaction', desc: 'The release standard is simple: dependable tools, clear communication, and parts that support smooth production.' },
]

export default function Quality() {
  return (
    <section id="quality" className="section-brutal">
      <div className="container">
        <div className="section-header-brutal">
          <div>
            <div className="bracket-text">[ Service + Quality ]</div>
            <h2>Inspection built into the rhythm of the job.</h2>
          </div>
          <p className="section-kicker">The old profile emphasized customer satisfaction and final checks. This section says the same thing in a more modern, technical voice.</p>
        </div>
        <div className="quality-grid brutal-grid">
          {items.map((item, i) => (
            <motion.div className={`quality-card brutal-card${i === 0 || i === 5 ? ' dark' : ''}`} key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
              <div className="brutal-index">0{i + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <item.icon className="brutal-icon-huge" size={140} strokeWidth={0.8} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
