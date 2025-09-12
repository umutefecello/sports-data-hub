import {useState} from "react";

function App() {
  const [sport,setSport] = useState("");
  return (
    <>
      <h1>Sport Stats App</h1>
      <select value={sport} onChange={(e) => setSport(e.target.value)}>
        <option value="">---Select Sport for Stats---</option>
        <option value="basketball">Basketball</option>
        <option value="football">Football</option>
      </select>
      <p>Selected Sport: {sport || "None"}</p>
    </>
  );
}

export default App;