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
import LeaveRequest from "../../APIRequest/LeaveRequest";

const LeaveAdminUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { LeaveDetails } = useSelector((state) => state.Leave);

  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      LeaveRequest.LeaveDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    NumOfDay: yup.string().required("Please Enter NumOfDay"),
    AdminStatus: yup.string().required("Please Select Admin Status"),
    AdminRemark: yup.string().required("Please Enter Admin Remark"),
  });

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateLeave = (values) => {
    if (!ObjectID) {
      LeaveRequest.LeaveCreate({
        AdminStatus: values.AdminStatus,
        AdminRemark: values.AdminRemark,
        NumOfDay: values.NumOfDay,
      }).then((result) => {
        if (result) {
          navigate("/leave/leave-list");
        }
      });
    } else {
      LeaveRequest.LeaveUpdate(ObjectID, {
        AdminRemark: values.AdminRemark,
        AdminStatus: values.AdminStatus,
        NumOfDay: values.NumOfDay,
      }).then((result) => {
        if (result) {
          navigate("/leave/leave-list");
        }
      });
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Leave", path: "/leave/leave-list" },
          {
            label: !ObjectID ? "Create Leave" : "Update Leave",
            path: "/leave/leave-list",
            active: true,
          },
        ]}
        title={!ObjectID ? "Create Leave" : "Update Leave"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <VerticalForm
                    onSubmit={CreateUpdateLeave}
                    validationSchema={validationSchema}
                    defaultValues={LeaveDetails}
                  >
                    <Row>
                      <Col xl={12}>
                        <FormInput
                          name="NumOfDay"
                          label={t("Num Of Day")}
                          placeholder={t("Enter Num Of Day")}
                          containerClass={"mb-3"}
                          type="number"
                        />

                        <FormInput
                          name="AdminStatus"
                          label={t("Admin Status")}
                          placeholder={t("Select Admin Status")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={[
                            { value: "Pending", label: "Pending" },
                            { value: "Approved", label: "Approved" },
                            { value: "Rejected", label: "Rejected" },
                          ]}
                          defaultValue={[
                            { value: "Pending", label: "Pending" },
                            { value: "Approved", label: "Approved" },
                            { value: "Rejected", label: "Rejected" },
                          ].find((i) => i.value === LeaveDetails?.AdminStatus)}
                        />
                      </Col>
                      <Col xl={12}>
                        <FormInput
                          name="AdminRemark"
                          label={t("Admin Remark")}
                          placeholder={t("Enter Admin Remark")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" variant="success">
                          {!ObjectID ? "Add Leave" : "Update Leave"}
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

export default LeaveAdminUpdatePage;
