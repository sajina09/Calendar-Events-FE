import React, { useState, useEffect } from "react";
import "./App.css";

// function DataComponent() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5000/api/data")
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return <div>{data ? <p>{data.message}</p> : <p>Loading...</p>}</div>;
// }

// export default DataComponent;

// import React, { useState } from "react";
// import "./App.css";

function App() {
  const [note, setNote] = useState("6:30 - 8:30am Finish reading");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  <div>{data ? <p>{data.message}</p> : <p>Loading...</p>}</div>;

  const handleGenerate = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/generate-ics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note }),
      });

      if (!response.ok) {
        // Log error details for debugging
        const errorText = await response.text();
        console.error(
          "❌ Server responded with an error:",
          response.status,
          errorText
        );
        alert(`Server error: ${response.status}`);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "schedule.ics");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      // Handle network errors (CORS, server down, etc.)
      console.error("💥 Network or fetch error:", error);
      alert("Failed to connect to the server. Check your Flask backend.");
    }
  };

  return (
    <div className="app-container">
      <div className="note-card">
        <div>{data ? <p>{data.message}</p> : <p>Loading...</p>}</div>;
        <h1>📝 Note to Calendar</h1>
        <p>Paste your schedule below and generate a calendar file (.ics)</p>
        <textarea
          placeholder="e.g. 6:30 - 8:30am Finish reading the first paper for Computing"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleGenerate}>📅 Generate .ics File</button>
      </div>
    </div>
  );
}

export default App;
