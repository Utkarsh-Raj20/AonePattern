import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const heroImages = [
  { src: '/hero/1.png', alt: 'Aone Pattern VMC machine and tool design', focus: 'center 50%' },
  { src: '/hero/2.png', alt: 'Precision machining operations', focus: 'center 50%' },
  { src: '/hero/3.png', alt: 'High speed vertical machining center', focus: 'center 50%' },
  { src: '/hero/4.png', alt: 'Precision dies and mould products', focus: 'center 50%' },
  { src: '/hero/5.png', alt: 'Inspection and Quality Check', focus: 'center 50%' },
  { src: '/hero/6.png', alt: 'Advanced VMC tooling setup', focus: 'center 50%' },
]

const getWrappedIndex = (index) => (index + heroImages.length) % heroImages.length

export default function Hero() {
  const [active, setActive] = useState(0)
  const visibleSlides = [
    { image: heroImages[getWrappedIndex(active - 1)], position: 'side previous' },
    { image: heroImages[active], position: 'main' },
    { image: heroImages[getWrappedIndex(active + 1)], position: 'side next' },
  ]

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => getWrappedIndex(current + 1))
    }, 2000)

    return () => window.clearInterval(timer)
  }, [])

  const handleSlideClick = (position) => {
    if (position === 'side previous') {
      setActive((current) => getWrappedIndex(current - 1))
    } else if (position === 'side next') {
      setActive((current) => getWrappedIndex(current + 1))
    }
  }

  return (
    <section className="section-brutal hero-section">
      <div className="bg-circle-dashed hero-orbit"></div>
      <div className="bg-crosshair"></div>

      <div className="hero-topline">
        <div className="hero-mark">A1</div>
        <div className="hero-note">
          Tools. Dies. Patterns.<br />
          Built around VMC discipline.
        </div>
      </div>

      <div className="hero-machine-strip" aria-label="Aone Pattern manufacturing details">
        <AnimatePresence mode="popLayout" initial={false}>
          {visibleSlides.map(({ image, position }) => {
            const isMain = position === 'main'
            return (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: isMain ? 1 : 0.62,
                  scale: isMain ? 1.05 : 0.96,
                  filter: isMain ? 'grayscale(0%)' : 'grayscale(100%)',
                }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 24,
                  mass: 0.8
                }}
                onClick={() => handleSlideClick(position)}
                className={`hero-machine ${position}`}
                style={{
                  cursor: isMain ? 'default' : 'pointer',
                  zIndex: isMain ? 5 : 2
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={isMain ? 'eager' : 'lazy'}
                  fetchPriority={isMain && active === 0 ? 'high' : 'auto'}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: image.focus,
                    display: 'block'
                  }}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="hero-controls">
        <button 
          className="bracket-btn" 
          onClick={() => setActive((current) => getWrappedIndex(current - 1))}
          aria-label="Previous slide"
        >
          PREV
        </button>
        <div className="hero-dots">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              className={`hero-dot-btn ${idx === active ? 'active' : ''}`}
              onClick={() => setActive(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <button 
          className="bracket-btn" 
          onClick={() => setActive((current) => getWrappedIndex(current + 1))}
          aria-label="Next slide"
        >
          NEXT
        </button>
      </div>

      <div className="hero-bottomline">
        <h1 className="huge-title">
          <span style={{ color: 'var(--accent-red)' }}>Aone Pattern</span>
          <span>Where every great casting begins.</span>
        </h1>
        <div className="hero-caption">
          VMC manufacturing for tools, dies, casting patterns, core boxes, fixtures, and precision components.
        </div>
      </div>
    </section>
  )
}
