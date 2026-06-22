import { useState } from "react";
import { Link } from "react-router-dom";
import employees from "../data/employees";

function Employees() {

  const [search, setSearch] = useState("");

  const filteredEmployees =
    employees.filter(emp =>
      emp.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="container">

      <h1>Employees</h1>

      <input
        className="search-box"
        placeholder="Search Employee"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <table className="table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>

          {filteredEmployees.map(emp => (

            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.department}</td>
              <td>₹{emp.salary}</td>

              <td>
                <Link
                  to={`/employees/${emp.id}`}
                >
                  View
                </Link>
              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Employees;