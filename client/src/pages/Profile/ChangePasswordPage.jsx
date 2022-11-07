//External Lib Import
import { useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import UserRequest from "../../APIRequest/UserRequest";

const ChangePasswordPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    PreviousPassword: yup.string().required("Please Enter Previous Password"),
    NewPassword: yup.string().required("Please Enter New Password"),
    PasswordConfirmation: yup
      .string()
      .required("Please Enter Confirm Password")
      .oneOf([yup.ref("NewPassword"), null], "Passwords must match"),
  });

  /**
   * Handle the form submission
   */
  const CreateUpdateEmployee = (values) => {
    UserRequest.EmployeeChangePassword({
      PreviousPassword: values.PreviousPassword,
      NewPassword: values.NewPassword,
    }).then((result) => {
      if (result) {
        navigate("/dashboard");
      }
    });
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Setting", path: "/dashboard" },
          {
            label: "Update Setting",
            path: "/dashboard",
            active: true,
          },
        ]}
        title="Update Password"
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
                    defaultValues={{
                      PreviousPassword: "",
                      NewPassword: "",
                      PasswordConfirmation: "",
                    }}
                  >
                    <Row>
                      <Col sm={12}>
                        <FormInput
                          name="PreviousPassword"
                          label={t("Previous Password")}
                          placeholder={t("Enter Previous Password")}
                          containerClass={"mb-3"}
                          type="password"
                        />
                      </Col>
                      <Col sm={12}>
                        <FormInput
                          name="NewPassword"
                          label={t("New Password")}
                          placeholder={t("Enter New Password")}
                          containerClass={"mb-3"}
                          type="password"
                        />
                      </Col>
                      <Col sm={12}>
                        <FormInput
                          name="PasswordConfirmation"
                          label={t("Confirm New Password")}
                          placeholder={t("Enter Confirm New Password")}
                          containerClass={"mb-3"}
                          type="password"
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

export default ChangePasswordPage;
