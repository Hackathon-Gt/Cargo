import { useEffect, useState } from "react";
import axios from "axios";

const APITest = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/data") // example Flask endpoint
      .then((res) => {
        setResponse(res.data.message || JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error("API Error:", err);
        setResponse("Failed to connect to backend");
      });
  }, []);

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🧪 Flask API Test</h1>
      <p>Response from backend: <strong>{response}</strong></p>
    </main>
  );
};

export default APITest;
