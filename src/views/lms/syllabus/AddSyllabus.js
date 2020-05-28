import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  FormGroup,
  Label,
  Row,
  Input,
} from "reactstrap";
import Select from "react-select";
import * as Yup from "yup";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Plus, Minus } from "react-feather";

const AddSyllabus = () => {
  const defaultChapters = [
    { chapter: "", topics: [{ chapterIndex: "", topic: "" }] },
  ];
  const [chapters, setChapters] = useState([
    { chapter: "", topics: [{ chapterIndex: "", topic: "" }] },
  ]);
  const handleAddFields = () => {
    const values = [...defaultChapters];
    values.push({ chapter: "", topics: [{ chapterIndex: "", topic: "" }] });
    setChapters(values);
  };

  const handleAddTopic = (index) => {
    const values = [...chapters];
    values[index].topics.push({ chapterIndex: "", topic: "" });
    setChapters(values);
    console.log(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...chapters];
    values.splice(index, 1);
    setChapters(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...chapters];
    if (event.target.name === "chapter") {
      values[index].chapter = event.target.value;
    } else {
      values[index].chapter = event.target.value;
    }
    setChapters(values);
  };

  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbLinks={[
          { title: "View Syllabus", link: "/syllabus/viewSyllabus" },
          { title: "Bulk Upload", link: "/syllabus/syllabusBulkUpload" },
        ]}
        breadCrumbTitle="Add Syllabus"
        breadCrumbParent="Syllabus"
        breadCrumbActive="Add Syllabus"
      />
      <Row>
        <Col lg="12" md="12">
          <Card>
            <CardBody>
              <form>
                {chapters.map((chapter, index) => (
                  <Fragment key={`${chapter}~${index}`}>
                    <div className="row">
                      {/*FIRST NAME*/}
                      <FormGroup className="col-md-10 col-sm-2">
                        <Label for="chapter">First Name</Label>
                        <Input
                          type="text"
                          name="chapter"
                          id="{`${chapter}~${index}`}"
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        <br />
                        {chapters[0].topics.map((topic, topicIndex) => (
                          <Fragment key={`${topic}~${topicIndex}`}>
                            <div className="row">
                              <div className="col-md-1">
                                <Button.Ripple
                                  type="button"
                                  className="btn-icon"
                                  color="warning"
                                >
                                  <Minus size={16} />
                                </Button.Ripple>
                              </div>
                              <div className="col-md-11">
                                <Input
                                  type="text"
                                  name="topic"
                                  id={`${topic}~${topicIndex}`}
                                />
                              </div>
                            </div>
                          </Fragment>
                        ))}
                        <br />
                        <Button.Ripple
                          color="primary"
                          type="button"
                          onClick={() => handleAddTopic(index)}
                        >
                          Add Topic
                        </Button.Ripple>
                      </FormGroup>
                      <div className="d-inline-block mr-1 mb-1">
                        <br />{" "}
                        <Button.Ripple
                          type="button"
                          className="btn-icon"
                          color="warning"
                          onClick={() => handleRemoveFields(index)}
                        >
                          <Minus size={16} />
                        </Button.Ripple>
                      </div>
                      <div className="d-inline-block mr-1 mb-1">
                        <br />{" "}
                        <Button.Ripple
                          type="button"
                          className="btn-icon"
                          color="warning"
                          onClick={() => handleAddFields()}
                        >
                          <Plus size={16} />
                        </Button.Ripple>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <Button.Ripple color="primary" type="submit">
                  Submit
                </Button.Ripple>
                <br />
                <pre>{JSON.stringify(chapters, null, 2)}</pre>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default AddSyllabus;
