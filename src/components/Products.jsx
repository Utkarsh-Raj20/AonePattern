import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Layers, Wrench, Cog } from 'lucide-react'

const categories = ['All', 'Patterns', 'Dies & Moulds', 'Fixtures', 'Components']

const products = [
  { name: 'Casting Pattern', material: 'Aluminium / CI / wood substitute', sector: 'Pump, valve, agriculture, machinery', cat: 'Patterns', Icon: Layers, image: null },
  { name: 'Core Box Assembly', material: 'Aluminium or cast iron', sector: 'Hydraulic and industrial housings', cat: 'Patterns', Icon: Layers, image: null },
  { name: 'Match Plate Pattern', material: 'Machined aluminium', sector: 'High-repeat casting production', cat: 'Patterns', Icon: Layers, image: null },
  { name: 'Die Insert', material: 'Tool steel / hardened steel', sector: 'Automotive and general engineering', cat: 'Dies & Moulds', Icon: Box, image: null },
  { name: 'Mould Cavity Block', material: 'Steel or aluminium tooling block', sector: 'Production tooling', cat: 'Dies & Moulds', Icon: Box, image: null },
  { name: 'Checking Fixture', material: 'MS frame with machined locators', sector: 'Inspection and assembly lines', cat: 'Fixtures', Icon: Wrench, image: null },
  { name: 'Machining Fixture', material: 'MS, EN series, hardened pads', sector: 'Repeatable VMC loading', cat: 'Fixtures', Icon: Wrench, image: null },
  { name: 'Turned Pins + Bushes', material: 'EN24 / EN31 / MS', sector: 'Tool-room assemblies', cat: 'Components', Icon: Cog, image: null },
  { name: 'Precision Spare Detail', material: 'As per drawing', sector: 'Maintenance and machine rebuilds', cat: 'Components', Icon: Cog, image: null },
]

export default function Products() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? products : products.filter((p) => p.cat === filter)

  return (
    <section className="products-section section-brutal" id="products">
      <div className="container">
        <div className="section-header-brutal">
          <div>
            <div className="bracket-text">Products & Dies</div>
            <h2>If you are looking for excellent patterns, tools and dies, our company is the best in terms of quality.</h2>
          </div>
          <p className="section-kicker">We manufacture and machine any pattern, tool, or die configuration strictly as per our customer requirements, backed by robust quality and on-time delivery.</p>
        </div>

        <div className="filter-bar">
          {categories.map((c) => (
            <button key={c} className={`bracket-btn${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <motion.div className="products-grid" layout>
          <AnimatePresence>
            {filtered.map((p) => (
              <motion.div className="product-card" key={p.name} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.25 }}>
                <div className="product-img">
                  {p.image ? (
                    <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <p.Icon size={56} strokeWidth={1.2} />
                  )}
                </div>
                <div className="product-info">
                  <h4>{p.name}</h4>
                  <div className="product-material">{p.material}</div>
                  <div className="product-sector">{p.sector}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
