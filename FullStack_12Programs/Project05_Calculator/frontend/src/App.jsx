import { useState } from "react";
import axios from "axios";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState("");

  const calculate = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8005/calculate/${num1}/${num2}/${operation}`
      );

      if (response.data.error) {
        setResult(response.data.error);
      } else {
        setResult(response.data.result);
      }
    } catch (error) {
      console.error(error);
      alert("Backend not running");
    }
  };

  const clearData = () => {
    setNum1("");
    setNum2("");
    setOperation("add");
    setResult("");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Calculator App</h1>

      <input
        type="number"
        placeholder="Enter First Number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <br /><br />

      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
      >
        <option value="add">Addition (+)</option>
        <option value="subtract">Subtraction (-)</option>
        <option value="multiply">Multiplication (*)</option>
        <option value="divide">Division (/)</option>
      </select>

      <br /><br />

      <input
        type="number"
        placeholder="Enter Second Number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <br /><br />

      <button onClick={calculate}>
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
          Result: {result}
        </h2>
      )}
    </div>
  );
}

export default App;