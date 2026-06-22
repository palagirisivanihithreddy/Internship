import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function App() {
  const [employees, setEmployees] = useState([]);

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  const API_URL = "http://127.0.0.1:8000/employees";

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setId(null);
    setName("");
    setRole("");
    setDepartment("");
    setEmail("");
  };

  const addEmployee = async () => {
    try {
      await axios.post(API_URL, {
        name,
        role,
        department,
        email,
      });

      fetchEmployees();
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  const updateEmployee = async () => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        name,
        role,
        department,
        email,
      });

      fetchEmployees();
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (empId) => {
    try {
      await axios.delete(`${API_URL}/${empId}`);
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const editEmployee = (employee) => {
    setId(employee.id);
    setName(employee.name);
    setRole(employee.role);
    setDepartment(employee.department);
    setEmail(employee.email);
  };

  const departmentData = {};

  employees.forEach((emp) => {
    departmentData[emp.department] =
      (departmentData[emp.department] || 0) + 1;
  });

  const chartData = Object.keys(departmentData).map((dept) => ({
    department: dept,
    count: departmentData[dept],
  }));

  const COLORS = [
    "#0d6efd",
    "#198754",
    "#ffc107",
    "#dc3545",
    "#6610f2",
    "#20c997",
  ];

  return (
    <div className="container py-4">

      <h1 className="text-center text-primary fw-bold mb-4">
        Employee Management Dashboard
      </h1>

      {/* STATS */}

      <div className="row mb-4">

        <div className="col-md-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body">
              <h5>Total Employees</h5>
              <h2>{employees.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body">
              <h5>Engineering</h5>
              <h2>
                {
                  employees.filter(
                    (e) => e.department === "Engineering"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning shadow">
            <div className="card-body">
              <h5>HR</h5>
              <h2>
                {
                  employees.filter(
                    (e) => e.department === "HR"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body">
              <h5>Sales</h5>
              <h2>
                {
                  employees.filter(
                    (e) => e.department === "Sales"
                  ).length
                }
              </h2>
            </div>
          </div>
        </div>

      </div>

      {/* FORM */}

      <div className="card shadow mb-4">

        <div className="card-header bg-dark text-white">
          Employee Form
        </div>

        <div className="card-body">

          <div className="row g-3">

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Role"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Department"
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

          </div>

          <div className="mt-3">

            {id ? (
              <button
                className="btn btn-warning"
                onClick={updateEmployee}
              >
                Update Employee
              </button>
            ) : (
              <button
                className="btn btn-success"
                onClick={addEmployee}
              >
                Add Employee
              </button>
            )}

            <button
              className="btn btn-secondary ms-2"
              onClick={clearForm}
            >
              Clear
            </button>

          </div>

        </div>

      </div>

      {/* TABLE */}

      <div className="card shadow mb-4">

        <div className="card-header bg-primary text-white">
          Employee List
        </div>

        <div className="card-body">

          <table className="table table-striped table-hover">

            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.role}</td>
                  <td>{emp.department}</td>
                  <td>{emp.email}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        editEmployee(emp)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteEmployee(emp.id)
                      }
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* CHARTS */}

      <div className="row">

        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-header bg-success text-white">
              Department Bar Chart
            </div>

            <div className="card-body">

              <BarChart
                width={500}
                height={300}
                data={chartData}
              >
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#198754"
                />
              </BarChart>

            </div>
          </div>

        </div>

        <div className="col-md-6">

          <div className="card shadow">
            <div className="card-header bg-info text-white">
              Department Pie Chart
            </div>

            <div className="card-body">

              <PieChart width={450} height={300}>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="department"
                  outerRadius={100}
                  label
                >
                  {chartData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

              </PieChart>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default App;