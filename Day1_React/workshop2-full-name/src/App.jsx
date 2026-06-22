import { useState } from "react";

function App() {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const fullName = [firstName, middleName, lastName]
    .filter(Boolean)
    .join(" ");

  const initials = [firstName, middleName, lastName]
    .filter(Boolean)
    .map((name) => name[0].toUpperCase() + ".")
    .join("");

  const handleReset = () => {
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setSubmitted(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Full Name App</h1>

      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Middle Name"
        value={middleName}
        onChange={(e) => setMiddleName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <br />
      <br />

      <button onClick={() => setSubmitted(true)}>
        Show Full Name
      </button>

      <button
        onClick={handleReset}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button>

      {submitted && (
        <div>
          <h3>Full Name: {fullName}</h3>
          <h3>Initials: {initials}</h3>
        </div>
      )}
    </div>
  );
}

export default App;