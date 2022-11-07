//External Lib Import
import { useSelector } from "react-redux";

const FullScreenLoader = () => {
  const { IsLoading } = useSelector((state) => state.Loader);

  return (
    <div className={IsLoading ? "LoadingOverlay" : "d-none"}>
      <div className="loading__overlay">
        <div className="indeterminate"></div>
      </div>
    </div>
  );
};

export default FullScreenLoader;
