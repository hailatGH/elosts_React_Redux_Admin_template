import { useTheme, useThemeUpdate } from "../../contexts/ThemeContext";

export default function Dashboard() {
  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  return (
    <>
      <button onClick={toggleTheme}>Toggle</button>
      <h1>{darkTheme ? "yes" : "no"}</h1>
    </>
  );
}
