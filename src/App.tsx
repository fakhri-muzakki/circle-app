import { ModeToggle } from "./shared/components/mode-toggle";
import { ThemeProvider } from "./shared/components/theme-provider";
import { store } from "./store";
import { Provider } from "react-redux";

const App = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>{children}</Provider>
      <ModeToggle />
    </ThemeProvider>
  );
};

export default App;
