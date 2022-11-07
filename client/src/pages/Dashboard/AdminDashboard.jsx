// @flow
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// components
import Statistics from "./Statistics";
import PerformanceChart from "./PerformanceChart";
import EmployeeRequest from "../../APIRequest/EmployeeRequest";
import { useSelector } from "react-redux";
import SummaryRequest from "../../APIRequest/SummaryRequest";
import DepartmentHead from "./DepartmentHead";
import StaffListCom from "./StaffList";

const AdminDashboard = () => {
  const { t } = useTranslation();

  useEffect(() => {
    EmployeeRequest.EmployeeList(1, 5, 0);
    SummaryRequest.DashboardSummaryAdmin();
    EmployeeRequest.DepartmentHeads();
    EmployeeRequest.StaffList();
  }, []);

  const { EmployeeLists, TotalEmployee, DepartmentHeadsList, StaffList } =
    useSelector((state) => state.Employee);

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
          <Statistics
            totalEmployee={TotalEmployee}
            totalLeave={TotalSummary}
            summaryLists={SummaryLists}
          />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <DepartmentHead departmentHeadsList={DepartmentHeadsList} />
        </Col>
        <Col lg={6}>
          <StaffListCom staffList={StaffList} />
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
