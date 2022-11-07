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
import SubCategoryRequest from "../../APIRequest/SubCategoryRequest";
import CategoryRequest from "../../APIRequest/CategoryRequest";

const SubCategoryCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { SubCategoryDetails } = useSelector((state) => state.SubCategory);
  const { CategoryDropDown } = useSelector((state) => state.Category);

  const navigate = useNavigate();

  useEffect(() => {
    CategoryRequest.CategoryDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      SubCategoryRequest.SubCategoryDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    CategoryId: yup.string().required("Please Enter CategoryId"),
    SubCategoryName: yup.string().required("Please Enter Sub Category Name"),
    SubCategorySlug: yup.string().required("Please Enter Sub Category Slug"),
  });

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateSubCategory = (values) => {
    if (!ObjectID) {
      SubCategoryRequest.SubCategoryCreate({
        CategoryId: values.CategoryId,
        SubCategoryName: values.SubCategoryName,
        SubCategorySlug: values.SubCategorySlug,
        SubCategoryDetails: values.SubCategoryDetails,
        SubCategoryStatus: values.SubCategoryStatus,
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/subcategory/subcategory-list");
        }
      });
    } else {
      SubCategoryRequest.SubCategoryUpdate(ObjectID, {
        CategoryId: values.CategoryId,
        SubCategoryName: values.SubCategoryName,
        SubCategorySlug: values.SubCategorySlug,
        SubCategoryDetails: values.SubCategoryDetails,
        SubCategoryStatus: values.SubCategoryStatus,
      }).then((result) => {
        if (result) {
          navigate("/subcategory/subcategory-list");
        }
      });
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Sub Category", path: "/subcategory/subcategory-list" },
          {
            label: !ObjectID ? "Create Sub Category" : "Update Sub Category",
            path: "/subcategory/subcategory-list",
            active: true,
          },
        ]}
        title={!ObjectID ? "Create Sub Category" : "Update Sub Category"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <VerticalForm
                    onSubmit={CreateUpdateSubCategory}
                    validationSchema={validationSchema}
                    defaultValues={SubCategoryDetails}
                  >
                    <Row>
                      <Col>
                        <FormInput
                          name="CategoryId"
                          label={t("Product Category")}
                          placeholder={t("Enter Product Category")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={CategoryDropDown}
                          defaultValue={CategoryDropDown.find(
                            (i) => i.value === SubCategoryDetails?.CategoryId,
                          )}
                        />

                        <FormInput
                          name="SubCategoryName"
                          label={t("Sub Category Name")}
                          placeholder={t("Enter Sub Category Name")}
                          containerClass={"mb-3"}
                        />
                        <FormInput
                          name="SubCategorySlug"
                          label={t("Sub Category Slug")}
                          placeholder={t("Enter Sub Category Slug")}
                          containerClass={"mb-3"}
                        />

                        <FormInput
                          name="SubCategoryDetails"
                          label={t("Sub Category Details")}
                          placeholder={t("Enter Sub Category Details")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />

                        <FormInput
                          name="SubCategoryStatus"
                          label={t("Sub Category Status")}
                          placeholder={t("Enter Sub Category Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" variant="success">
                          {!ObjectID
                            ? "Add Sub Category"
                            : "Update Sub Category"}
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

export default SubCategoryCreateUpdatePage;
