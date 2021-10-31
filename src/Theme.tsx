import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const Theme: React.FC = ({ children }) => {
  const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
