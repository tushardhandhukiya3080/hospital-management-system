import { useEffect, useState } from "react";
import api from "../api/client.js";
import DoctorCard from "../components/DoctorCard.jsx";

const EMPTY = { search: "", specialty: "", state: "", city: "" };

export default function Home() {
  const [meta, setMeta] = useState({ states: [], cities: [], specialties: [], total: 0 });
  const [filters, setFilters] = useState(EMPTY);
  const [applied, setApplied] = useState(EMPTY);
  const [data, setData] = useState({ doctors: [], total: 0, page: 1, pages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Load filter metadata once
  useEffect(() => {
    api.get("/doctors/meta").then((res) => setMeta(res.data)).catch(() => {});
  }, []);

  // Fetch doctors whenever applied filters or page change
  useEffect(() => {
    setLoading(true);
    api
      .get("/doctors", { params: { ...applied, page, limit: 12 } })
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [applied, page]);

  const update = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const runSearch = (e) => {
    e?.preventDefault();
    setPage(1);
    setApplied(filters);
  };

  const clearOne = (key) => {
    const next = { ...applied, [key]: "" };
    setFilters(next);
    setApplied(next);
    setPage(1);
  };

  const activeChips = Object.entries(applied).filter(([, v]) => v);

  return (
    <div>
      {/* Hero + search */}
      <section className="hero">
        <h1>Find the right doctor, anywhere in India</h1>
        <p>Search verified doctors by specialty, city and state — view qualifications and contact details.</p>
        <form className="search-bar" onSubmit={runSearch}>
          <input
            name="search"
            placeholder="Search by name, specialty or hospital"
            value={filters.search}
            onChange={update}
          />
          <select name="specialty" value={filters.specialty} onChange={update}>
            <option value="">All specialties</option>
            {meta.specialties.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="state" value={filters.state} onChange={update}>
            <option value="">All states</option>
            {meta.states.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button type="submit">Search</button>
        </form>
        <div className="hero-stats">
          <div><div className="n">{meta.total}+</div><div className="l">Doctors</div></div>
          <div><div className="n">{meta.states.length}</div><div className="l">States</div></div>
          <div><div className="n">{meta.specialties.length}</div><div className="l">Specialties</div></div>
        </div>
      </section>

      <div className="container">
        <div className="results-head">
          <h2>{loading ? "Searching…" : `${data.total} doctors found`}</h2>
          <div className="chips">
            {activeChips.map(([k, v]) => (
              <span className="chip" key={k} onClick={() => clearOne(k)}>
                <b>{v}</b> ✕
              </span>
            ))}
          </div>
        </div>

        {data.doctors.length === 0 && !loading ? (
          <div className="empty">No doctors match your search. Try clearing some filters.</div>
        ) : (
          <div className="doc-grid">
            {data.doctors.map((doc) => <DoctorCard key={doc._id} doc={doc} />)}
          </div>
        )}

        {data.pages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage((p) => p - 1)} disabled={page <= 1}>‹ Prev</button>
            {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={p === page ? "active" : ""} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button onClick={() => setPage((p) => p + 1)} disabled={page >= data.pages}>Next ›</button>
          </div>
        )}
      </div>
    </div>
  );
}
