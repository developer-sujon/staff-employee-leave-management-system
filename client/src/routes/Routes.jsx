import { BrowserRouter } from "react-router-dom";
import AllRoutes from ".";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AllRoutes></AllRoutes>
    </BrowserRouter>
  );
};

export default AppRoutes;
