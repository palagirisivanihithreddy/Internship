import { useEffect, useState } from "react";
import { getColleges } from "../services/api";
import CollegeCard from "../components/CollegeCard";

function Colleges() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadColleges = async () => {
    try {
      const data = await getColleges();

      console.log(data);

      setColleges(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadColleges();
  }, []);

  if (loading) {
    return <h2>Loading Colleges...</h2>;
  }

  return (
    <div>
      <h1>Colleges</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {colleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
          />
        ))}
      </div>
    </div>
  );
}

export default Colleges;