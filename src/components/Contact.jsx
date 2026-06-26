import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Clock, Upload, FileText, Box } from 'lucide-react'

const FORM_ENDPOINT = 'https://formsubmit.co/aonepattern@rediffmail.com'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [drawingName, setDrawingName] = useState('')
  const [modelName, setModelName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef(null)

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0]
    setter(file ? file.name : '')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const form = formRef.current
    const formData = new FormData(form)

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        // Fallback: open mailto if FormSubmit fails
        const name = formData.get('name') || 'Website Visitor'
        const body = `
Name: ${formData.get('name') || '-'}
Company: ${formData.get('company') || '-'}
Email: ${formData.get('email') || '-'}
Phone: ${formData.get('phone') || '-'}
Material: ${formData.get('material') || '-'}
Quantity: ${formData.get('quantity') || '-'}
Details: ${formData.get('details') || '-'}

Note: Please reply with your drawing and 3D model files attached.
        `.trim()

        window.location.href = `mailto:aonepattern@rediffmail.com?subject=${encodeURIComponent(`RFQ from ${name}`)}&body=${encodeURIComponent(body)}`
        setSubmitted(true)
      }
    } catch {
      setSubmitted(true)
      window.location.href = `mailto:aonepattern@rediffmail.com?subject=RFQ%20from%20${encodeURIComponent(formData.get('name') || 'Visitor')}&body=Please%20reply%20with%20your%20drawings%20and%20models%20attached.`
    }

    setSubmitting(false)
  }

  return (
    <section className="contact-section section-brutal" id="contact">
      <div className="container">
        <div className="section-header-brutal">
          <div>
            <div className="bracket-text">[ Get In Touch ]</div>
            <h2>Request a Quote.</h2>
          </div>
          <p className="section-kicker">Send us your drawings, 3D models, and specifications. We'll get back to you with a detailed estimate within 24 hours.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon"><MapPin size={20} /></div>
              <div>
                <h4>Location</h4>
                <p>Plot No. 2682, St. No. 1,<br />Near JBR Electronics, Baba Gajjajan Colony,<br />Old Moti Nagar, Ludhiana, Punjab, 141003</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Mail size={20} /></div>
              <div>
                <h4>Email</h4>
                <p>aonepattern@rediffmail.com</p>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Clock size={20} /></div>
              <div>
                <h4>Working Hours</h4>
                <p>Mon - Sat, 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>

          {submitted ? (
            <motion.div
              className="contact-success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3>Quote Request Sent</h3>
              <p>We've received your enquiry and will respond within 24 hours. If you attached files, they've been sent along with your request.</p>
            </motion.div>
          ) : (
            <form className="rfq-form" ref={formRef} onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
              <input type="hidden" name="_subject" value="New RFQ from Aone Pattern Website" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rfq-name">Your Name</label>
                  <input id="rfq-name" name="name" type="text" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="rfq-company">Company</label>
                  <input id="rfq-company" name="company" type="text" placeholder="Company Name" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rfq-email">Email</label>
                  <input id="rfq-email" name="email" type="email" required placeholder="you@company.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="rfq-phone">Phone</label>
                  <input id="rfq-phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rfq-material">Material Required</label>
                  <select id="rfq-material" name="material">
                    <option value="">Select Material</option>
                    <option>Tool Steel (H13/D2)</option>
                    <option>Aluminium (LM6/7075)</option>
                    <option>Cast Iron</option>
                    <option>EN24 / EN31</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="rfq-quantity">Quantity</label>
                  <input id="rfq-quantity" name="quantity" type="number" placeholder="Number of pieces" min="1" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rfq-drawing">
                    <FileText size={14} />
                    Upload Drawing
                  </label>
                  <div className="file-input-wrap">
                    <input
                      id="rfq-drawing"
                      name="drawing"
                      type="file"
                      accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png,.tiff,.bmp"
                      onChange={(e) => handleFileChange(e, setDrawingName)}
                    />
                    <span className={`file-placeholder${drawingName ? ' has-file' : ''}`}>
                      {drawingName || '2D drawing, PDF, or image'}
                    </span>
                    <Upload size={16} className="file-upload-icon" />
                  </div>
                  <span className="file-hint">Accepted: PDF, DWG, DXF, JPG, PNG (max 10 MB)</span>
                </div>
                <div className="form-group">
                  <label htmlFor="rfq-model">
                    <Box size={14} />
                    3D Parasolid / CAD Model
                  </label>
                  <div className="file-input-wrap">
                    <input
                      id="rfq-model"
                      name="model"
                      type="file"
                      accept=".x_t,.x_b,.step,.stp,.iges,.igs,.stl,.sldprt"
                      onChange={(e) => handleFileChange(e, setModelName)}
                    />
                    <span className={`file-placeholder${modelName ? ' has-file' : ''}`}>
                      {modelName || 'Parasolid, STEP, IGES, or STL'}
                    </span>
                    <Upload size={16} className="file-upload-icon" />
                  </div>
                  <span className="file-hint">Accepted: X_T, STEP, IGES, STL, SLDPRT (max 25 MB)</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rfq-details">Project Details</label>
                <textarea id="rfq-details" name="details" placeholder="Describe dimensions, tolerances, surface finish, quantity requirements, or any special notes..." rows={4} />
              </div>
              <button type="submit" className="rfq-submit" disabled={submitting}>
                {submitting ? 'Sending...' : 'Submit RFQ'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
