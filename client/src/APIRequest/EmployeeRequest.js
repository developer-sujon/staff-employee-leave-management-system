//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import {
  ResetEmployeeDetails,
  SetDepartmentHeadsList,
  SetStaffList,
} from "../redux/slices/EmployeeSlice";
import {
  SetTotalEmployee,
  SetEmployeeLists,
  SetEmployeeDetails,
  SetEmployeeDropDown,
} from "../redux/slices/EmployeeSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class EmployeeRequest {
  static async EmployeeCreate(postBody) {
    const { data } = await RestClient.postRequest(
      "/Employee/EmployeeCreate",
      postBody,
    );

    if (data) {
      store.dispatch(ResetEmployeeDetails());
      ToastMessage.successMessage("Employee Create Successful");
      return true;
    }
  }

  static async EmployeeList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/Employee/EmployeeList/${pageNumber}/${perPage}/${searchKey}`,
    );

    if (data) {
      store.dispatch(ResetEmployeeDetails());
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetEmployeeLists(data?.[0]?.Data));
      store.dispatch(SetTotalEmployee(total || 0));
    }
  }

  static async DepartmentHeads(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(`/Employee/DepartmentHeads`);

    if (data) {
      store.dispatch(SetDepartmentHeadsList(data));
    }
  }

  static async StaffList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(`/Employee/StaffList`);

    if (data) {
      store.dispatch(SetStaffList(data));
    }
  }

  static async EmployeeDropDown() {
    const { data } = await RestClient.getRequest(`/Employee/EmployeeDropDown`);

    if (data) {
      store.dispatch(SetEmployeeDropDown(data));
    }
  }

  static async EmployeeDetails(id, postBody) {
    const { data } = await RestClient.getRequest(
      `/Employee/EmployeeDetails/${id}`,
    );

    if (data) {
      store.dispatch(SetEmployeeDetails(data?.[0]));
      return true;
    }
  }

  static async EmployeeUpdate(id, postBody) {
    const { data } = await RestClient.updateRequest(
      `/Employee/EmployeeUpdate/${id}`,
      postBody,
    );

    if (data) {
      store.dispatch(ResetEmployeeDetails());
      ToastMessage.successMessage("Employee Update Successful");
      return true;
    }
  }

  static async EmployeeDelete(id) {
    const { data } = await RestClient.deleteRequest(
      `/Employee/EmployeeDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("Employee Delete Successful");
      return true;
    }
  }
}

export default EmployeeRequest;
