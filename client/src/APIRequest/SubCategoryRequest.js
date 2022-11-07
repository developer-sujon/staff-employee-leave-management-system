//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetSubCategoryDetails } from "../redux/slices/SubCategorySlice";
import {
  SetTotalSubCategory,
  SetSubCategoryLists,
  SetSubCategoryDetails,
  SetSubCategoryDropDown,
} from "../redux/slices/SubCategorySlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class SubCategoryRequest {
  static async SubCategoryCreate(postBody) {
    const { data } = await RestClient.postRequest(
      "/SubCategory/SubCategoryCreate",
      postBody,
    );

    if (data) {
      store.dispatch(ResetSubCategoryDetails());
      ToastMessage.successMessage("SubCategory Create Successful");
      return true;
    }
  }

  static async SubCategoryList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/SubCategory/SubCategoryList/${pageNumber}/${perPage}/${searchKey}`,
    );

    if (data) {
      store.dispatch(ResetSubCategoryDetails());
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetSubCategoryLists(data?.[0]?.Data));
      store.dispatch(SetTotalSubCategory(total || 0));
    }
  }

  static async SubCategoryDropDown() {
    const { data } = await RestClient.getRequest(
      `/SubCategory/SubCategoryDropDown`,
    );

    if (data) {
      store.dispatch(SetSubCategoryDropDown(data));
    }
  }

  static async SubCategoryDetails(id, postBody) {
    const { data } = await RestClient.getRequest(
      `/SubCategory/SubCategoryDetails/${id}`,
    );

    if (data) {
      store.dispatch(SetSubCategoryDetails(data?.[0]));
      return true;
    }
  }

  static async SubCategoryUpdate(id, postBody) {
    const { data } = await RestClient.updateRequest(
      `/SubCategory/SubCategoryUpdate/${id}`,
      postBody,
    );

    if (data) {
      store.dispatch(ResetSubCategoryDetails());
      ToastMessage.successMessage("SubCategory Update Successful");
      return true;
    }
  }

  static async SubCategoryDelete(id) {
    const { data } = await RestClient.deleteRequest(
      `/SubCategory/SubCategoryDelete/${id}`,
    );

    if (data) {
      ToastMessage.successMessage("SubCategory Delete Successful");
      return true;
    }
  }
}

export default SubCategoryRequest;
