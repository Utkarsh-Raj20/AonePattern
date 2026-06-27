import { motion } from 'framer-motion'
import { Car, Factory, Cog, Flame, Gauge, Tractor, Dumbbell } from 'lucide-react'

const industries = [
  { icon: Car, label: 'GS AUTO' },
  { icon: Factory, label: 'Mehru Casting' },
  { icon: Cog, label: 'GSAI' },
  { icon: Flame, label: 'Hi Tech Casting' },
  { icon: Gauge, label: 'STAR FLEX' },
  { icon: Tractor, label: 'PREET TRACTORS' },
  { icon: Tractor, label: 'SONALIKA' },
  { icon: Dumbbell, label: 'FITEX' },
]

export default function Industries() {
  return (
    <section className="industries-section section-brutal panel-red">
      <div className="container">
        <div className="section-header-brutal">
          <div>
            <div className="bracket-text">Preeminent Partners</div>
            <h2>Industries and Casting Houses We Supply.</h2>
          </div>
          <p className="section-kicker">We partner with leading manufacturing, casting, and automotive giants to supply high-fidelity precision patterns, tools, and die components.</p>
        </div>
        <div className="industries-grid">
          {industries.map((ind, i) => (
            <motion.div className="industry-chip" key={ind.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <ind.icon size={22} />
              <span>{ind.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
