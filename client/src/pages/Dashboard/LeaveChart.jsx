// @flow
import classNames from "classnames";
import React from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";

const LeaveChart = ({ summaryLists }) => {
  const apexDonutOpts = {
    chart: {
      height: 340,
      type: "donut",
    },
    colors: ["#0acf97", "#fa5c7c", "#ffbc00"],
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 376,
        options: {
          chart: {
            width: 250,
            height: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <Card>
      <Card.Body>
        <Chart
          options={apexDonutOpts}
          series={summaryLists?.map((i) => i.count)}
          type="donut"
          height={222}
          className="apex-charts mb-4 mt-4"
        />

        <div className="chart-widget-list">
          {summaryLists?.map((summary) => (
            <p>
              <i
                className={classNames("mdi mdi-square", {
                  "text-warning": summary?._id === "Pending",
                  "text-danger": summary?._id === "Rejected",
                  "text-success": summary?._id === "Approved",
                })}
              ></i>
              {summary?._id}
              <span className="float-end">{summary?.count || 0}</span>
            </p>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default LeaveChart;
