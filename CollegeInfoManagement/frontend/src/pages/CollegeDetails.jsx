import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCollegeById } from "../services/api";

function CollegeDetails() {
  const { id } = useParams();

  const [college, setCollege] = useState(null);

  useEffect(() => {
    loadCollege();
  }, []);

  const loadCollege = async () => {
    try {
      const data = await getCollegeById(id);

      console.log("COLLEGE DETAILS", data);

      setCollege(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!college) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{college.name}</h1>

      <p>
        <b>State:</b> {college.state}
      </p>

      <p>
        <b>City:</b> {college.city}
      </p>

      <p>
        <b>Course Type:</b> {college.courseType}
      </p>

      <p>
        <b>Fees:</b> ₹{college.fees}
      </p>

      <p>
        <b>Rating:</b> {college.rating}
      </p>

      <p>
        <b>Ranking:</b> {college.ranking}
      </p>

      <hr />

      <h2>Departments</h2>

      {college.departments?.length > 0 ? (
        college.departments.map((dept) => (
          <div key={dept.departmentId}>
            <p>
              <b>{dept.departmentName}</b>
            </p>
            <p>HOD: {dept.hod}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No Departments Available</p>
      )}

      <h2>Students</h2>

      {college.students?.length > 0 ? (
        college.students.map((student) => (
          <div key={student.studentId}>
            <p>
              <b>{student.studentName}</b>
            </p>
            <p>Age: {student.age}</p>
            <p>Email: {student.email}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No Students Available</p>
      )}

      <h2>Faculties</h2>

      {college.faculties?.length > 0 ? (
        college.faculties.map((faculty) => (
          <div key={faculty.facultyId}>
            <p>
              <b>{faculty.facultyName}</b>
            </p>
            <p>Subject: {faculty.subject}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No Faculties Available</p>
      )}

      <h2>Placements</h2>

      {college.placements?.length > 0 ? (
        college.placements.map((placement, index) => (
          <div key={index}>
            <p>
              <b>{placement.companyName}</b>
            </p>
            <p>Package: {placement.packageOffered}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No Placements Available</p>
      )}
    </div>
  );
}

export default CollegeDetails;