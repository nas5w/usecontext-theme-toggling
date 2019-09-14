import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";

const App: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <div>Hi friend!</div>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
      <div style={{ marginTop: "20px" }}>
        Demo by{" "}
        <a
          style={{ color: theme === "light" ? "blue" : "#CCC" }}
          href="https://twitter.com/nas5w"
        >
          Nick Scialli
        </a>
      </div>
    </div>
  );
};

export default App;
