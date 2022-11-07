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
import NewsRequest from "../../APIRequest/NewsRequest";
import CategoryRequest from "../../APIRequest/CategoryRequest";
import SubCategoryRequest from "../../APIRequest/SubCategoryRequest";
import TagRequest from "../../APIRequest/TagRequest";

const NewsCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { NewsDetails } = useSelector((state) => state.News);
  const { CategoryDropDown } = useSelector((state) => state.Category);
  const { SubCategoryDropDown } = useSelector((state) => state.SubCategory);
  const { TagDropDown } = useSelector((state) => state.Tag);

  const navigate = useNavigate();

  useEffect(() => {
    CategoryRequest.CategoryDropDown();
    SubCategoryRequest.SubCategoryDropDown();
    TagRequest.TagDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      NewsRequest.NewsDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    Category: yup.string().required("Please Enter Category"),
    NewsTitle: yup.string().required("Please Enter News Title"),
    NewsThumbnail: yup.string().required("Please Enter News Thumbnail"),
  });

  console.log(NewsDetails);

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateNews = (values) => {
    if (!ObjectID) {
      NewsRequest.NewsCreate({
        Category: values.Category,
        SubCategory: values.SubCategory,
        Tags: values.Tags,
        NewsTitle: values.NewsTitle,
        NewsThumbnail: values.NewsThumbnail,
        NewsDetails: values.NewsDetails,
        NewsStatus: values.NewsStatus,
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/news/news-list");
        }
      });
    } else {
      NewsRequest.NewsUpdate(ObjectID, {
        Category: values.Category,
        SubCategory: values.SubCategory,
        Tags: values.Tags,
        NewsTitle: values.NewsTitle,
        NewsThumbnail: values.NewsThumbnail,
        NewsDetails: values.NewsDetails,
        NewsStatus: values.NewsStatus,
      }).then((result) => {
        if (result) {
          navigate("/news/news-list");
        }
      });
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "News", path: "/news/news-list" },
          {
            label: !ObjectID ? "Create News" : "Update News",
            path: "/news/news-list",
            active: true,
          },
        ]}
        title={!ObjectID ? "Create News" : "Update News"}
      />

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col>
                  <VerticalForm
                    onSubmit={CreateUpdateNews}
                    validationSchema={validationSchema}
                    defaultValues={NewsDetails}
                  >
                    <Row>
                      <Col>
                        <FormInput
                          name="Category"
                          label={t("News Category")}
                          placeholder={t("Enter News Category")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={CategoryDropDown}
                          defaultValue={CategoryDropDown?.find(
                            (i) => i.value === NewsDetails?.Category,
                          )}
                        />

                        <FormInput
                          name="SubCategory"
                          label={t("News Sub Category")}
                          placeholder={t("Enter News Sub Category")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={SubCategoryDropDown}
                          defaultValue={SubCategoryDropDown?.find(
                            (i) => i.value === NewsDetails?.SubCategory,
                          )}
                        />

                        <FormInput
                          name="Tags"
                          label={t("News Tags")}
                          placeholder={t("Enter News Tags")}
                          containerClass={"mb-3"}
                          type="react-multiple-select"
                          options={TagDropDown}
                        />

                        <FormInput
                          name="NewsTitle"
                          label={t("News Title")}
                          placeholder={t("Enter News Title")}
                          containerClass={"mb-3"}
                        />
                        <FormInput
                          name="NewsThumbnail"
                          label={t("News Thumbnail Url")}
                          placeholder={t("Enter News Thumbnail Url")}
                          containerClass={"mb-3"}
                          type="url"
                        />

                        <FormInput
                          name="NewsDetails"
                          label={t("News Details")}
                          placeholder={t("Enter News Details")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />

                        <FormInput
                          name="NewsStatus"
                          label={t("News Status")}
                          placeholder={t("Enter News Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" variant="success">
                          {!ObjectID ? "Add News" : "Update News"}
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

export default NewsCreateUpdatePage;
