//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetLeaveDetails } from "../redux/slices/LeaveSlice";
import {
  SetTotalLeave,
  SetLeaveLists,
  SetLeaveDetails,
  SetLeaveDropDown,
} from "../redux/slices/LeaveSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class LeaveRequest {
  static async LeaveCreate(postBody) {
    const { data } = await RestClient.postRequest(
      "/Leave/LeaveCreate",
      postBody,
    );

    if (data) {
      store.dispatch(ResetLeaveDetails());
      ToastMessage.successMessage("Leave Create Successful");
      return true;
    }
  }

  static async LeaveList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/Leave/LeaveList/${pageNumber}/${perPage}/${searchKey}`,
    );

    if (data) {
      store.dispatch(ResetLeaveDetails());
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetLeaveLists(data?.[0]?.Data));
      store.dispatch(SetTotalLeave(total || 0));
    }
  }

  static async LeaveAdminList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/Leave/LeaveAdminList/${pageNumber}/${perPage}/${searchKey}`,
    );

    if (data) {
      store.dispatch(ResetLeaveDetails());
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetLeaveLists(data?.[0]?.Data));
      store.dispatch(SetTotalLeave(total || 0));
    }
  }

  static async LeaveListAdminByStatus(
    pageNumber,
    perPage,
    searchKey,
    postBody,
  ) {
    const { data } = await RestClient.postRequest(
      `/Leave/LeaveListAdminByStatus/${pageNumber}/${perPage}/${searchKey}`,

      postBody,
    );

    if (data) {
      store.dispatch(ResetLeaveDetails());
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetLeaveLists(data?.[0]?.Data));
      store.dispatch(SetTotalLeave(total || 0));
    }
  }

  static async LeaveListHodByStatus(pageNumber, perPage, searchKey, postBody) {
    const { data } = await RestClient.postRequest(
      `/Leave/LeaveListHodByStatus/${pageNumber}/${perPage}/${searchKey}`,
      postBody,
    );

    if (data) {
      store.dispatch(ResetLeaveDetails());
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetLeaveLists(data?.[0]?.Data));
      store.dispatch(SetTotalLeave(total || 0));
    }
  }

  static async LeaveDropDown() {
    const { data } = await RestClient.getRequest(`/Leave/LeaveDropDown`);

    if (data) {
      store.dispatch(SetLeaveDropDown(data));
    }
  }

  static async LeaveDetails(id) {
    const { data } = await RestClient.getRequest(`/Leave/LeaveDetails/${id}`);

    if (data) {
      store.dispatch(SetLeaveDetails(data?.[0]));
      return true;
    }
  }

  static async LeaveUpdate(id, postBody) {
    const { data } = await RestClient.updateRequest(
      `/Leave/LeaveUpdate/${id}`,
      postBody,
    );

    if (data) {
      store.dispatch(ResetLeaveDetails());
      ToastMessage.successMessage("Leave Update Successful");
      return true;
    }
  }

  static async LeaveDelete(id) {
    const { data } = await RestClient.deleteRequest(`/Leave/LeaveDelete/${id}`);

    if (data) {
      ToastMessage.successMessage("Leave Delete Successful");
      return true;
    }
  }
}

export default LeaveRequest;
