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
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Plus, Minus } from "react-feather";
import {
  RadioInput,
} from "../../../components/hrmsComponent/form/input";


let datas ,title,type;
const SetQuestion = (props) => {
  const [questions, setQuestions] = useState([
    {
      questionType:"",
      question:"",
      option:[
        {
          option1:"",
          option2:""
        }
      ]
    }
  ]);

  const [questionType, setQuestionType] = useState({type: ""})

  const handleAddQuestion = (type) => {
    console.log(type)
    const values = [...questions];
    values.push({ question: "", topics: [] });
    setQuestions(values);
  };
  //
  //
  // const handleAddOption = (index) => {
  //   const values = [...chapters];
  //   values[index].topics.push({ chapterIndex: "", topic: "" });
  //   setChapters(values);
  // };
  //
  // const handleRemoveQuestion = (index) => {
  //   const values = [...chapters];
  //   values.splice(index, 1);
  //   setChapters(values);
  // };
  //
  // const handleRemoveOption = (index, topicIndex) => {
  //   const values = [...chapters];
  //   values[index].topics.splice(topicIndex, 1);
  //   setChapters(values);
  // };

  const handleInputChange = (index, event) => {
    const values = [...questions];
    console.log(event.target.name)
    if (event.target.name === "question") {
      values[index].question = event.target.value;
    }
    else if(event.target.name === "questionType"){
      values.type = event.target.value
      setQuestionType(values);
    }
    else {
      // values[index].topic = event.target.value;
    }
    setQuestions(values);
  };
  // const handleSubmit = (values, { setSubmitting }) => {
  //   const payload = {
  //     ...values,
  //     option: values.option.value,
  //   };
  //   setTimeout(() => {
  //     console.log(JSON.stringify(payload, null, 2));
  //     setSubmitting(false);
  //   }, 1000);
  // };
  // const handleChange = (value) => {
  //   props.onChange(props.name, value);
  //   console.log(value.target.value);
  // };
  // const handleBlur = () => {
  //   props.onBlur(props.name, true);
  // };
  // handleSubmit = (values, { setSubmitting }) => {
  //   const payload = {
  //     ...values,
  //     answer: values.answer.value,
  //   };
  //   if(props.match.params.TestId !== "0")
  //   {
  //     console.log("Updating Board..");
  //   }
  //   else {
  //     console.log("Inserting Board..");
  //   }
  //   setTimeout(() => {
  //     console.log(JSON.stringify(payload, null, 2));
  //     setSubmitting(false);
  //   }, 1000);
  // };

  if(props.match.params.TestId === "0")
  {
    datas = {
      id: "",
      question: "",
      answer:"",
      option1:"",
      option2:"",
      option3:"",
      option4:"",
      option5:"",
      marks:""
    };
    title="Set Question";
  }
  else
  {
    datas = {
      id: "1",
      question: "What is this??",
      answer:"2",
      option1:"Okkk",
      option2:"Laptop",
      option3:"watch",
      option4:"Fun",
      option5:"Bad",
      marks:"100"
    };
    title="Update Question";
  }

  return (
    <React.Fragment>
      <Breadcrumbs
        breadCrumbLinks={[
          { title: "Test List", link: "/exam/test-list" },
        ]}
        breadCrumbTitle={title}
        breadCrumbParent="Material"
        breadCrumbActive={title}
      />
      <Row>
        <Col lg="12" md="12">
          <Card>
            <CardBody>
              <form>
                <div className="row">
                  <Col className="my-2 col-md-8 col-sm-12">
                    {questions.map((question, index) => (
                      <Fragment key={`${question}~${index}`}>
                        <div className="row">
                          {/*FIRST NAME*/}
                          <FormGroup className="col-md-10 col-sm-2">
                            <Label for="chapter">Question- {index + 1}</Label>
                            <Input
                              style={{ marginBottom: "5px" }}
                              type="text"
                              name="chapter"
                              id={`${question}~${index}`}
                              value={question.question}
                              // onChange={(event) => handleInputChange(index, event)}
                            />
                            {questions[index].options
                              ? questions[index].options.map((option, optionIndex) => (
                                <Fragment key={`${option}~${optionIndex}`}>
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
                                        id={`${option}~${optionIndex}`}
                                        value={option.option}
                                      />
                                      {console.log(option + optionIndex + index)}
                                    </div>
                                    <div className="col-md-1 col-2">
                                      <Button.Ripple
                                        color="flat-success"
                                        className="btn-icon btn-sm"
                                        // onClick={() =>
                                        //   handleRemoveTopic(index, optionIndex)
                                        // }
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
                                  // onClick={() => handleAddTopic(index)}
                                >
                                  Add Topic
                                </Button.Ripple>
                              </div>
                            </div>
                          </FormGroup>
                          {questions.length >= 2 ? (
                            <div className="d-inline-block mr-1 mb-1">
                              <br />{" "}
                              <Button.Ripple
                                type="button"
                                className="btn-icon"
                                color="warning"
                                // onClick={() => handleRemoveFields(index)}
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
                              // onClick={() => handleAddFields()}
                            >
                              <Plus size={16} />
                            </Button.Ripple>
                          </div>
                        </div>
                        <hr />
                  </Fragment>
                ))}
                </Col>
                <Col className="my-2 col-md-4 col-sm-12 row">
                    <FormGroup className="col-md-12 col-sm-12">
                      <div
                        style={{
                          borderRadius: "5px",
                          padding: "5px 20px 5px 8px",
                        }}
                      >
                        <RadioInput
                          label="Multiple Choice Question (MCQ)"
                          defaultChecked={true}
                          name="questionType"
                          value="1"
                          className="d-inline-block mr-1"

                          onChange={() => handleInputChange}
                        />
                      </div>
                      <br />
                      <div
                        style={{
                          borderRadius: "5px",
                          padding: "5px 20px 5px 8px",
                        }}
                      >
                        <RadioInput
                          label="Long Answer Question"
                          defaultChecked={false}
                          name="questionType"
                          value="2"
                          className="d-inline-block mr-1"
                          onChange={() => handleInputChange}
                        />
                      </div>
                      <br />
                      <div
                        style={{
                          borderRadius: "5px",
                          padding: "5px 20px 5px 8px",
                        }}
                      >
                        <RadioInput
                          label="Short Answer Qusetion"
                          defaultChecked={false}
                          name="questionType"
                          value="3"
                          className="d-inline-block mr-1"
                          onChange={() => handleInputChange}
                        />
                      </div>
                      <div className="justify-content-end">
                        <Col mt="2">
                          <Button.Ripple color="primary" onClick={()=>handleAddQuestion(questionType)}>
                            ADD
                          </Button.Ripple>
                        </Col>
                      </div>
                    </FormGroup>
                  </Col>
                </div>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  // disabled={isSubmitting}
                >
                  Submit
                </Button.Ripple>
                <pre>{JSON.stringify(questions, null, 2)}</pre>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default SetQuestion;
