//Internal Import
import { SetTotalSummary, SetSummaryLists } from "../redux/slices/SummarySlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class SummaryRequest {
  static async DashboardSummaryAdmin() {
    const { data } = await RestClient.getRequest(
      `/Summary/DashboardSummaryAdmin`,
    );

    if (data) {
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetSummaryLists(data?.[0]?.Data));
      store.dispatch(SetTotalSummary(total || 0));
    }
  }

  static async DashboardSummaryHod() {
    const { data } = await RestClient.getRequest(
      `/Summary/DashboardSummaryHod`,
    );

    if (data) {
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetSummaryLists(data?.[0]?.Data));
      store.dispatch(SetTotalSummary(total || 0));
    }
  }

  static async DashboardSummaryEmployee() {
    const { data } = await RestClient.getRequest(
      `/Summary/DashboardSummaryEmployee`,
    );

    if (data) {
      const total = data?.[0]?.Total[0]?.count;
      store.dispatch(SetSummaryLists(data?.[0]?.Data));
      store.dispatch(SetTotalSummary(total || 0));
    }
  }
}

export default SummaryRequest;
