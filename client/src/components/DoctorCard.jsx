import { Link } from "react-router-dom";

const initials = (name) =>
  name.replace(/^Dr\.?\s*/i, "").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

export default function DoctorCard({ doc }) {
  return (
    <Link to={`/doctors/${doc._id}`} className="doc-card">
      <div className="doc-top">
        <div className="doc-avatar">{initials(doc.name)}</div>
        <div>
          <div className="doc-name">{doc.name}</div>
          <div className="doc-specialty">{doc.specialty}</div>
        </div>
      </div>
      <div className="doc-quals">{doc.qualifications.join(", ")}</div>
      <div className="doc-meta">
        <span>📍 {[doc.town, doc.city, doc.state].filter(Boolean).join(", ")}</span>
        <span>🩺 {doc.experienceYears} yrs exp</span>
      </div>
      <div className="doc-foot">
        <span className="doc-rating">★ {doc.rating}</span>
        <span className="doc-fee">₹{doc.consultationFee}</span>
        <span className="doc-view">View profile →</span>
      </div>
    </Link>
  );
}
