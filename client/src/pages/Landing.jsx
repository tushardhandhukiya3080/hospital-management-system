import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  IconCalendar, IconRx, IconBill, IconPatients, IconDoctor, IconDashboard, IconCross,
} from "../components/icons.jsx";
import "./landing.css";

const FEATURES = [
  { icon: IconCalendar, title: "Online Appointments", text: "Patients book by department and doctor; the system prevents double-booking automatically." },
  { icon: IconRx, title: "Digital Prescriptions", text: "Doctors write prescriptions linked to each visit — instantly available to the patient." },
  { icon: IconBill, title: "Billing & Payments", text: "Generate itemized bills, track paid/unpaid status, and keep clean financial records." },
  { icon: IconPatients, title: "Patient Records", text: "A central, searchable registry of patient profiles, history, and contact details." },
  { icon: IconDoctor, title: "Doctor & Departments", text: "Manage specialists, departments, fees, and availability from one admin panel." },
  { icon: IconDashboard, title: "Insightful Dashboard", text: "Real-time counts of patients, doctors, appointments and pending bills at a glance." },
];

const ROLES = [
  { emoji: "🧑‍💼", title: "Admin", text: "Full control over doctors, departments, staff and hospital-wide reports." },
  { emoji: "🩺", title: "Doctor", text: "View appointments, write prescriptions and track patient history." },
  { emoji: "💁", title: "Receptionist", text: "Register patients, schedule appointments and handle billing." },
  { emoji: "🧑", title: "Patient", text: "Book visits, view prescriptions and pay bills — anytime, anywhere." },
];

const STEPS = [
  { n: 1, title: "Register & sign in", text: "Patients self-register; staff get role-based accounts from the admin." },
  { n: 2, title: "Book & treat", text: "Schedule appointments, then doctors record diagnoses and prescriptions." },
  { n: 3, title: "Bill & track", text: "Generate bills, mark payments, and monitor everything from the dashboard." },
];

export default function Landing() {
  const { user } = useAuth();

  return (
    <div className="lp">
      {/* Nav */}
      <header className="lp-nav">
        <div className="brand"><IconCross /> HealthCare HMS</div>
        <nav className="links">
          <a href="#features">Features</a>
          <a href="#roles">Who it's for</a>
          <a href="#how">How it works</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="actions">
          {user ? (
            <Link to="/dashboard"><button className="btn-primary-lg" style={{ padding: "9px 18px" }}>Go to Dashboard</button></Link>
          ) : (
            <>
              <Link to="/login"><button className="btn-ghost">Login</button></Link>
              <Link to="/register"><button>Get Started</button></Link>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="lp-hero">
        <div>
          <span className="pill">✚ Trusted hospital management</span>
          <h1>Run your hospital on <span className="grad">one smart platform</span></h1>
          <p>
            HealthCare HMS brings appointments, patient records, prescriptions and
            billing together in a single, secure system — so your team spends less
            time on paperwork and more time on care.
          </p>
          <div className="cta">
            <Link to="/register" className="btn-primary-lg">Get Started Free</Link>
            <Link to="/login" className="btn-outline-lg">Sign In</Link>
          </div>
          <p className="note">No credit card needed · Demo accounts included</p>
        </div>

        {/* Mock dashboard preview */}
        <div className="hero-mock">
          <div className="bar"></div>
          <div className="mock-grid">
            <div className="mock-stat"><div className="n">1,240</div><div className="l">Patients</div></div>
            <div className="mock-stat"><div className="n">86</div><div className="l">Doctors</div></div>
            <div className="mock-stat"><div className="n">320</div><div className="l">Appointments</div></div>
            <div className="mock-stat"><div className="n">12</div><div className="l">Unpaid Bills</div></div>
          </div>
          <div className="mock-row"><span className="av"></span> John Doe — Cardiology <span className="tag">Booked</span></div>
          <div className="mock-row"><span className="av"></span> Jane Smith — Dermatology <span className="tag">Completed</span></div>
          <div className="mock-row"><span className="av"></span> Raj Patel — Orthopedics <span className="tag">Booked</span></div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="lp-stats">
        <div className="s"><div className="n">500+</div><div className="l">Hospitals & clinics</div></div>
        <div className="s"><div className="n">1M+</div><div className="l">Patients managed</div></div>
        <div className="s"><div className="n">99.9%</div><div className="l">Uptime</div></div>
        <div className="s"><div className="n">4.8/5</div><div className="l">User rating</div></div>
      </section>

      {/* Features */}
      <section className="lp-section" id="features">
        <div className="lp-head">
          <div className="eyebrow">Features</div>
          <h2>Everything your hospital needs</h2>
          <p>One platform to manage the entire patient journey — from the first appointment to the final bill.</p>
        </div>
        <div className="feat-grid">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div className="feat" key={title}>
              <div className="ic"><Icon /></div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section className="lp-section alt" id="roles">
        <div className="lp-head">
          <div className="eyebrow">Who it's for</div>
          <h2>Built for every role in your hospital</h2>
          <p>Each user gets a tailored experience with exactly the access they need.</p>
        </div>
        <div className="roles-grid">
          {ROLES.map(({ emoji, title, text }) => (
            <div className="role-card" key={title}>
              <div className="emoji">{emoji}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="lp-section" id="how">
        <div className="lp-head">
          <div className="eyebrow">How it works</div>
          <h2>Up and running in 3 simple steps</h2>
        </div>
        <div className="steps">
          {STEPS.map(({ n, title, text }) => (
            <div className="step" key={n}>
              <div className="num">{n}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="lp-cta" id="contact">
        <h2>Ready to modernize your hospital?</h2>
        <p>Create a free account and explore the full system with built-in demo data.</p>
        <Link to="/register">Get Started Now</Link>
      </section>

      {/* Footer */}
      <footer className="lp-footer">
        <div className="cols">
          <div>
            <div className="brand">✚ HealthCare HMS</div>
            <p>A complete hospital management system for appointments, records, prescriptions and billing.</p>
          </div>
          <div>
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#roles">Who it's for</a></li>
              <li><a href="#how">How it works</a></li>
            </ul>
          </div>
          <div>
            <h4>Account</h4>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:support@healthcarehms.com">support@healthcarehms.com</a></li>
              <li><a href="#">+1 (800) 123-4567</a></li>
            </ul>
          </div>
        </div>
        <div className="bottom">© 2026 HealthCare HMS · Software Engineering Project</div>
      </footer>
    </div>
  );
}
