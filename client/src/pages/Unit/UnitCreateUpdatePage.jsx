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
import UnitRequest from "../../APIRequest/UnitRequest";

const UnitCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { UnitDetails } = useSelector((state) => state.Unit);

  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      UnitRequest.UnitDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    UnitName: yup.string().required("Please Enter Unit Name"),
  });

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateUnit = (values) => {
    if (!ObjectID) {
      UnitRequest.UnitCreate({
        UnitName: values.UnitName,
        UnitDetails: values.UnitDetails,
        UnitStatus: values.UnitStatus,
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/unit/unit-list");
        }
      });
    } else {
      UnitRequest.UnitUpdate(ObjectID, {
        UnitName: values.UnitName,
        UnitDetails: values.UnitDetails,
        UnitStatus: values.UnitStatus,
      }).then((result) => {
        if (result) {
          navigate("/unit/unit-list");
        }
      });
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Unit", path: "/unit/unit-list" },
          {
            label: !ObjectID ? "Create Unit" : "Update Unit",
            path: "/unit/unit-list",
            active: true,
          },
        ]}
        title={!ObjectID ? "Create Unit" : "Update Unit"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <VerticalForm
                    onSubmit={CreateUpdateUnit}
                    validationSchema={validationSchema}
                    defaultValues={UnitDetails}
                  >
                    <Row>
                      <Col>
                        <FormInput
                          name="UnitName"
                          label={t("Unit Name")}
                          placeholder={t("Enter Unit Name")}
                          containerClass={"mb-3"}
                        />

                        <FormInput
                          name="UnitDetails"
                          label={t("Unit Details")}
                          placeholder={t("Enter Unit Details")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />

                        <FormInput
                          name="UnitStatus"
                          label={t("Unit Status")}
                          placeholder={t("Enter Unit Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" variant="success">
                          {!ObjectID ? "Add Unit" : "Update Unit"}
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

export default UnitCreateUpdatePage;
