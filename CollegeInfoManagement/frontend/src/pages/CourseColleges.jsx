import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseColleges } from "../services/api";
import CollegeCard from "../components/CollegeCard";

function CourseColleges() {
  const { courseType } = useParams();

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadColleges();
  }, [courseType]);

  const loadColleges = async () => {
    try {
      const data = await getCourseColleges(courseType);

      console.log("COURSE DATA:", data);

      setColleges(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{courseType} Colleges</h1>

      <hr />

      <h2 style={{ marginTop: "20px" }}>
        Total Colleges: {colleges.length}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
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

export default CourseColleges;