import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/client.js";

const initials = (name) =>
  name.replace(/^Dr\.?\s*/i, "").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

export default function DoctorDetail() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/doctors/${id}`).then((res) => setDoc(res.data)).catch(() => setError("Doctor not found"));
  }, [id]);

  if (error) return <div className="container detail-wrap"><Link to="/" className="back-link">← Back</Link><p>{error}</p></div>;
  if (!doc) return <div className="container detail-wrap">Loading…</div>;

  return (
    <div className="container detail-wrap">
      <Link to="/" className="back-link">← Back to search</Link>

      <div className="card">
        <div className="detail-head">
          <div className="doc-avatar">{initials(doc.name)}</div>
          <div>
            <h1>{doc.name}</h1>
            <div className="doc-specialty" style={{ fontSize: "1rem" }}>{doc.specialty}</div>
            <div style={{ marginTop: 6 }}>
              <span className="doc-rating">★ {doc.rating}</span>
              <span style={{ color: "var(--muted)", marginLeft: 12 }}>{doc.experienceYears} years experience</span>
            </div>
          </div>
        </div>

        <div className="detail-grid">
          {/* Left: professional info */}
          <div>
            <h3 style={{ marginBottom: 10 }}>About</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 18 }}>{doc.about}</p>

            <h3 style={{ marginBottom: 8 }}>Qualifications</h3>
            <div style={{ marginBottom: 18 }}>
              {doc.qualifications.map((q) => <span className="tag" key={q}>{q}</span>)}
            </div>

            <h3 style={{ marginBottom: 8 }}>Languages</h3>
            <div style={{ marginBottom: 18 }}>
              {doc.languages.map((l) => <span className="tag" key={l}>{l}</span>)}
            </div>

            <div className="info-row"><span className="k">Specialty</span><span>{doc.specialty}</span></div>
            <div className="info-row"><span className="k">Experience</span><span>{doc.experienceYears} years</span></div>
            <div className="info-row"><span className="k">Consultation fee</span><span>₹{doc.consultationFee}</span></div>
            <div className="info-row"><span className="k">Gender</span><span style={{ textTransform: "capitalize" }}>{doc.gender}</span></div>
          </div>

          {/* Right: contact + location */}
          <div className="card contact-card" style={{ background: "#f8fafc", height: "fit-content" }}>
            <h3 style={{ marginBottom: 12 }}>Contact & Location</h3>
            <div className="ci">🏥 <span>{doc.hospital}</span></div>
            <div className="ci">📍 <span>{doc.address}</span></div>
            <div className="ci">🌐 <span>{doc.city}, {doc.state}</span></div>
            <div className="ci">📞 <a href={`tel:${doc.phone}`}>{doc.phone}</a></div>
            <div className="ci">✉ <a href={`mailto:${doc.email}`}>{doc.email}</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
