//Exteral Lib Import
import { Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

//Internal Lib Import
import { VerticalForm, FormInput } from "../../components/Ui";
import AccountLayout from "./AccountLayout";
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

const VerifyOtpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /*
    form validation schema
    */
  const validationSchema = yup.object().shape({
    OTP: yup
      .string()
      .required(t("Please enter OTP"))
      .min(6, "Must be 6 digits"),
  });

  /*
    handle form submission
    */
  const onSubmit = (formData) => {
    UserRequest.VerifyRecoveryOtp(formData.OTP).then((r) => {
      if (r) {
        navigate("/account/reset-password");
      }
    });
  };

  return (
    <>
      <AccountLayout bottomLinks={<BottomLink />}>
        <div className="text-center w-75 m-auto">
          <h4 className="text-dark-50 text-center mt-0 fw-bold">
            {t("Verify Otp Code")}
          </h4>
        </div>

        <VerticalForm
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          defaultValues={{ OTP: "" }}
        >
          <FormInput
            label={t("Otp Code")}
            type="code-input"
            name="OTP"
            placeholder={t("Enter your Otp Code")}
            containerClass={"mb-3"}
          />

          <div className="mb-3 mb-0 text-center">
            <Button variant="primary" type="submit" disabled={false}>
              {t("Verify Otp")}
            </Button>
          </div>
        </VerticalForm>
      </AccountLayout>
    </>
  );
};

export default VerifyOtpPage;
