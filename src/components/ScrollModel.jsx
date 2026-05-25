import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import RotatingToolModel from './RotatingToolModel'

export default function ScrollModel() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 0.95])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])
  const y = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <section className="split-layout" ref={containerRef}>
      <div className="split-left">
        <div className="bg-crosshair light"></div>
        <div className="bg-circle-dashed light"></div>
        <motion.div className="model-container" style={{ scale, rotate, y }}>
          <RotatingToolModel progress={scrollYProgress} />
        </motion.div>
      </div>

      <div className="split-right">
        <div className="content-panel panel-white">
          <div className="bracket-text">[ Inception: 1995 ]</div>
          <h2 className="huge-title">
            <span>Precision patterns,</span>
            <span>tools & dies since 1995.</span>
          </h2>
          <p className="panel-desc">
            Incorporated in 1995, Aone Pattern is a versatile company capable of producing precision patterns. Customer satisfaction is our utmost priority and we thrive to achieve that by delivering high-quality standards.
          </p>
          <p className="panel-desc">
            We constantly research to compete in the industry to provide the best possible products. We seek to scale the height of excellence by recognizing that while honesty and integrity are the essential ingredients of a strong and stable enterprise, profitability provides the main spark for economic activity.
          </p>
          <div className="panel-bullets">
            <span>Customer-first priorities</span>
            <span>Constant R&D for industry competition</span>
            <span>Honesty, integrity, and excellence</span>
          </div>
        </div>

        <div className="content-panel panel-red">
          <div className="bracket-text" style={{ color: 'white' }}>[ Infrastructure & Plant ]</div>
          <h2 className="huge-title">
            <span>Equipped with 7 VMCs</span>
            <span>under one roof.</span>
          </h2>
          <p className="panel-desc">
            Our competent infrastructural support manufactures high-end patterns, tools, and dies using advanced VMC machines. Our production unit consists of full in-house production to ensure predictive quality of each product.
          </p>
          <p className="panel-desc">
            Aone Pattern has a team of trained, dedicated, and experienced staff who enjoy the challenge offered by the innovative needs of our customers. We are always available in selecting the right ways of manufacturing a product so that it stands out in the competitive market with high quality and best finish.
          </p>
          <div className="stat-grid">
            <div className="stat-row">
              <span className="stat-label">In-House VMCs</span>
              <span className="stat-value">7 Machines</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Core Machining</span>
              <span className="stat-value">Pattern / Tool / Die</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Production</span>
              <span className="stat-value">Full In-House</span>
            </div>
          </div>
        </div>

        <div className="content-panel panel-dark">
          <div className="bg-circle-dashed light"></div>
          <div className="panel-stack">
            <div className="bracket-text">[ Service & Quality ]</div>
            <h2 className="huge-title" style={{ color: 'var(--accent-red)' }}>
              <span>25+ years of</span>
              <span>field experience.</span>
            </h2>
            <p className="panel-desc">
              The company is managed by a dynamic and highly qualified team with more than 25 years of core experience in the field. From a simple tolerance review to the final design, we are always ready at the service of our valuable customers.
            </p>
            <p className="panel-desc">
              At Aone Pattern, quality and customer satisfaction drive everything we do. Flexibility is key: we consider all inquiries as future business proposals. All components are thoroughly inspected right from the raw materials to final finishing.
            </p>
            <div className="dossier-card">
              <div className="bracket-text">[ RFQ & Dispatch ]</div>
              <h3>Order acceptance to delivery is a smooth process with minimal time to enhance your supply chain.</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
