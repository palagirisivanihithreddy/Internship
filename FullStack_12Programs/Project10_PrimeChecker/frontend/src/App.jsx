import { useState } from "react";
import axios from "axios";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const checkPrime = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8010/prime/${number}`
      );

      setResult(response.data.result);
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
      <h1>Prime Number Checker</h1>

      <input
        type="number"
        placeholder="Enter Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <br /><br />

      <button onClick={checkPrime}>
        Check Prime
      </button>

      <button
        onClick={clearData}
        style={{ marginLeft: "10px" }}
      >
        Clear
      </button>

      <br /><br />

      {result && (
        <h2>
          Result: {result}
        </h2>
      )}
    </div>
  );
}

export default App;