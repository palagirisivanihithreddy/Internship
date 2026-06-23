import { useEffect, useState } from "react";

import {
  getColleges,
  addDepartment,
  updateDepartment,
  deleteDepartment
} from "../services/api";

function AdminDepartments() {
  const [colleges, setColleges] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");

  const [departmentForm, setDepartmentForm] = useState({
    departmentId: "",
    departmentName: "",
    hod: ""
  });

  const [editingDepartment, setEditingDepartment] =
    useState(null);

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    try {
      const data = await getColleges();

      setColleges(data);

      if (data.length > 0 && !selectedCollege) {
        setSelectedCollege(data[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCollege) {
      alert("Select College");
      return;
    }

    try {
      if (editingDepartment) {
        await updateDepartment(
          selectedCollege,
          editingDepartment,
          departmentForm
        );

        alert("Department Updated");
      } else {
        await addDepartment(
          selectedCollege,
          departmentForm
        );

        alert("Department Added");
      }

      setDepartmentForm({
        departmentId: "",
        departmentName: "",
        hod: ""
      });

      setEditingDepartment(null);

      loadColleges();
    } catch (error) {
      console.log(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(
      department.departmentId
    );

    setDepartmentForm({
      departmentId:
        department.departmentId,

      departmentName:
        department.departmentName,

      hod: department.hod
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleDelete = async (
    departmentId
  ) => {
    if (
      !window.confirm(
        "Delete Department?"
      )
    )
      return;

    try {
      await deleteDepartment(
        selectedCollege,
        departmentId
      );

      alert("Department Deleted");

      loadColleges();
    } catch (error) {
      console.log(error);
    }
  };

  const selectedCollegeData =
    colleges.find(
      (c) => c.id === selectedCollege
    );

  const departments =
    selectedCollegeData?.departments || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06132f",
        color: "white",
        padding: "30px"
      }}
    >
      <h1>
        🏢 Departments Management
      </h1>

      <br />

      <div
        style={{
          background: "#10244d",
          padding: "20px",
          borderRadius: "15px"
        }}
      >
        <h2>
          {editingDepartment
            ? "✏️ Update Department"
            : "➕ Add Department"}
        </h2>

        <br />

        <select
          value={selectedCollege}
          onChange={(e) =>
            setSelectedCollege(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px"
          }}
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
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px"
          }}
          placeholder="Department ID"
          value={
            departmentForm.departmentId
          }
          onChange={(e) =>
            setDepartmentForm({
              ...departmentForm,
              departmentId:
                e.target.value
            })
          }
        />

        <input
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px"
          }}
          placeholder="Department Name"
          value={
            departmentForm.departmentName
          }
          onChange={(e) =>
            setDepartmentForm({
              ...departmentForm,
              departmentName:
                e.target.value
            })
          }
        />

        <input
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px"
          }}
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
          onClick={handleSubmit}
          style={{
            padding: "12px 25px"
          }}
        >
          {editingDepartment
            ? "Update Department"
            : "Add Department"}
        </button>
      </div>

      <br />

      <div
        style={{
          background: "#10244d",
          padding: "20px",
          borderRadius: "15px"
        }}
      >
        <h2>
          📋 All Departments
        </h2>

        <br />

        {departments.length === 0 ? (
          <p>
            No Departments Found
          </p>
        ) : (
          departments.map(
            (department) => (
              <div
                key={
                  department.departmentId
                }
                style={{
                  background:
                    "#17366d",
                  padding: "15px",
                  marginBottom:
                    "15px",
                  borderRadius:
                    "10px"
                }}
              >
                <h3>
                  {
                    department.departmentName
                  }
                </h3>

                <p>
                  ID :
                  {
                    department.departmentId
                  }
                </p>

                <p>
                  HOD :
                  {department.hod}
                </p>

                <button
                  onClick={() =>
                    handleEdit(
                      department
                    )
                  }
                  style={{
                    marginRight:
                      "10px"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      department.departmentId
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

export default AdminDepartments;