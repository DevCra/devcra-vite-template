import { routes } from "@/routes";
import { useRoutes } from "react-router";

const App = () => {
  const element = useRoutes(routes);
  return element;
};

export default App;
