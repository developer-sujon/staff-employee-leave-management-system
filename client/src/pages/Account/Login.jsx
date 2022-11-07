//Exteral Lib Import
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

//Internal Lib Import
import { VerticalForm, FormInput } from "../../components/Ui";
import AccountLayout from "./AccountLayout";
import AuthRequest from "../../APIRequest/AuthRequest";

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

const Login = () => {
  const { t } = useTranslation();

  /*
    form validation schema
    */
  const validationSchema = yup.object().shape({
    Email: yup.string().required(t("Please enter Email")),
    Password: yup.string().required(t("Please enter Password")),
  });

  /*
    handle form submission
    */
  const onSubmit = (formData) => {
    AuthRequest.LoginUser(formData);
  };

  return (
    <>
      <AccountLayout bottomLinks={<BottomLink />}>
        <div className="text-center w-75 m-auto">
          <h4 className="text-dark-50 text-center mt-0 fw-bold">
            {t("Sign In")}
          </h4>
          <p className="text-muted mb-4">
            {t("Enter your email address and password to access admin panel.")}
          </p>
        </div>

        <VerticalForm
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          defaultValues={{ Email: "", Password: "" }}
        >
          <FormInput
            label={t("Email")}
            type="email"
            name="Email"
            placeholder={t("Enter your Email")}
            containerClass={"mb-3"}
          />

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

export default Login;
