export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 22h20L12 2z" />
        </svg>
        AONE
      </div>
      <ul className="nav-links">
        <li><a href="#capabilities">PLANT</a></li>
        <li><a href="#process">PROCESS</a></li>
        <li><a href="#products">PRODUCTS</a></li>
        <li><a href="#quality">QUALITY</a></li>
        <li><a href="#contact">CONTACT</a></li>
      </ul>
    </nav>
  )
}
