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
import { defaultAvatarImg } from "../../helpers/Default";
import LeaveTypeRequest from "../../APIRequest/LeaveTypeRequest";

const LeaveCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { LeaveDetails } = useSelector((state) => state.Leave);
  const { LeaveTypeDropDown } = useSelector((state) => state.LeaveType);

  let [PreviewImg, SetPreviewImg] = useState(defaultAvatarImg);

  const navigate = useNavigate();

  useEffect(() => {
    LeaveTypeRequest.LeaveTypeDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      LeaveRequest.LeaveDetails(id).then((result) => {
        SetPreviewImg(LeaveDetails?.LeaveAvatar);
      });

      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    LeaveType: yup.string().required("Please Select LeaveType"),
    NumOfDay: yup.string().required("Please Enter Num Of Day"),
    StartLeaveDate: yup.string().required("Please Enter Start Leave Date"),
    EndLeaveDate: yup.string().required("Please Enter End Leave Date"),
    LeaveDetails: yup.string().required("Please Enter Leave Details"),
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
        LeaveType: values.LeaveType,
        NumOfDay: values.NumOfDay,
        StartLeaveDate: values.StartLeaveDate,
        EndLeaveDate: values.EndLeaveDate,
        LeaveDetails: values.LeaveDetails,
      }).then((result) => {
        if (result) {
          navigate("/leave/leave-list");
        }
      });
    } else {
      LeaveRequest.LeaveUpdate(ObjectID, {
        LeaveType: values.LeaveType,
        NumOfDay: values.NumOfDay,
        StartLeaveDate: values.StartLeaveDate,
        EndLeaveDate: values.EndLeaveDate,
        LeaveDetails: values.LeaveDetails,
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
                      <Col>
                        <FormInput
                          name="LeaveType"
                          label={t("Leave Type")}
                          placeholder={t("Enter Leave Type")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={LeaveTypeDropDown}
                          defaultValue={LeaveTypeDropDown.find(
                            (i) => i.value === LeaveDetails?.LeaveType,
                          )}
                        />
                      </Col>
                      <Col>
                        <FormInput
                          name="NumOfDay"
                          label={t("Num Of Day")}
                          placeholder={t("Enter Num Of Day")}
                          containerClass={"mb-3"}
                          type="number"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormInput
                          type="date"
                          name="StartLeaveDate"
                          label={t("Start Leave Date")}
                          placeholder={t("Start Leave Date")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                      <Col>
                        <FormInput
                          type="date"
                          name="EndLeaveDate"
                          label={t("End Leave Date")}
                          placeholder={t("End Leave Date")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormInput
                          type="simple-rich-edior"
                          name="LeaveDetails"
                          label={t("Leave Details")}
                          placeholder={t("Leave Details")}
                          containerClass={"mb-3"}
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

export default LeaveCreateUpdatePage;
