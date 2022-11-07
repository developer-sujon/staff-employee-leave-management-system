//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetDepartmentDetails } from "../redux/slices/DepartmentSlice";
import {
  SetTotalDepartment,
  SetDepartmentLists,
  SetDepartmentDetails,
  SetDepartmentDropDown,
} from "../redux/slices/DepartmentSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class DepartmentRequest {
  static async DepartmentCreate(postBody) {
    const { data } = await RestClient.postRequest(
      "/Department/DepartmentCreate",
      postBody,
    );

    if (data) {
      store.dispatch(ResetDepartmentDetails());
      ToastMessage.successMessage("Department Create Successful");
      return true;
    }
  }

  static async DepartmentList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/Department/DepartmentList/${pageNumber}/${perPage}/${searchKey}`,
    );

    if (data) {
      store.dispatch(ResetDepartmentDetails());
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetDepartmentLists(data?.[0]?.Data));
      store.dispatch(SetTotalDepartment(total || 0));
    }
  }

  static async DepartmentDropDown() {
    const { data } = await RestClient.getRequest(`/Department/DepartmentDropDown`);

    if (data) {
      store.dispatch(SetDepartmentDropDown(data));
    }
  }

  static async DepartmentDetails(id, postBody) {
    const { data } = await RestClient.getRequest(
      `/Department/DepartmentDetails/${id}`,
    );

    if (data) {
      store.dispatch(SetDepartmentDetails(data?.[0]));
      return true;
    }
  }

  static async DepartmentUpdate(id, postBody) {
    const { data } = await RestClient.updateRequest(
      `/Department/DepartmentUpdate/${id}`,
      postBody,
    );

    if (data) {
      store.dispatch(ResetDepartmentDetails());
      ToastMessage.successMessage("Department Update Successful");
      return true;
    }
  }

  static async DepartmentDelete(id) {
    const { data } = await RestClient.deleteRequest(
      `/Department/DepartmentDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("Department Delete Successful");
      return true;
    }
  }
}

export default DepartmentRequest;
