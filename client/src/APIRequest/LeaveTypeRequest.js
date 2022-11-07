//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetLeaveTypeDetails } from "../redux/slices/LeaveTypeSlice";
import {
  SetTotalLeaveType,
  SetLeaveTypeLists,
  SetLeaveTypeDetails,
  SetLeaveTypeDropDown,
} from "../redux/slices/LeaveTypeSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class LeaveTypeRequest {
  static async LeaveTypeCreate(postBody) {
    const { data } = await RestClient.postRequest(
      "/LeaveType/LeaveTypeCreate",
      postBody,
    );

    if (data) {
      store.dispatch(ResetLeaveTypeDetails());
      ToastMessage.successMessage("LeaveType Create Successful");
      return true;
    }
  }

  static async LeaveTypeList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/LeaveType/LeaveTypeList/${pageNumber}/${perPage}/${searchKey}`,
    );

    if (data) {
      store.dispatch(ResetLeaveTypeDetails());
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetLeaveTypeLists(data?.[0]?.Data));
      store.dispatch(SetTotalLeaveType(total || 0));
    }
  }

  static async LeaveTypeDropDown() {
    const { data } = await RestClient.getRequest(`/LeaveType/LeaveTypeDropDown`);

    if (data) {
      store.dispatch(SetLeaveTypeDropDown(data));
    }
  }

  static async LeaveTypeDetails(id, postBody) {
    const { data } = await RestClient.getRequest(
      `/LeaveType/LeaveTypeDetails/${id}`,
    );

    if (data) {
      store.dispatch(SetLeaveTypeDetails(data?.[0]));
      return true;
    }
  }

  static async LeaveTypeUpdate(id, postBody) {
    const { data } = await RestClient.updateRequest(
      `/LeaveType/LeaveTypeUpdate/${id}`,
      postBody,
    );

    if (data) {
      store.dispatch(ResetLeaveTypeDetails());
      ToastMessage.successMessage("LeaveType Update Successful");
      return true;
    }
  }

  static async LeaveTypeDelete(id) {
    const { data } = await RestClient.deleteRequest(
      `/LeaveType/LeaveTypeDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("LeaveType Delete Successful");
      return true;
    }
  }
}

export default LeaveTypeRequest;
