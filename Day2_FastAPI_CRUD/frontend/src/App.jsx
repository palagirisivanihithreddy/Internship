import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  const fetchEmployees = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8011/employees"
    );

    setEmployees(response.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const clearForm = () => {
    setId(null);
    setName("");
    setRole("");
    setDepartment("");
    setEmail("");
  };

  const addEmployee = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8011/employees",
        {
          name,
          role,
          department,
          email
        }
      );

      fetchEmployees();
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmployee = async (empId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8011/employees/${empId}`
      );

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

  const updateEmployee = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8011/employees/${id}`,
        {
          name,
          role,
          department,
          email
        }
      );

      fetchEmployees();
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Employee Management System</h1>

      <h2>{id ? "Update Employee" : "Add Employee"}</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      {id ? (
        <button onClick={updateEmployee}>
          Update Employee
        </button>
      ) : (
        <button onClick={addEmployee}>
          Add Employee
        </button>
      )}

      <button
        onClick={clearForm}
        style={{ marginLeft: "10px" }}
      >
        Clear
      </button>

      <hr />

      <h2>Total Employees: {employees.length}</h2>

      {employees.map((employee) => (
        <div
          key={employee.id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px"
          }}
        >
          <h3>{employee.name}</h3>

          <p>
            <strong>Role:</strong> {employee.role}
          </p>

          <p>
            <strong>Department:</strong> {employee.department}
          </p>

          <p>
            <strong>Email:</strong> {employee.email}
          </p>

          <button
            onClick={() => editEmployee(employee)}
          >
            Edit
          </button>

          <button
            onClick={() => deleteEmployee(employee.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;