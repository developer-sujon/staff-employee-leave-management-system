// @flow
import classNames from "classnames";
import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const Statistics = ({ totalLeave, summaryLists }) => {
  return (
    <Row>
      <Col xs={12}>
        <Card className="widget-inline">
          <Card.Body className="p-0">
            <Row className="g-0">
              <Col sm={6} lg={3}>
                <Card className="shadow-none m-0">
                  <Card.Body className="text-center">
                    <i className="dripicons-clipboard text-muted font-24"></i>
                    <h3>
                      <span>{totalLeave || 0}</span>
                    </h3>
                    <p className="text-muted font-15 mb-0">Total Leave</p>
                  </Card.Body>
                </Card>
              </Col>

              {summaryLists?.map((summary) => (
                <Col sm={6} lg={3}>
                  <Card className="shadow-none m-0 border-start">
                    <Card.Body className="text-center">
                      <i
                        className={classNames("text-muted font-24", {
                          "dripicons-hourglass": summary?._id === "Pending",
                          "dripicons-document-delete":
                            summary?._id === "Rejected",
                          "dripicons-thumbs-up": summary?._id === "Approved",
                        })}
                      ></i>
                      <h3>
                        <span>{summary?.count || 0}</span>
                        <i
                          className={classNames("mdi mdi-arrow-up", {
                            "text-warning": summary?._id === "Pending",
                            "text-danger": summary?._id === "Rejected",
                            "text-success": summary?._id === "Approved",
                          })}
                        ></i>
                      </h3>
                      <p className="text-muted font-15 mb-0">
                        {summary?._id} Leave
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Statistics;
