import { useState } from "react";
import axios from "axios";

function App() {
  const [number, setNumber] = useState("");
  const [factors, setFactors] = useState([]);

  const findFactors = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8009/factors/${number}`
      );

      setFactors(response.data.factors);
    } catch (error) {
      console.error(error);
      alert("Backend not running");
    }
  };

  const clearData = () => {
    setNumber("");
    setFactors([]);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Factors Finder</h1>

      <input
        type="number"
        placeholder="Enter Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <br /><br />

      <button onClick={findFactors}>
        Find Factors
      </button>

      <button
        onClick={clearData}
        style={{ marginLeft: "10px" }}
      >
        Clear
      </button>

      <br /><br />

      {factors.length > 0 && (
        <div>
          <h2>Factors:</h2>
          {factors.map((factor, index) => (
            <h3 key={index}>{factor}</h3>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;