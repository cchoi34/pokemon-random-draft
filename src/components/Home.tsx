import React, { useState } from "react";
import "../styles/home.css";

function Home() {
  const [name] = useState("Beef soondooboo");
  return (
    <div className="home-container">
      <h1>Welcome {name}
      </h1>
    </div>
  );
}

export default Home;
