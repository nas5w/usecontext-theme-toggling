## About the Project

This project shows one method to use React's `useContext` and `useState` hooks to implement dark/light mode toggling. The relevant files are `src/ThemeProvider.tsx`, `src/index.tsx`, and `src/App.tsx`.

This project uses Typescript, but the same functionality can be achieved in javascript by removing the types.

## ThemeProvider.tsx

In our `ThemeProvider` component, we define our `Theme` as being either light or dark and we define our ThemeContext as being an object with two properties: `theme` and `toggleTheme` (the theme and ability to toggle the theme will be made available to other components via the `useContext` hook).

We have to make sure to export the `ThemeContext` object we create using `React.createContext`.

Within the `ThemeProvider` component, we maintain our `theme` state using the `useState` hook and create a `toggleTheme` function that will toggle the state between `light` and `dark`.

For simplicity, we simple set the document body's `color` and `backgroundColor` styles based on whether the `theme` state is currently light or dark. Finally, we export our `ThemeContext` `Provider` with value set to and object with `theme` and `toggleTheme` properties. We then render `children` within our `ThemeContext.Provider` component.

```typescript
import React, { useState } from "react";
typescript;
type Theme = "light" | "dark";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const color = theme === "light" ? "#333" : "#FFF";
  const backgroundColor = theme === "light" ? "#FFF" : "#333";

  document.body.style.color = color;
  document.body.style.backgroundColor = backgroundColor;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## index.tsx

In our `index` file, we simply wrap the entire app in our new `ThemeProvider` component. Of course we don't _need_ to do this at the app level in real projects, we just need to make sure that any components that need `theme` or `toggleTheme` are within the child tree of our provider.

```typescript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "./ThemeProvider";

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
```

## App.tsx

In the `App` component

```typescript
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
    </div>
  );
};

export default App;
```

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
