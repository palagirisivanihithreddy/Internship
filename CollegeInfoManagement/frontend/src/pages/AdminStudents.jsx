import { useEffect, useState } from "react";
import {
  getColleges,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/api";

function AdminStudents() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [studentForm, setStudentForm] = useState({
    studentId: "",
    studentName: "",
    age: "",
    email: "",
  });

  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      setLoading(true);

      const data = await getColleges();

      setColleges(data);

      if (data.length > 0) {
        setSelectedCollege((prev) =>
          prev ? prev : data[0].id
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStudentForm({
      studentId: "",
      studentName: "",
      age: "",
      email: "",
    });

    setEditingStudent(null);
  };

  const validateForm = () => {
    if (!studentForm.studentId.trim()) {
      alert("Student ID is required");
      return false;
    }

    if (!studentForm.studentName.trim()) {
      alert("Student Name is required");
      return false;
    }

    if (
      studentForm.email &&
      !studentForm.email.includes("@")
    ) {
      alert("Enter valid email");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!selectedCollege) {
      alert("Please select a college");
      return;
    }

    if (!validateForm()) return;

    try {
      const payload = {
        ...studentForm,
        age: studentForm.age
          ? Number(studentForm.age)
          : null,
      };

      if (editingStudent) {
        await updateStudent(
          selectedCollege,
          editingStudent,
          payload
        );

        alert("Student Updated Successfully");
      } else {
        await addStudent(
          selectedCollege,
          payload
        );

        alert("Student Added Successfully");
      }

      resetForm();
      loadColleges();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student.studentId);

    setStudentForm({
      studentId: student.studentId || "",
      studentName:
        student.studentName || "",
      age: student.age || "",
      email: student.email || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (
    studentId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this student?"
      );

    if (!confirmDelete) return;

    try {
      await deleteStudent(
        selectedCollege,
        studentId
      );

      alert("Student Deleted");

      loadColleges();
    } catch (error) {
      console.log(error);
    }
  };

  const selectedCollegeData =
    colleges.find(
      (college) =>
        String(college.id) ===
        String(selectedCollege)
    );

  const students =
    selectedCollegeData?.students || [];

  const filteredStudents =
    students.filter((student) => {
      const keyword =
        search.toLowerCase();

      return (
        student.studentName
          ?.toLowerCase()
          .includes(keyword) ||
        student.studentId
          ?.toLowerCase()
          .includes(keyword) ||
        student.email
          ?.toLowerCase()
          .includes(keyword)
      );
    });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06132f",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>🎓 Students Management</h1>

      <br />

      {/* Dashboard */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={dashboardCard}>
          <h3>Total Students</h3>
          <h1>{students.length}</h1>
        </div>

        <div style={dashboardCard}>
          <h3>Selected College</h3>
          <h4>
            {selectedCollegeData?.name ||
              "No College Selected"}
          </h4>
        </div>
      </div>

      <br />

      {/* Form Section */}
      <div style={sectionCard}>
        <h2>
          {editingStudent
            ? "✏️ Update Student"
            : "➕ Add Student"}
        </h2>

        <br />

        <select
          value={selectedCollege}
          onChange={(e) =>
            setSelectedCollege(
              e.target.value
            )
          }
          style={inputStyle}
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

        <input
          style={inputStyle}
          placeholder="Student ID"
          value={studentForm.studentId}
          onChange={(e) =>
            setStudentForm({
              ...studentForm,
              studentId:
                e.target.value,
            })
          }
        />

        <input
          style={inputStyle}
          placeholder="Student Name"
          value={
            studentForm.studentName
          }
          onChange={(e) =>
            setStudentForm({
              ...studentForm,
              studentName:
                e.target.value,
            })
          }
        />

        <input
          type="number"
          style={inputStyle}
          placeholder="Age"
          value={studentForm.age}
          onChange={(e) =>
            setStudentForm({
              ...studentForm,
              age: e.target.value,
            })
          }
        />

        <input
          style={inputStyle}
          placeholder="Email"
          value={studentForm.email}
          onChange={(e) =>
            setStudentForm({
              ...studentForm,
              email: e.target.value,
            })
          }
        />

        <button
          onClick={handleSubmit}
          style={saveButton}
        >
          {editingStudent
            ? "Update Student"
            : "Add Student"}
        </button>

        {editingStudent && (
          <button
            onClick={resetForm}
            style={cancelButton}
          >
            Cancel
          </button>
        )}
      </div>

      <br />

      {/* Student List */}
      <div style={sectionCard}>
        <input
          style={inputStyle}
          placeholder="Search Student..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <h2>📋 All Students</h2>

        <br />

        {loading ? (
          <h3>Loading...</h3>
        ) : filteredStudents.length ===
          0 ? (
          <h3>No Students Found</h3>
        ) : (
          filteredStudents.map(
            (student) => (
              <div
                key={
                  student.studentId
                }
                style={studentCard}
              >
                <h3>
                  {
                    student.studentName
                  }
                </h3>

                <p>
                  <b>ID:</b>{" "}
                  {
                    student.studentId
                  }
                </p>

                <p>
                  <b>Age:</b>{" "}
                  {student.age}
                </p>

                <p>
                  <b>Email:</b>{" "}
                  {student.email}
                </p>

                <button
                  style={editButton}
                  onClick={() =>
                    handleEdit(
                      student
                    )
                  }
                >
                  Edit
                </button>

                <button
                  style={deleteButton}
                  onClick={() =>
                    handleDelete(
                      student.studentId
                    )
                  }
                >
                  Delete
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

const sectionCard = {
  background: "#10244d",
  padding: "25px",
  borderRadius: "15px",
};

const dashboardCard = {
  background: "#10244d",
  padding: "20px",
  borderRadius: "15px",
  minWidth: "220px",
};

const studentCard = {
  background: "#17366d",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "none",
};

const saveButton = {
  padding: "12px 20px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  marginRight: "10px",
  cursor: "pointer",
};

const cancelButton = {
  padding: "12px 20px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const editButton = {
  padding: "8px 15px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  marginRight: "10px",
  cursor: "pointer",
};

const deleteButton = {
  padding: "8px 15px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default AdminStudents;