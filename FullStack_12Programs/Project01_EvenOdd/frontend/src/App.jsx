import { useState } from "react";
import axios from "axios";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  const checkNumber = async () => {
    try {
      console.log("Button Clicked");
      console.log("Number Entered:", number);

      const response = await axios.get(
        `http://127.0.0.1:8001/check/${number}`
      );

      console.log("API Response:", response.data);

      setResult(response.data.result);
    } catch (error) {
      console.error("ERROR:", error);
      alert("API Connection Failed");
    }
  };

  const clearData = () => {
    setNumber("");
    setResult("");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Even Odd Checker</h1>

      <input
        type="number"
        placeholder="Enter Number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />

      <br /><br />

      <button onClick={checkNumber}>
        Check
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
          Result: {result}
        </h2>
      )}
    </div>
  );
}

export default App;