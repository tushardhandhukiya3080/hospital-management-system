import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { IconCross } from "../components/icons.jsx";
import {
  HeroArt, ArtDigitize, ArtCustomize, ArtAccess, ArtSecurity, CtaArt,
} from "../components/illustrations.jsx";
import "./landing.css";

const PARTNERS = [
  "City Care Hospital", "Metro Clinic", "Wellness Labs", "Orchid Health",
  "LifeLine Centre", "MediTrust", "Apex Hospital",
];

const ROWS = [
  { art: ArtDigitize, reverse: false, h: "Digitize records in seconds", p: "Turn any paper document into a secure digital record instantly — no more lost files or manual data entry.", cta: "Get Started" },
  { art: ArtCustomize, reverse: true, h: "Customize as per your needs", p: "Built to fit your workflow. Configure departments, roles, and fees to match exactly how your hospital runs.", cta: "Make it Yours" },
  { art: ArtAccess, reverse: false, h: "Access from anywhere, anytime", p: "Stay connected 24/7 with secure access from any device — desktop, tablet, or phone.", cta: "Get Access" },
  { art: ArtSecurity, reverse: true, h: "Risk-free data security", p: "Your data is protected with role-based access and secure authentication, eliminating the risk of data loss.", cta: "Stay Secure" },
];

const TESTIMONIALS = [
  { stars: 5, text: "The most straightforward hospital system we've used. Setup was quick and our staff adapted within days.", n: "Dr. A. Sharma", r: "Director, City Care Hospital" },
  { stars: 5, text: "Appointments, billing and records in one place. It has genuinely reduced our daily paperwork.", n: "R. Mehta", r: "Admin, Metro Clinic" },
  { stars: 5, text: "Tailored exactly to how our departments work. Patient experience has clearly improved.", n: "Dr. S. Nair", r: "Orthopedics, Apex Hospital" },
  { stars: 5, text: "Reliable, simple and secure. Highly recommend it to any growing clinic.", n: "P. Verma", r: "Manager, Wellness Labs" },
  { stars: 5, text: "Great support and an easy interface. Our front desk loves it.", n: "K. Iyer", r: "Reception Lead, LifeLine Centre" },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="lp">
      {/* Nav */}
      <header className="lp-nav">
        <div className="brand"><IconCross /> HealthCare HMS</div>
        <nav className="links">
          <a href="#features">Our Products</a>
          <a href="#testimonials">Company</a>
          <a href="#recognition">Careers</a>
          <a href="#footer">Contact Us</a>
        </nav>
        <div className="actions">
          {user ? (
            <Link to="/dashboard" className="btn-demo">Go to Dashboard</Link>
          ) : (
            <>
              <Link to="/register" className="btn-demo">Demo</Link>
              <Link to="/login" className="btn-login">Login</Link>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="lp-hero">
        <div>
          <h1>Upgrade to<br />Simplicity</h1>
          <p>Manage everything in a single system — patients, appointments, prescriptions and billing.</p>
          <Link to="/register" className="btn-primary-lg">Simplify now</Link>
        </div>
        <div className="hero-art"><HeroArt /></div>
      </section>

      {/* Trusted strip */}
      <section className="lp-trusted" id="features">
        <h3>Trusted by <span className="purple">500+</span> Setups</h3>
        <div className="trusted-row">
          {PARTNERS.map((p) => <span key={p}>{p}</span>)}
        </div>
      </section>

      {/* Zig-zag feature rows */}
      <section className="lp-rows">
        {ROWS.map(({ art: Art, reverse, h, p, cta }, i) => (
          <div key={h}>
            <div className={`lp-row ${reverse ? "reverse" : ""}`}>
              <div className="text">
                <h2>{h}</h2>
                <p>{p}</p>
                <Link to="/register" className="btn-primary-lg">{cta}</Link>
              </div>
              <div className="art"><Art /></div>
            </div>
            {i < ROWS.length - 1 && <div className="row-divider" />}
          </div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="lp-testi" id="testimonials">
        <h2>Witness our Efforts here</h2>
        <div className="testi-track">
          {TESTIMONIALS.map((t, i) => (
            <div className="testi-card" key={i}>
              <div className="quote">&#8220;</div>
              <div className="stars">{"★".repeat(t.stars)}</div>
              <p>{t.text}</p>
              <div className="who">
                <div className="n">{t.n}</div>
                <div className="r">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recognition */}
      <section className="lp-reco" id="recognition">
        <h2>Recognized by the Best, Providing the Best</h2>
        <div className="reco-badges">
          <div className="reco-badge">
            <div className="score">4.9</div>
            <div className="stars">★★★★★</div>
            <div className="src">User Rating</div>
          </div>
          <div className="reco-badge">
            <div className="score">5.0</div>
            <div className="stars">★★★★★</div>
            <div className="src">Verified Reviews</div>
          </div>
          <div className="reco-badge">
            <div className="score">500+</div>
            <div className="stars">★★★★★</div>
            <div className="src">Happy Hospitals</div>
          </div>
        </div>
      </section>

      {/* Dark CTA band */}
      <section className="lp-cta">
        <div className="art"><CtaArt /></div>
        <div>
          <h2>Upgrade Your Setup<br />to a Simpler Level</h2>
          <Link to="/register">Connect to Simplify &rarr;</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="lp-footer" id="footer">
        <div className="brand"><IconCross /> HealthCare HMS</div>
        <div className="social">
          <span>𝕏</span><span>f</span><span>in</span><span>◎</span>
        </div>
        <div className="fcols">
          <a href="#features">Company</a>
          <a href="#features">Products</a>
          <a href="#recognition">Security</a>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <div className="contact">
          <span>📞 +91 90000 00000</span>
          <span>📍 Bengaluru, India</span>
          <span>✉ support@healthcarehms.com</span>
        </div>
        <div className="copy">© 2026 HealthCare HMS · Software Engineering Project. All rights reserved.</div>
      </footer>
    </div>
  );
}
