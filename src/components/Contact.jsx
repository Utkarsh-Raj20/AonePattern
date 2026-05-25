import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); }

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">// Get In Touch</div>
          <h2 className="section-title">Request A Quote</h2>
          <p className="section-subtitle">Send us your drawings and specifications. We'll get back to you with a detailed estimate.</p>
          <div className="section-divider" />
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon"><MapPin size={20} /></div>
              <div><h4>Location</h4><p>Rajkot, Gujarat, India</p></div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Phone size={20} /></div>
              <div><h4>Phone</h4><p>+91 XXXXX XXXXX</p></div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Mail size={20} /></div>
              <div><h4>Email</h4><p>info@aonepattern.com</p></div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Clock size={20} /></div>
              <div><h4>Working Hours</h4><p>Mon - Sat, 9:00 AM - 7:00 PM</p></div>
            </div>
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ background: 'var(--bg-card)', border: '1px solid var(--accent-cyan)', borderRadius: 'var(--radius)', padding: '48px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-cyan)', marginBottom: 12 }}>Quote Received!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We'll review your specifications and respond within 24 hours with a detailed estimate.</p>
            </motion.div>
          ) : (
            <form className="rfq-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group"><label>Your Name</label><input type="text" required placeholder="John Doe" /></div>
                <div className="form-group"><label>Company</label><input type="text" placeholder="Company Name" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Email</label><input type="email" required placeholder="you@company.com" /></div>
                <div className="form-group"><label>Phone</label><input type="tel" placeholder="+91 XXXXX XXXXX" /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Material Required</label>
                  <select><option>Select Material</option><option>Tool Steel (H13/D2)</option><option>Aluminium (LM6/7075)</option><option>Cast Iron</option><option>EN24 / EN31</option><option>Other</option></select>
                </div>
                <div className="form-group"><label>Quantity</label><input type="number" placeholder="Number of pieces" min="1" /></div>
              </div>
              <div className="form-group"><label>Project Details</label><textarea placeholder="Describe dimensions, tolerances, surface finish requirements, or upload reference drawings..." rows={4} /></div>
              <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-start' }}>Submit RFQ</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
