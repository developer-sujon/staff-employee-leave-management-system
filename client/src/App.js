//External Lib Import
import AppRoutes from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import FullScreenLoader from "./components/Common/FullScreenLoader";

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster />
      <FullScreenLoader />
    </>
  );
};

export default App;
