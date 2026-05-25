import { useEffect, useState } from 'react'

const heroImages = [
  { src: '/hero/1.png', alt: 'Aone Pattern CNC Machine and tool design', focus: 'center 50%' },
  { src: '/hero/2.png', alt: 'Precision machining operations', focus: 'center 50%' },
  { src: '/hero/3.png', alt: 'High speed vertical machining center', focus: 'center 50%' },
  { src: '/hero/4.png', alt: 'Precision dies and mould products', focus: 'center 50%' },
  { src: '/hero/5.png', alt: 'Inspection and Quality Check', focus: 'center 50%' },
  { src: '/hero/6.png', alt: 'Advanced CNC tooling setup', focus: 'center 50%' },
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
    }, 3200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="section-brutal hero-section">
      <div className="bg-circle-dashed hero-orbit"></div>
      <div className="bg-crosshair"></div>

      <div className="hero-topline">
        <div className="hero-mark">A1</div>
        <div className="hero-note">
          Tools. Dies. Patterns.<br />
          Built around CNC discipline.
        </div>
      </div>

      <div className="hero-machine-strip" aria-label="Aone Pattern manufacturing details">
        {visibleSlides.map(({ image, position }) => (
          <img
            key={position}
            src={image.src}
            alt={image.alt}
            className={`hero-machine ${position}`}
            style={{ objectPosition: image.focus }}
          />
        ))}
      </div>

      <div className="hero-bottomline">
        <h1 className="huge-title">
          <span>Aone Pattern</span>
          <span>machines the mould behind the machine.</span>
        </h1>
        <div className="hero-caption">
          VMC and CNC manufacturing for tools, dies, casting patterns, core boxes, fixtures, and precision components.
        </div>
      </div>
    </section>
  )
}
