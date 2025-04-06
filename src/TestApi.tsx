import { useEffect, useState } from "react";
import axios from "axios";

export default function TestApi() {
  const [data, setData] = useState("Loading...");

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/data")
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        setData("Error connecting to Flask backend");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>🧪 Flask API Test</h1>
      <p><strong>{data}</strong></p>
    </div>
  );
}
