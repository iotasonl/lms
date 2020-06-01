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
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Plus, Minus } from "react-feather";

const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
];

const AddSyllabus = () => {
  const [chapters, setChapters] = useState([{ chapter: "", topics: [] }]);

  const handleAddFields = () => {
    const values = [...chapters];
    values.push({ chapter: "", topics: [] });
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

  const handleRemoveTopic = (index, topicIndex) => {
    const values = [...chapters];
    values[index].topics.splice(topicIndex, 1);
    setChapters(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...chapters];
    if (event.target.name === "chapter") {
      values[index].chapter = event.target.value;
    } else {
      // values[index].topic = event.target.value;
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
                <div className="row">
                  {/*CLASS*/}
                  <FormGroup className="col-md-6 col-sm-6 col-6">
                    <Label for="studentClass">Class</Label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      defaultValue={colourOptions[0]}
                      name="class"
                      options={colourOptions}
                    />
                  </FormGroup>
                  {/*SUBJECT*/}
                  <FormGroup className="col-md-6 col-sm-6 col-6">
                    <Label for="studentClass">Subject</Label>
                    <Select
                      className="React"
                      classNamePrefix="select"
                      defaultValue={colourOptions[0]}
                      name="class"
                      options={colourOptions}
                    />
                  </FormGroup>
                </div>
                <hr />
                {chapters.map((chapter, index) => (
                  <Fragment key={`${chapter}~${index}`}>
                    <div className="row">
                      {/*FIRST NAME*/}
                      <FormGroup className="col-md-10 col-sm-2">
                        <Label for="chapter">Chapter- {index + 1}</Label>
                        <Input
                          style={{ marginBottom: "5px" }}
                          type="text"
                          name="chapter"
                          id={`${chapter}~${index}`}
                          value={chapter.chapter}
                          onChange={(event) => handleInputChange(index, event)}
                        />
                        {chapters[index].topics
                          ? chapters[index].topics.map((topic, topicIndex) => (
                              <Fragment key={`${topic}~${topicIndex}`}>
                                <div className="row">
                                  <div
                                    className="col-md-1"
                                    style={{ borderRight: "1px solid #28c76f" }}
                                  />
                                  <div className="col-md-10 col-10">
                                    <Input
                                      type="text"
                                      name="topic"
                                      className="round form-control-sm"
                                      id={`${topic}~${topicIndex}`}
                                      value={topic.topic}
                                      onChange={(event) =>
                                        handleInputChange(index, event)
                                      }
                                      placeholder={"Topic- " + topicIndex}
                                    />
                                    {console.log(topic + topicIndex + index)}
                                  </div>
                                  <div className="col-md-1 col-2">
                                    <Button.Ripple
                                      color="flat-success"
                                      className="btn-icon btn-sm"
                                      onClick={() =>
                                        handleRemoveTopic(index, topicIndex)
                                      }
                                    >
                                      <Minus size={16} />
                                    </Button.Ripple>
                                  </div>
                                </div>
                              </Fragment>
                            ))
                          : ""}
                        <div className="row">
                          <div className="col-1" />
                          <div className="col-3">
                            <Button.Ripple
                              color="primary"
                              className="btn-sm"
                              type="button"
                              onClick={() => handleAddTopic(index)}
                            >
                              Add Topic
                            </Button.Ripple>
                          </div>
                        </div>
                      </FormGroup>
                      {chapters.length >= 2 ? (
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
                      ) : null}
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
                    <hr />
                  </Fragment>
                ))}
                <Row className="justify-content-end">
                  <Col sm="2">
                    <Button.Ripple color="primary" type="submit">
                      Submit
                    </Button.Ripple>
                  </Col>
                </Row>

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
