//External Lib Import
import Resizer from "react-image-file-resizer";

const ResizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      140,
      140,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
    );
  });
export default ResizeFile;
