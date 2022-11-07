//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { ResetNewsDetails } from "../redux/slices/NewsSlice";
import {
  SetTotalNews,
  SetNewsLists,
  SetNewsDetails,
  SetNewsDropDown,
} from "../redux/slices/NewsSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class NewsRequest {
  static async NewsCreate(postBody) {
    const { data } = await RestClient.postRequest("/News/NewsCreate", postBody);

    if (data) {
      store.dispatch(ResetNewsDetails());
      ToastMessage.successMessage("News Create Successful");
      return true;
    }
  }

  static async NewsList(pageNumber, perPage, searchKey) {
    const { data } = await RestClient.getRequest(
      `/News/NewsList/${pageNumber}/${perPage}/${searchKey}`,
    );

    if (data) {
      store.dispatch(ResetNewsDetails());
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetNewsLists(data?.[0]?.Data));
      store.dispatch(SetTotalNews(total || 0));
    }
  }

  static async NewsDropDown() {
    const { data } = await RestClient.getRequest(`/News/NewsDropDown`);

    if (data) {
      store.dispatch(SetNewsDropDown(data));
    }
  }

  static async NewsDetails(id, postBody) {
    const { data } = await RestClient.getRequest(`/News/NewsDetails/${id}`);

    if (data) {
      store.dispatch(SetNewsDetails(data?.[0]));
      return true;
    }
  }

  static async NewsUpdate(id, postBody) {
    const { data } = await RestClient.updateRequest(
      `/News/NewsUpdate/${id}`,
      postBody,
    );

    if (data) {
      store.dispatch(ResetNewsDetails());
      ToastMessage.successMessage("News Update Successful");
      return true;
    }
  }

  static async NewsDelete(id) {
    const { data } = await RestClient.deleteRequest(`/News/NewsDelete/${id}`);

    if (data) {
      ToastMessage.successMessage("News Delete Successful");
      return true;
    }
  }
}

export default NewsRequest;
