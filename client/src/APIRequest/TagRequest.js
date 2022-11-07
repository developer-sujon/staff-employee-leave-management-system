//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetTagDetails } from "../redux/slices/TagSlice";
import {
  SetTotalTag,
  SetTagLists,
  SetTagDetails,
  SetTagDropDown,
} from "../redux/slices/TagSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class TagRequest {
  static async TagCreate(postBody) {
    const { data } = await RestClient.postRequest("/Tag/TagCreate", postBody);

    if (data) {
      store.dispatch(ResetTagDetails());
      ToastMessage.successMessage("Tag Create Successful");
      return true;
    }
  }

  static async TagList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/Tag/TagList/${pageNumber}/${perPage}/${searchKey}`,
    );

    if (data) {
      store.dispatch(ResetTagDetails());
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetTagLists(data?.[0]?.Data));
      store.dispatch(SetTotalTag(total || 0));
    }
  }

  static async TagDropDown() {
    const { data } = await RestClient.getRequest(`/Tag/TagDropDown`);

    if (data) {
      store.dispatch(SetTagDropDown(data));
    }
  }

  static async TagDetails(id, postBody) {
    const { data } = await RestClient.getRequest(`/Tag/TagDetails/${id}`);

    if (data) {
      store.dispatch(SetTagDetails(data?.[0]));
      return true;
    }
  }

  static async TagUpdate(id, postBody) {
    const { data } = await RestClient.updateRequest(
      `/Tag/TagUpdate/${id}`,
      postBody,
    );

    if (data) {
      store.dispatch(ResetTagDetails());
      ToastMessage.successMessage("Tag Update Successful");
      return true;
    }
  }

  static async TagDelete(id) {
    const { data } = await RestClient.deleteRequest(`/Tag/TagDelete/${id}`);

    if (data) {
      ToastMessage.successMessage("Tag Delete Successful");
      return true;
    }
  }
}

export default TagRequest;
