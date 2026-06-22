import { Link } from "react-router-dom";

function CollegeCard({ college }) {
  if (!college) return null;

  return (
    <Link
      to={`/college/${college.id}`}
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ color: "#2563eb" }}>
          {college.name}
        </h2>

        <p>📍 {college.city}</p>

        <p>🏛️ {college.state}</p>

        <p>🎓 {college.courseType}</p>

        <p>⭐ Rating: {college.rating}</p>

        <p>🏆 Ranking: {college.ranking}</p>

        <p>💰 Fees: ₹{college.fees}</p>
      </div>
    </Link>
  );
}

export default CollegeCard;