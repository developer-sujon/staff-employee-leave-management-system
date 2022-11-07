//Exteral Lib Import
import { Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

//Internal Lib Import
import { VerticalForm, FormInput } from "../../components/Ui";
import AccountLayout from "./AccountLayout";
import AuthRequest from "../../APIRequest/AuthRequest";
import UserRequest from "../../APIRequest/UserRequest";

/* bottom link of account pages */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-muted">
          {t("Don't have an account?")}{" "}
          <Link to={"/account/register"} className="text-muted ms-1">
            <b>{t("Sign Up")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const ResetPasswordPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  /*
    form validation schema
    */
  const validationSchema = yup.object().shape({
    Password: yup.string().required(t("Please enter Password")),
    ConfirmPassword: yup
      .string()
      .required(t("Please enter Confirm Password"))
      .oneOf([yup.ref("Password"), null], "Passwords must match"),
  });

  /*
    handle form submission
    */
  const onSubmit = (formData) => {
    UserRequest.RecoveryResetPass({ Password: formData.Password }).then((r) => {
      if (r) {
        navigate("/account/login");
      }
    });
  };

  return (
    <>
      <AccountLayout bottomLinks={<BottomLink />}>
        <div className="text-center w-75 m-auto">
          <h4 className="text-dark-50 text-center mt-0 fw-bold">
            {t("Reset Password")}
          </h4>
        </div>

        <VerticalForm
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          defaultValues={{ Email: "", Password: "" }}
        >
          <FormInput
            label={t("Password")}
            type="password"
            name="Password"
            placeholder={t("Enter your Password")}
            containerClass={"mb-3"}
          >
            <Link
              to="/account/forget-password"
              className="text-muted float-end"
            >
              <small>{t("Forgot your password?")}</small>
            </Link>
          </FormInput>

          <FormInput
            label={t("Confirm Password")}
            type="password"
            name="ConfirmPassword"
            placeholder={t("Enter your Confirm Password")}
            containerClass={"mb-3"}
          />

          <div className="mb-3 mb-0 text-center">
            <Button variant="primary" type="submit" disabled={false}>
              {t("Log In")}
            </Button>
          </div>
        </VerticalForm>
      </AccountLayout>
    </>
  );
};

export default ResetPasswordPage;
