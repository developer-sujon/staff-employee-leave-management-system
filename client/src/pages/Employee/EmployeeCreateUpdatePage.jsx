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
import EmployeeRequest from "../../APIRequest/EmployeeRequest";
import { defaultAvatarImg } from "../../helpers/Default";
import DepartmentRequest from "../../APIRequest/DepartmentRequest";

const EmployeeCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { EmployeeDetails } = useSelector((state) => state.Employee);
  const { DepartmentDropDown } = useSelector((state) => state.Department);

  let [PreviewImg, SetPreviewImg] = useState(defaultAvatarImg);

  const navigate = useNavigate();

  useEffect(() => {
    DepartmentRequest.DepartmentDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      EmployeeRequest.EmployeeDetails(id).then((result) => {
        SetPreviewImg(EmployeeDetails?.EmployeeAvatar);
      });

      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    DepartmentId: yup.string().required("Please Select DepartmentId"),
    FirstName: yup.string().required("Please Enter First Name"),
    LastName: yup.string().required("Please Enter Last Name"),
    Gender: yup.string().required("Please Select Gender"),
    Phone: yup.string().required("Please Enter Phone"),
    Email: yup.string().required("Please Enter Email"),
    Password: yup.string().required("Please Enter Password"),
    DateOfBirth: yup.string().required("Please Enter Date Of Birth"),
    Address: yup.string().required("Please Enter Address"),
  });

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateEmployee = (values) => {
    if (!values.EmployeeAvatar) values.EmployeeAvatar = defaultAvatarImg;
    if (!ObjectID) {
      EmployeeRequest.EmployeeCreate({
        DepartmentId: values.DepartmentId,
        FirstName: values.FirstName,
        LastName: values.LastName,
        Gender: values.Gender,
        DateOfBirth: values.DateOfBirth,
        Address: values.Address,
        Phone: values.Phone,
        Email: values.Email,
        Password: values.Password,
        Roles: values.Roles,
        Image: values.Image,
      }).then((result) => {
        if (result) {
          navigate("/employee/employee-list");
        }
      });
    } else {
      EmployeeRequest.EmployeeUpdate(ObjectID, {
        DepartmentId: values.DepartmentId,
        FirstName: values.FirstName,
        LastName: values.LastName,
        Gender: values.Gender,
        DateOfBirth: values.DateOfBirth,
        Address: values.Address,
        Phone: values.Phone,
        Email: values.Email,
        Password: values.Password,
        Roles: values.Roles,
        Image: values.Image,
      }).then((result) => {
        if (result) {
          navigate("/employee/employee-list");
        }
      });
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Employee", path: "/employee/employee-list" },
          {
            label: !ObjectID ? "Create Employee" : "Update Employee",
            path: "/employee/employee-list",
            active: true,
          },
        ]}
        title={!ObjectID ? "Create Employee" : "Update Employee"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <VerticalForm
                    onSubmit={CreateUpdateEmployee}
                    validationSchema={validationSchema}
                    defaultValues={EmployeeDetails}
                  >
                    <Row>
                      <Col>
                        <img
                          src={PreviewImg || EmployeeDetails?.Image}
                          alt="EmployeeAvatar"
                        />
                        <hr />
                        <FormInput
                          name="Image"
                          label={t("Employee Avatar")}
                          type="file"
                          placeholder={t("Upload Employee Avatar")}
                          containerClass={"mb-3"}
                          onChange={(img) => SetPreviewImg(img)}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xl={6}>
                        <FormInput
                          name="DepartmentId"
                          label={t("Department Id")}
                          placeholder={t("Enter Department Id")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={DepartmentDropDown}
                          defaultValue={DepartmentDropDown.find(
                            (i) => i.value === EmployeeDetails?.DepartmentId,
                          )}
                        />
                      </Col>
                      <Col xl={6}>
                        <FormInput
                          name="FirstName"
                          label={t("First Name")}
                          placeholder={t("Enter First Name")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xl={6}>
                        <FormInput
                          name="LastName"
                          label={t("Last Name")}
                          placeholder={t("Enter Last Name")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                      <Col xl={6}>
                        <FormInput
                          name="Gender"
                          label={t("Gender")}
                          placeholder={t("Select Gender")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={[
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" },
                            { value: "Others", label: "Others" },
                          ]}
                          defaultValue={[
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" },
                            { value: "Others", label: "Others" },
                          ].find((i) => i.value === EmployeeDetails?.Gender)}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xl={6}>
                        <FormInput
                          type="react-phone"
                          name="Phone"
                          label={t("Phone")}
                          placeholder={t("Enter Phone")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                      <Col xl={6}>
                        <FormInput
                          name="Email"
                          label={t("Email")}
                          placeholder={t("Enter Email")}
                          containerClass={"mb-3"}
                          type="email"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xl={6}>
                        <FormInput
                          type="password"
                          name="Password"
                          label={t("Password")}
                          placeholder={t("Enter Password")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                      <Col xl={6}>
                        <FormInput
                          name="Roles"
                          label={t("Roles")}
                          placeholder={t("Enter Roles")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={[
                            { value: "STAFF", label: "STAFF" },
                            { value: "HOD", label: "HOD" },
                          ]}
                          defaultValue={[
                            { value: "STAFF", label: "STAFF" },
                            { value: "HOD", label: "HOD" },
                          ].find((i) => i.value === EmployeeDetails?.Roles)}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xl={6}>
                        <FormInput
                          type="date"
                          name="DateOfBirth"
                          label={t("Date Of Birth")}
                          placeholder={t("Enter Date Of Birth")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                      <Col xl={6}>
                        <FormInput
                          name="Address"
                          label={t("Address")}
                          placeholder={t("Enter Address")}
                          containerClass={"mb-3"}
                          type="textarea"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" variant="success">
                          {!ObjectID ? "Add Employee" : "Update Employee"}
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

export default EmployeeCreateUpdatePage;
