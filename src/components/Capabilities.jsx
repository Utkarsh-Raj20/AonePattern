import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const data = {
  'VMC Machining': [
    { name: 'Pattern cavity machining', specs: [['Use', 'Core boxes, mould cavities, split lines'], ['Material', 'Aluminium, CI, MS, tooling blocks'], ['Output', 'Accurate profiles and repeatable fit']] },
    { name: 'Die and mould finishing', specs: [['Use', 'Final contouring and surface cleanup'], ['Control', 'CAD/CAM toolpaths'], ['Output', 'Clean geometry ready for assembly']] },
    { name: 'Fixture machining', specs: [['Use', 'Locating plates, nests, checking aids'], ['Focus', 'Flatness, drilling, pockets'], ['Output', 'Shop-ready tooling support']] },
  ],
  'Tool Room Support': [
    { name: 'Bench fitting', specs: [['Use', 'Blue matching, polishing, deburring'], ['Team', 'Experienced tool-room hands'], ['Output', 'Smooth working assemblies']] },
    { name: 'Inspection and trials', specs: [['Use', 'Dimensional checks and fitment'], ['Tools', 'Gauges, height gauges, calipers'], ['Output', 'Release-ready components']] },
  ],
}

const tabs = Object.keys(data)

export default function Capabilities() {
  const [active, setActive] = useState(tabs[0])

  return (
    <section id="capabilities" className="section-brutal">
      <div className="container">
        <div className="section-header-brutal">
          <div>
            <div className="bracket-text">Infrastructure + Plant</div>
            <h2>A practical machine floor for precision pattern work.</h2>
          </div>
          <p className="section-kicker">Explore our machine floor capabilities — VMC machining and tool-room support, all under one roof.</p>
        </div>

        <div className="capabilities-tabs">
          {tabs.map((t) => (
            <button key={t} className={`bracket-btn${active === t ? ' active' : ''}`} onClick={() => setActive(t)}>
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div className="machine-grid" key={active} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
            {data[active].map((m, i) => (
              <motion.div className="machine-card" key={m.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <div className="brutal-index">0{i + 1}</div>
                <h4>{m.name}</h4>
                {m.specs.map(([label, val]) => (
                  <div className="spec-row" key={label}>
                    <span className="spec-label">{label}</span>
                    <span className="spec-value">{val}</span>
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
