import { useState } from "react";
import axios from "axios";

function App() {
  const [age, setAge] = useState("");
  const [result, setResult] = useState("");

  const checkEligibility = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8002/vote/${age}`
      );

      setResult(response.data.result);
    } catch (error) {
      console.error(error);
      alert("Backend not running");
    }
  };

  const clearData = () => {
    setAge("");
    setResult("");
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px"
      }}
    >
      <h1>Voting Eligibility Checker</h1>

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      <button onClick={checkEligibility}>
        Check
      </button>

      <button
        onClick={clearData}
        style={{ marginLeft: "10px" }}
      >
        Clear
      </button>

      <br />
      <br />

      {result && (
        <h2>
          Result: {result}
        </h2>
      )}
    </div>
  );
}

export default App;