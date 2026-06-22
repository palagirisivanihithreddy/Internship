import { useState } from "react";
import axios from "axios";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState("");

  const findGreatest = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8003/greatest/${num1}/${num2}`
      );

      setResult(response.data.result);
    } catch (error) {
      console.error(error);
      alert("Backend not running");
    }
  };

  const clearData = () => {
    setNum1("");
    setNum2("");
    setResult("");
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px"
      }}
    >
      <h1>Greatest Number Checker</h1>

      <input
        type="number"
        placeholder="Enter First Number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Enter Second Number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
      />

      <br />
      <br />

      <button onClick={findGreatest}>
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