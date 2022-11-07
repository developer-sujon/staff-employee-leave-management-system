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
import DepartmentRequest from "../../APIRequest/DepartmentRequest";

const DepartmentCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { DepartmentDetails } = useSelector((state) => state.Department);

  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      DepartmentRequest.DepartmentDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    DepartmentName: yup.string().required("Please Enter Department Name"),
    DepartmentShortName: yup
      .string()
      .required("Please Enter Department Short Name"),
  });

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateDepartment = (values) => {
    if (!ObjectID) {
      DepartmentRequest.DepartmentCreate({
        DepartmentName: values.DepartmentName,
        DepartmentShortName: values.DepartmentShortName,
        DepartmentDetails: values.DepartmentDetails,
        DepartmentStatus: values.DepartmentStatus,
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/department/department-list");
        }
      });
    } else {
      DepartmentRequest.DepartmentUpdate(ObjectID, {
        DepartmentName: values.DepartmentName,
        DepartmentShortName: values.DepartmentShortName,
        DepartmentDetails: values.DepartmentDetails,
        DepartmentStatus: values.DepartmentStatus,
      }).then((result) => {
        if (result) {
          navigate("/department/department-list");
        }
      });
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Department", path: "/department/department-list" },
          {
            label: !ObjectID ? "Create Department" : "Update Department",
            path: "/department/department-list",
            active: true,
          },
        ]}
        title={!ObjectID ? "Create Department" : "Update Department"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <VerticalForm
                    onSubmit={CreateUpdateDepartment}
                    validationSchema={validationSchema}
                    defaultValues={DepartmentDetails}
                  >
                    <Row>
                      <Col>
                        <FormInput
                          name="DepartmentName"
                          label={t("Department Name")}
                          placeholder={t("Enter Department Name")}
                          containerClass={"mb-3"}
                        />
                        <FormInput
                          name="DepartmentShortName"
                          label={t("Department Short Name")}
                          placeholder={t("Enter Department Short Name")}
                          containerClass={"mb-3"}
                        />

                        <FormInput
                          name="DepartmentDetails"
                          label={t("Department Details")}
                          placeholder={t("Enter Department Details")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />

                        <FormInput
                          name="DepartmentStatus"
                          label={t("Department Status")}
                          placeholder={t("Enter Department Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" variant="success">
                          {!ObjectID ? "Add Department" : "Update Department"}
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

export default DepartmentCreateUpdatePage;
