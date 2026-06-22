import { useEffect, useState } from "react";

import {
  getColleges,
  createCollege,
  deleteCollege,
  addDepartment,
  addStudent,
  addFaculty,
  addPlacement
} from "../services/api";

function AdminDashboard() {

  const [colleges, setColleges] = useState([]);

  const [selectedCollege, setSelectedCollege] =
    useState("");

  const [collegeForm, setCollegeForm] =
    useState({
      name: "",
      state: "",
      city: "",
      courseType: "",
      fees: "",
      rating: "",
      ranking: ""
    });

  const [departmentForm, setDepartmentForm] =
    useState({
      departmentId: "",
      departmentName: "",
      hod: ""
    });

  const [studentForm, setStudentForm] =
    useState({
      studentId: "",
      studentName: "",
      age: "",
      email: ""
    });

  const [facultyForm, setFacultyForm] =
    useState({
      facultyId: "",
      facultyName: "",
      subject: ""
    });

  const [placementForm, setPlacementForm] =
    useState({
      companyName: "",
      packageOffered: ""
    });

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    const data = await getColleges();
    setColleges(data);

    if (data.length > 0 && !selectedCollege) {
      setSelectedCollege(data[0].id);
    }
  };

  const handleAddCollege = async () => {

    await createCollege({
      ...collegeForm,
      fees: Number(collegeForm.fees),
      rating: Number(collegeForm.rating),
      ranking: Number(collegeForm.ranking)
    });

    alert("College Added");

    setCollegeForm({
      name: "",
      state: "",
      city: "",
      courseType: "",
      fees: "",
      rating: "",
      ranking: ""
    });

    loadColleges();
  };

  const handleDeleteCollege = async (id) => {

    if (!window.confirm("Delete College?"))
      return;

    await deleteCollege(id);

    alert("College Deleted");

    loadColleges();
  };

  const handleAddDepartment = async () => {

    if (!selectedCollege) return;

    await addDepartment(
      selectedCollege,
      departmentForm
    );

    alert("Department Added");

    setDepartmentForm({
      departmentId: "",
      departmentName: "",
      hod: ""
    });

    loadColleges();
  };

  const handleAddStudent = async () => {

    if (!selectedCollege) return;

    await addStudent(
      selectedCollege,
      {
        ...studentForm,
        age: Number(studentForm.age)
      }
    );

    alert("Student Added");

    setStudentForm({
      studentId: "",
      studentName: "",
      age: "",
      email: ""
    });

    loadColleges();
  };

  const handleAddFaculty = async () => {

    if (!selectedCollege) return;

    await addFaculty(
      selectedCollege,
      facultyForm
    );

    alert("Faculty Added");

    setFacultyForm({
      facultyId: "",
      facultyName: "",
      subject: ""
    });

    loadColleges();
  };

  const handleAddPlacement = async () => {

    if (!selectedCollege) return;

    await addPlacement(
      selectedCollege,
      {
        ...placementForm,
        packageOffered: Number(
          placementForm.packageOffered
        )
      }
    );

    alert("Placement Added");

    setPlacementForm({
      companyName: "",
      packageOffered: ""
    });

    loadColleges();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020c2b",
        color: "white",
        padding: "30px"
      }}
    >
      <h1>Admin Dashboard</h1>

      <hr />

      <h2>Add College</h2>

      <div
        style={{
          display: "grid",
          gap: "10px",
          maxWidth: "500px"
        }}
      >
        <input
          placeholder="College Name"
          value={collegeForm.name}
          onChange={(e) =>
            setCollegeForm({
              ...collegeForm,
              name: e.target.value
            })
          }
        />

        <input
          placeholder="State"
          value={collegeForm.state}
          onChange={(e) =>
            setCollegeForm({
              ...collegeForm,
              state: e.target.value
            })
          }
        />

        <input
          placeholder="City"
          value={collegeForm.city}
          onChange={(e) =>
            setCollegeForm({
              ...collegeForm,
              city: e.target.value
            })
          }
        />

        <input
          placeholder="Course Type"
          value={collegeForm.courseType}
          onChange={(e) =>
            setCollegeForm({
              ...collegeForm,
              courseType: e.target.value
            })
          }
        />

        <input
          placeholder="Fees"
          value={collegeForm.fees}
          onChange={(e) =>
            setCollegeForm({
              ...collegeForm,
              fees: e.target.value
            })
          }
        />

        <input
          placeholder="Rating"
          value={collegeForm.rating}
          onChange={(e) =>
            setCollegeForm({
              ...collegeForm,
              rating: e.target.value
            })
          }
        />

        <input
          placeholder="Ranking"
          value={collegeForm.ranking}
          onChange={(e) =>
            setCollegeForm({
              ...collegeForm,
              ranking: e.target.value
            })
          }
        />

        <button
          onClick={handleAddCollege}
        >
          Add College
        </button>
      </div>

      <hr />

      <h2>Select College</h2>

      <select
        value={selectedCollege}
        onChange={(e) =>
          setSelectedCollege(
            e.target.value
          )
        }
      >
        {colleges.map((college) => (
          <option
            key={college.id}
            value={college.id}
          >
            {college.name}
          </option>
        ))}
      </select>

      <hr />

      <h2>Add Department</h2>

      <input
        placeholder="Department ID"
        value={departmentForm.departmentId}
        onChange={(e) =>
          setDepartmentForm({
            ...departmentForm,
            departmentId:
              e.target.value
          })
        }
      />

      <input
        placeholder="Department Name"
        value={departmentForm.departmentName}
        onChange={(e) =>
          setDepartmentForm({
            ...departmentForm,
            departmentName:
              e.target.value
          })
        }
      />

      <input
        placeholder="HOD"
        value={departmentForm.hod}
        onChange={(e) =>
          setDepartmentForm({
            ...departmentForm,
            hod: e.target.value
          })
        }
      />

      <button
        onClick={handleAddDepartment}
      >
        Add Department
      </button>

      <hr />

      <h2>Add Student</h2>

      <input
        placeholder="Student ID"
        value={studentForm.studentId}
        onChange={(e) =>
          setStudentForm({
            ...studentForm,
            studentId:
              e.target.value
          })
        }
      />

      <input
        placeholder="Student Name"
        value={studentForm.studentName}
        onChange={(e) =>
          setStudentForm({
            ...studentForm,
            studentName:
              e.target.value
          })
        }
      />

      <input
        placeholder="Age"
        value={studentForm.age}
        onChange={(e) =>
          setStudentForm({
            ...studentForm,
            age: e.target.value
          })
        }
      />

      <input
        placeholder="Email"
        value={studentForm.email}
        onChange={(e) =>
          setStudentForm({
            ...studentForm,
            email: e.target.value
          })
        }
      />

      <button
        onClick={handleAddStudent}
      >
        Add Student
      </button>

      <hr />

      <h2>Add Faculty</h2>

      <input
        placeholder="Faculty ID"
        value={facultyForm.facultyId}
        onChange={(e) =>
          setFacultyForm({
            ...facultyForm,
            facultyId:
              e.target.value
          })
        }
      />

      <input
        placeholder="Faculty Name"
        value={facultyForm.facultyName}
        onChange={(e) =>
          setFacultyForm({
            ...facultyForm,
            facultyName:
              e.target.value
          })
        }
      />

      <input
        placeholder="Subject"
        value={facultyForm.subject}
        onChange={(e) =>
          setFacultyForm({
            ...facultyForm,
            subject: e.target.value
          })
        }
      />

      <button
        onClick={handleAddFaculty}
      >
        Add Faculty
      </button>

      <hr />

      <h2>Add Placement</h2>

      <input
        placeholder="Company Name"
        value={
          placementForm.companyName
        }
        onChange={(e) =>
          setPlacementForm({
            ...placementForm,
            companyName:
              e.target.value
          })
        }
      />

      <input
        placeholder="Package"
        value={
          placementForm.packageOffered
        }
        onChange={(e) =>
          setPlacementForm({
            ...placementForm,
            packageOffered:
              e.target.value
          })
        }
      />

      <button
        onClick={handleAddPlacement}
      >
        Add Placement
      </button>

      <hr />

      <h2>All Colleges</h2>

      {colleges.map((college) => (
        <div
          key={college.id}
          style={{
            background: "#112240",
            padding: "20px",
            marginBottom: "15px",
            borderRadius: "10px"
          }}
        >
          <h3>{college.name}</h3>

          <p>
            Course:
            {college.courseType}
          </p>

          <p>
            Departments:
            {
              college.departments
                ?.length || 0
            }
          </p>

          <p>
            Students:
            {
              college.students
                ?.length || 0
            }
          </p>

          <p>
            Faculties:
            {
              college.faculties
                ?.length || 0
            }
          </p>

          <p>
            Placements:
            {
              college.placements
                ?.length || 0
            }
          </p>

          <button
            onClick={() =>
              handleDeleteCollege(
                college.id
              )
            }
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "10px"
            }}
          >
            Delete College
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;