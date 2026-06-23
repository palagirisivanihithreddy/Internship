import { useEffect, useState } from "react";
import {
  getColleges,
  addFaculty,
  updateFaculty,
  deleteFaculty,
} from "../services/api";

function AdminFaculties() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const [facultyForm, setFacultyForm] = useState({
    facultyId: "",
    facultyName: "",
    subject: "",
  });

  const [editingFaculty, setEditingFaculty] =
    useState(null);

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
    setFacultyForm({
      facultyId: "",
      facultyName: "",
      subject: "",
    });

    setEditingFaculty(null);
  };

  const validateForm = () => {
    if (!facultyForm.facultyId.trim()) {
      alert("Faculty ID is required");
      return false;
    }

    if (!facultyForm.facultyName.trim()) {
      alert("Faculty Name is required");
      return false;
    }

    if (!facultyForm.subject.trim()) {
      alert("Subject is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!selectedCollege) {
      alert("Please Select College");
      return;
    }

    if (!validateForm()) return;

    try {
      if (editingFaculty) {
        await updateFaculty(
          selectedCollege,
          editingFaculty,
          facultyForm
        );

        alert("Faculty Updated Successfully");
      } else {
        await addFaculty(
          selectedCollege,
          facultyForm
        );

        alert("Faculty Added Successfully");
      }

      resetForm();
      loadColleges();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (faculty) => {
    setEditingFaculty(
      faculty.facultyId
    );

    setFacultyForm({
      facultyId: faculty.facultyId,
      facultyName:
        faculty.facultyName,
      subject: faculty.subject,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (
    facultyId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete Faculty?"
      );

    if (!confirmDelete) return;

    try {
      await deleteFaculty(
        selectedCollege,
        facultyId
      );

      alert("Faculty Deleted");

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

  const faculties =
    selectedCollegeData?.faculties || [];

  const filteredFaculties =
    faculties.filter((faculty) => {
      const keyword =
        search.toLowerCase();

      return (
        faculty.facultyName
          ?.toLowerCase()
          .includes(keyword) ||
        faculty.facultyId
          ?.toLowerCase()
          .includes(keyword) ||
        faculty.subject
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
      <h1>
        👨‍🏫 Faculties Management
      </h1>

      <br />

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={dashboardCard}>
          <h3>Total Faculties</h3>
          <h1>{faculties.length}</h1>
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

      <div style={sectionCard}>
        <h2>
          {editingFaculty
            ? "✏️ Update Faculty"
            : "➕ Add Faculty"}
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
          placeholder="Faculty ID"
          value={facultyForm.facultyId}
          onChange={(e) =>
            setFacultyForm({
              ...facultyForm,
              facultyId:
                e.target.value,
            })
          }
        />

        <input
          style={inputStyle}
          placeholder="Faculty Name"
          value={
            facultyForm.facultyName
          }
          onChange={(e) =>
            setFacultyForm({
              ...facultyForm,
              facultyName:
                e.target.value,
            })
          }
        />

        <input
          style={inputStyle}
          placeholder="Subject"
          value={facultyForm.subject}
          onChange={(e) =>
            setFacultyForm({
              ...facultyForm,
              subject:
                e.target.value,
            })
          }
        />

        <button
          onClick={handleSubmit}
          style={saveButton}
        >
          {editingFaculty
            ? "Update Faculty"
            : "Add Faculty"}
        </button>

        {editingFaculty && (
          <button
            onClick={resetForm}
            style={cancelButton}
          >
            Cancel
          </button>
        )}
      </div>

      <br />

      <div style={sectionCard}>
        <input
          style={inputStyle}
          placeholder="Search Faculty..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <h2>📋 All Faculties</h2>

        <br />

        {loading ? (
          <h3>Loading...</h3>
        ) : filteredFaculties.length ===
          0 ? (
          <h3>No Faculties Found</h3>
        ) : (
          filteredFaculties.map(
            (faculty) => (
              <div
                key={
                  faculty.facultyId
                }
                style={facultyCard}
              >
                <h3>
                  {
                    faculty.facultyName
                  }
                </h3>

                <p>
                  <b>ID:</b>{" "}
                  {
                    faculty.facultyId
                  }
                </p>

                <p>
                  <b>Subject:</b>{" "}
                  {faculty.subject}
                </p>

                <button
                  style={editButton}
                  onClick={() =>
                    handleEdit(
                      faculty
                    )
                  }
                >
                  Edit
                </button>

                <button
                  style={deleteButton}
                  onClick={() =>
                    handleDelete(
                      faculty.facultyId
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

const facultyCard = {
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

export default AdminFaculties;