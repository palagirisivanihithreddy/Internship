import { useState } from "react";
import axios from "axios";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const calculateSum = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8007/sumdigits/${number}`
      );

      setResult(response.data.sum);
    } catch (error) {
      console.error(error);
      alert("Backend not running");
    }
  };

  const clearData = () => {
    setNumber("");
    setResult("");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Sum of Digits Calculator</h1>

      <input
        type="number"
        placeholder="Enter Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <br /><br />

      <button onClick={calculateSum}>
        Calculate
      </button>

      <button
        onClick={clearData}
        style={{ marginLeft: "10px" }}
      >
        Clear
      </button>

      <br /><br />

      {result !== "" && (
        <h2>
          Sum of Digits: {result}
        </h2>
      )}
    </div>
  );
}

export default App;