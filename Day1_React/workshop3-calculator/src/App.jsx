import { useState } from "react";

function App() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);
  const [expression, setExpression] = useState("");
  const [error, setError] = useState("");

  const handleCalculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setError("Please enter valid numbers");
      setResult(null);
      return;
    }

    if (operation === "divide" && b === 0) {
      setError("Cannot divide by zero");
      setResult(null);
      return;
    }

    setError("");

    let answer;
    let symbol;

    switch (operation) {
      case "add":
        answer = a + b;
        symbol = "+";
        break;

      case "subtract":
        answer = a - b;
        symbol = "-";
        break;

      case "multiply":
        answer = a * b;
        symbol = "*";
        break;

      case "divide":
        answer = a / b;
        symbol = "/";
        break;

      case "modulus":
        answer = a % b;
        symbol = "%";
        break;

      default:
        answer = 0;
        symbol = "";
    }

    setResult(answer);
    setExpression(`${a} ${symbol} ${b} = ${answer}`);
  };

  const handleClear = () => {
    setNum1("");
    setNum2("");
    setOperation("add");
    setResult(null);
    setExpression("");
    setError("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Calculator App</h1>

      <input
        type="number"
        placeholder="Enter First Number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />

      <br />
      <br />

      <select
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
      >
        <option value="add">Addition (+)</option>
        <option value="subtract">Subtraction (-)</option>
        <option value="multiply">Multiplication (*)</option>
        <option value="divide">Division (/)</option>
        <option value="modulus">Modulus (%)</option>
      </select>

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

      <button onClick={handleCalculate}>
        Calculate
      </button>

      <button
        onClick={handleClear}
        style={{ marginLeft: "10px" }}
      >
        Clear
      </button>

      {error && (
        <h3 style={{ color: "red" }}>
          {error}
        </h3>
      )}

      {expression && (
        <h2>
          {expression}
        </h2>
      )}
    </div>
  );
}

export default App;