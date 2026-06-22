import { useParams } from "react-router-dom";
import employees from "../data/employees";

function EmployeeDetails() {

  const { id } = useParams();

  const employee =
    employees.find(
      emp => emp.id === Number(id)
    );

  if (!employee) {
    return <h1>Employee Not Found</h1>;
  }

  return (
    <div className="container">

      <h1>Employee Details</h1>

      <div className="card">

        <h2>{employee.name}</h2>

        <p>ID : {employee.id}</p>

        <p>
          Department :
          {" "}
          {employee.department}
        </p>

        <p>
          Salary :
          {" "}
          ₹{employee.salary}
        </p>

        <p>
          Status :
          {" "}
          {employee.status}
        </p>

      </div>

    </div>
  );
}

export default EmployeeDetails;