// @flow
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// components
import Statistics from "./Statistics";
import { useSelector } from "react-redux";
import SummaryRequest from "../../APIRequest/SummaryRequest";

const HodDashboard = () => {
  const { t } = useTranslation();

  useEffect(() => {
    SummaryRequest.DashboardSummaryHod();
  }, []);

  const { SummaryLists, TotalSummary } = useSelector((state) => state.Summary);

  return (
    <>
      <Row>
        <Col xs={12}>
          <div className="page-title-box">
            <div className="page-title-right"></div>
            <h4 className="page-title"> {t("Dashboard")}</h4>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Statistics totalLeave={TotalSummary} summaryLists={SummaryLists} />
        </Col>
      </Row>
    </>
  );
};

export default HodDashboard;
