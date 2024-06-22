import { useMemo } from "react";
import { createMuiTheme } from "./theme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";


function App() {
  const theme = useMemo(() => {
    return createMuiTheme("light");
  }, []);
  return (
    <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
        <CssBaseline />
      </ThemeProvider>
  );
}

export default App;
