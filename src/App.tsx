import { ModeToggle } from "./shared/components/mode-toggle";
import { ThemeProvider } from "./shared/components/theme-provider";
import { store } from "./store";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
      <ModeToggle />
    </ThemeProvider>
  );
};

export default App;
