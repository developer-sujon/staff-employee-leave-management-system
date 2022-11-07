//Exteral Lib Import
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import * as yup from "yup";

//Internal Lib Import
import { VerticalForm, FormInput } from "../../components/Ui";
import AccountLayout from "./AccountLayout";
import AuthRequest from "../../APIRequest/AuthRequest";

/* bottom link */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-muted">
          {t("Already have account?")}{" "}
          <Link to={"/account/login"} className="text-muted ms-1">
            <b>{t("Log In")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    Name: yup.string().required(t("Please enter name")),
    Phone: yup.string().required(t("Please enter mobile number")),
    Email: yup
      .string()
      .required("Please enter Email")
      .email("Please enter valid Email"),
    Password: yup.string().required(t("Please enter password")),
    ConfirmPassword: yup
      .string()
      .required(t("Please enter Confirm Password"))
      .oneOf([yup.ref("Password"), null], "Passwords must match"),
    Tandc: yup
      .boolean()
      .required("You must accept the terms and conditions")
      .oneOf([true], "You must accept the terms and conditions"),
  });

  /*
   * handle form submission
   */
  const onSubmit = (formData) => {
    AuthRequest.RegisterUser(formData).then((result) => {
      if (result) {
        navigate("/account/login");
      }
    });
  };

  return (
    <AccountLayout bottomLinks={<BottomLink />}>
      <div className="text-center w-75 m-auto">
        <h4 className="text-dark-50 text-center mt-0 fw-bold">
          {t("Free Sign Up")}
        </h4>
        <p className="text-muted mb-4">
          {t(
            "Don't have an account? Create your account, it takes less than a minute.",
          )}
        </p>
      </div>

      <VerticalForm
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        defaultValues={{ Name: "", Phone: "", Email: "", Password: "" }}
      >
        <FormInput
          label={t("Name")}
          type="text"
          name="Name"
          placeholder={t("Enter your name")}
          containerClass={"mb-3"}
        />
        <FormInput
          label={t("Mobile Number")}
          type="react-phone"
          name="Phone"
          placeholder={t("Enter your mobile")}
          containerClass={"mb-3"}
        />
        <FormInput
          label={t("Email address")}
          type="email"
          name="Email"
          placeholder={t("Enter your email")}
          containerClass={"mb-3"}
        />
        <FormInput
          label={t("Password")}
          type="password"
          name="Password"
          placeholder={t("Enter your password")}
          containerClass={"mb-3"}
        />
        <FormInput
          label={t("Confirm Password")}
          type="password"
          name="ConfirmPassword"
          placeholder={t("Enter your Confirm password")}
          containerClass={"mb-3"}
        />
        <FormInput
          label={t("I accept Terms and Conditions")}
          type="checkbox"
          name="Tandc"
          containerClass={"mb-3 text-muted"}
        />

        <div className="mb-3 mb-0 text-center">
          <Button variant="primary" type="submit">
            {t("Sign Up")}
          </Button>
        </div>
      </VerticalForm>
    </AccountLayout>
  );
};

export default Register;
