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
import TagRequest from "../../APIRequest/TagRequest";

const TagCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { TagDetails } = useSelector((state) => state.Tag);

  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      TagRequest.TagDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    TagName: yup.string().required("Please Enter Tag Name"),
    TagSlug: yup.string().required("Please Enter Tag Slug"),
  });

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateTag = (values) => {
    if (!ObjectID) {
      TagRequest.TagCreate({
        TagName: values.TagName,
        TagSlug: values.TagSlug,
        TagDetails: values.TagDetails,
        TagStatus: values.TagStatus,
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/tag/tag-list");
        }
      });
    } else {
      TagRequest.TagUpdate(ObjectID, {
        TagName: values.TagName,
        TagSlug: values.TagSlug,
        TagDetails: values.TagDetails,
        TagStatus: values.TagStatus,
      }).then((result) => {
        if (result) {
          navigate("/tag/tag-list");
        }
      });
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tag", path: "/tag/tag-list" },
          {
            label: !ObjectID ? "Create Tag" : "Update Tag",
            path: "/tag/tag-list",
            active: true,
          },
        ]}
        title={!ObjectID ? "Create Tag" : "Update Tag"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <VerticalForm
                    onSubmit={CreateUpdateTag}
                    validationSchema={validationSchema}
                    defaultValues={TagDetails}
                  >
                    <Row>
                      <Col>
                        <FormInput
                          name="TagName"
                          label={t("Tag Name")}
                          placeholder={t("Enter Tag Name")}
                          containerClass={"mb-3"}
                        />
                        <FormInput
                          name="TagSlug"
                          label={t("Tag Slug")}
                          placeholder={t("Enter Tag Slug")}
                          containerClass={"mb-3"}
                        />

                        <FormInput
                          name="TagDetails"
                          label={t("Tag Details")}
                          placeholder={t("Enter Tag Details")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />

                        <FormInput
                          name="TagStatus"
                          label={t("Tag Status")}
                          placeholder={t("Enter Tag Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" variant="success">
                          {!ObjectID ? "Add Tag" : "Update Tag"}
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

export default TagCreateUpdatePage;
