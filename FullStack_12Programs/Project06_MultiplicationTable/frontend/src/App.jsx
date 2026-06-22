import { useState } from "react";
import axios from "axios";

function App() {
  const [number, setNumber] = useState("");
  const [table, setTable] = useState([]);

  const generateTable = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8006/table/${number}`
      );

      setTable(response.data.table);
    } catch (error) {
      console.error(error);
      alert("Backend not running");
    }
  };

  const clearData = () => {
    setNumber("");
    setTable([]);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Multiplication Table Generator</h1>

      <input
        type="number"
        placeholder="Enter Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <br /><br />

      <button onClick={generateTable}>
        Generate Table
      </button>

      <button
        onClick={clearData}
        style={{ marginLeft: "10px" }}
      >
        Clear
      </button>

      <br /><br />

      {table.map((row, index) => (
        <h3 key={index}>{row}</h3>
      ))}
    </div>
  );
}

export default App;