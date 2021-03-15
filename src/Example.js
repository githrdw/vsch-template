import React, { useEffect, useState } from "react";

export default function Widget() {
  const [time, setTime] = useState(Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "0 2em" }}>
      <h2>I am Groot</h2>
      <h2>{time}</h2>
    </div>
  );
}