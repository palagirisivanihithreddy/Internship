import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [m1, setM1] = useState("");
  const [m2, setM2] = useState("");
  const [m3, setM3] = useState("");
  const [result, setResult] = useState(null);

  const calculateGrade = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8012/grade/${name}/${m1}/${m2}/${m3}`
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Student Grade Calculator</h1>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Maths"
        value={m1}
        onChange={(e) => setM1(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Physics"
        value={m2}
        onChange={(e) => setM2(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Chemistry"
        value={m3}
        onChange={(e) => setM3(e.target.value)}
      />

      <br /><br />

      <button onClick={calculateGrade}>
        Calculate Grade
      </button>

      {result && (
        <div>
          <h2>Name: {result.name}</h2>
          <h2>Total: {result.total}</h2>
          <h2>Average: {result.average}</h2>
          <h2>Grade: {result.grade}</h2>
        </div>
      )}
    </div>
  );
}

export default App;