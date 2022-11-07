//External Lib Import
import { useSelector } from "react-redux";
import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import UserRequest from "../../APIRequest/UserRequest";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { UserDetails } = useSelector((state) => state.User);

  let [PreviewImg, SetPreviewImg] = useState(UserDetails.Image);

  const navigate = useNavigate();

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    FirstName: yup.string().required("Please Enter First Name"),
    LastName: yup.string().required("Please Enter Last Name"),
    Gender: yup.string().required("Please Select Gender"),
    Phone: yup.string().required("Please Enter Phone"),
    Email: yup.string().required("Please Enter Email"),
    DateOfBirth: yup.string().required("Please Enter Date Of Birth"),
    Address: yup.string().required("Please Enter Address"),
  });

  /**
   * Handle the form submission
   */
  const CreateUpdateEmployee = (values) => {
    UserRequest.ProfileUpdate({
      FirstName: values.FirstName,
      LastName: values.LastName,
      Gender: values.Gender,
      DateOfBirth: values.DateOfBirth,
      Address: values.Address,
      Phone: values.Phone,
      Email: values.Email,
      Image: values.Image,
    }).then((result) => {
      if (result) {
        UserRequest.ProfileDetails().then((r) => {
          if (r) {
            navigate("/dashboard");
          }
        });
      }
    });
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Profile", path: "/dashboard" },
          {
            label: "Update Profile",
            path: "/dashboard",
            active: true,
          },
        ]}
        title="Update Profile"
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
                    defaultValues={UserDetails}
                  >
                    <Row>
                      <Col>
                        <img
                          src={PreviewImg || UserDetails?.Image}
                          alt="EmployeeAvatar"
                          style={{ maxWidth: "100px" }}
                        />
                        <hr />
                        <Row>
                          <Col xl={6}>
                            <FormInput
                              name="Image"
                              label={t("Employee Avatar")}
                              type="file"
                              placeholder={t("Upload Employee Avatar")}
                              containerClass={"mb-3"}
                              onChange={(img) => SetPreviewImg(img)}
                            />
                          </Col>
                          <Col xl={6}>
                            <FormInput
                              name="FirstName"
                              label={t("First Name")}
                              placeholder={t("Enter First Name")}
                              containerClass={"mb-3 mt-4"}
                            />
                          </Col>
                        </Row>
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
                          ].find((i) => i.value === UserDetails?.Gender)}
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
                      <Col>
                        <FormInput
                          type="date"
                          name="DateOfBirth"
                          label={t("Date Of Birth")}
                          placeholder={t("Enter Date Of Birth")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
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
                          Update Profile
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

export default ProfilePage;
