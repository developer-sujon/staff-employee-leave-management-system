//External Lib Import
import Swal from "sweetalert2";

class AleartMessage {
  static Delete(id, request) {
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        return request(id).then((res) => {
          if (res) {
            return true;
          }
        });
      }
    });
  }

  static Update(email, status, option, request) {
    return Swal.fire({
      title: "Change Status",
      input: "select",
      inputOptions: option,
      inputValue: status,
    }).then((result) => {
      if (result.isConfirmed) {
        return request(email, result.value).then((res) => {
          return res;
        });
      }
    });
  }

  static CourseUpdate(id, option, postBody, request) {
    return Swal.fire({
      title: "Change Status",
      input: "select",
      inputOptions: option,
      inputValue: postBody.status,
    }).then((result) => {
      if (result.isConfirmed) {
        return request(id, { ...postBody, status: result.value }).then(
          (res) => {
            return res;
          },
        );
      }
    });
  }
}

export default AleartMessage;
