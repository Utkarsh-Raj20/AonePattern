export default function Footer() {
  return (
    <footer className="footer-brutal" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="bracket-text" style={{ marginBottom: 40, color: 'white' }}>Contact Us</div>
            <h2 className="footer-huge">Start the<br />production<br />cycle.</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, justifyContent: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 8 }}>Registered Office / Works</div>
              <div style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
                Plot No. 2682, St. No. 1,<br />
                Near JBR Electronics, Baba Gajja Jain Colony,<br />
                Old Moti Nagar, Ludhiana, Punjab, 141003
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 8 }}>Electronic Mail</div>
              <a style={{ fontSize: '1.25rem' }} href="mailto:aonepattern@rediffmail.com">aonepattern@rediffmail.com</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright {new Date().getFullYear()} Aone Pattern. All rights reserved.</span>
          <div className="footer-links">
            <a href="#capabilities">Plant</a>
            <a href="#products">Products</a>
            <a href="#quality">Quality</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
