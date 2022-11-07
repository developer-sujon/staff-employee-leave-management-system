//External Lib Import
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import LeaveTypeRequest from "../../APIRequest/LeaveTypeRequest";

const LeaveTypeCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { LeaveTypeDetails } = useSelector((state) => state.LeaveType);

  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      LeaveTypeRequest.LeaveTypeDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    LeaveTypeName: yup.string().required("Please Enter Leave Type Name"),
  });

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateLeaveType = (values) => {
    if (!ObjectID) {
      LeaveTypeRequest.LeaveTypeCreate({
        LeaveTypeName: values.LeaveTypeName,
        LeaveTypeDetails: values.LeaveTypeDetails,
        LeaveTypeStatus: values.LeaveTypeStatus,
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/leave-type/leave-type-list");
        }
      });
    } else {
      LeaveTypeRequest.LeaveTypeUpdate(ObjectID, {
        LeaveTypeName: values.LeaveTypeName,
        LeaveTypeDetails: values.LeaveTypeDetails,
        LeaveTypeStatus: values.LeaveTypeStatus,
      }).then((result) => {
        if (result) {
          navigate("/leave-type/leave-type-list");
        }
      });
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Leave Type", path: "/leave-type/leave-type-list" },
          {
            label: !ObjectID ? "Create Leave Type" : "Update Leave Type",
            path: "/leave-type/leave-type-list",
            active: true,
          },
        ]}
        title={!ObjectID ? "Create Leave Type" : "Update Leave Type"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <VerticalForm
                    onSubmit={CreateUpdateLeaveType}
                    validationSchema={validationSchema}
                    defaultValues={LeaveTypeDetails}
                  >
                    <Row>
                      <Col>
                        <FormInput
                          name="LeaveTypeName"
                          label={t("LeaveType Name")}
                          placeholder={t("Enter LeaveType Name")}
                          containerClass={"mb-3"}
                        />

                        <FormInput
                          name="LeaveTypeDetails"
                          label={t("LeaveType Details")}
                          placeholder={t("Enter LeaveType Details")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />

                        <FormInput
                          name="LeaveTypeStatus"
                          label={t("LeaveType Status")}
                          placeholder={t("Enter LeaveType Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" variant="success">
                          {!ObjectID ? "Add Leave Type" : "Update Leave Type"}
                        </Button>
                      </Col>
                    </Row>
                  </VerticalForm>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default LeaveTypeCreateUpdatePage;
