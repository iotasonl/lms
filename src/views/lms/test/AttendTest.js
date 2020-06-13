import React from "react";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import {
  Card,
  CardBody,
  FormGroup,
  Button,
  Col,
  Label
} from "reactstrap"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import {
  RadioInput,
} from "../../../components/hrmsComponent/form/input";

let datas ,title , button;
const formSchema = Yup.object().shape({
  name: Yup.string().required("This Field Is Required"),
  nickname: Yup.string()
    .required("This Field Is Required"),
  boardType: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("This Field is required!"),
})

class AttendTest extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  render() {
    if(this.props.match.params.StudentId === "0") {
      datas = {
        id: "1",
        testName: "Weekly Test",
        testDuration: "2:30 Hrs",
        fullMarks: "80",
        questions: [
          {
            sn: 1,
            question: "Who is Modi?",
            questionType: "MCQ",
            marks: "5",
            answer: "",
            options:
              [{
                option1: "PM",
                option2: "CM",
                option3: "FM",
                option4: "HM"
              }],
          },
          {
            sn: 2,
            question: "What is your name?",
            questionType: "Short",
            marks: "5",
            answer: "",
          },
          {
            sn: 3,
            question: "Write 5 animal's name.",
            questionType: "Long",
            marks: "10",
            answer: ""
          },
          {
            sn: 4,
            question: "Choose Fruits in Given Option?",
            questionType: "MTO",
            marks: "10",
            options:
              [{
                option1: "Apple",
                option2: "Mango",
                option3: "Orange",
                option4: "Pig"
              }],
            answer:"",
          }
        ]
      }
      title="Attend Test";
      button="True";
    }
    else
    {
      datas = {
        id: "1",
        testName: "Weekly Test",
        testDuration: "2:30 Hrs",
        fullMarks: "80",
        questions: [
          {
            sn: 1,
            question: "Who is Modi?",
            questionType: "MCQ",
            marks: "5",
            answer: "option1",
            options:
              [{
                option1: "PM",
                option2: "CM",
                option3: "FM",
                option4: "HM"
              }],
          },
          {
            sn: 2,
            question: "What is your name?",
            questionType: "Short",
            marks: "5",
            answer: "Subh",
          },
          {
            sn: 3,
            question: "Write 5 animal's name.",
            questionType: "Long",
            marks: "10",
            answer: "Cow, Fox, Ox, Horse, Pig"
          },
          {
            sn: 4,
            question: "Choose Fruits in Given Option?",
            questionType: "MTO",
            marks: "10",
            options:
              [{
                option1: "Apple",
                option2: "Mango",
                option3: "Orange",
                option4: "Pig"
              }],
            answer:
              [{
                answer1: "option1",
                answer2: "option2",
                answer3: "option3"
              }],
          }
        ]
      }
      title="Answer Sheet";
      button = "False";
    }
    // console.log(datas.questions);
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "", link: "" },
          ]}
          breadCrumbTitle={title}
          breadCrumbParent="Test"
          breadCrumbActive={title}
        />
        <Card>
          <CardBody>
            <Formik
              initialValues={{
                name: "",
                nickname:"",
                boardType: ""
              }}
              validationSchema={formSchema}
              onSubmit={this.handleSubmit}
            >
              {({
                  errors,
                  touched,
                }) => (
                <Form>
                  <FormGroup className="row">
                    <Col md="12" className="row">
                      <Col md="4" className="my-1">
                        <Label>Test Name :- {datas.testName}</Label>
                      </Col>
                      <Col md="4" className="my-1">
                        <Label>Full Marks :- {datas.fullMarks}</Label>
                      </Col>
                      <Col md="4" className="my-1">
                        <Label>Test Duration :- {datas.testDuration}</Label>
                      </Col>
                    </Col>
                    <Col md="12" className="my-1">
                      {
                        datas.questions.map(question =>(
                          <FormGroup className="row my-1" key={question.sn}>
                            {
                              question.questionType === "MCQ" ?
                                <React.Fragment>
                                  <Col md="1" className="my-1">
                                    <Label>Q {question.sn}</Label>
                                  </Col>
                                  <Col md="10" className="my-1">
                                    <Label>{question.question}</Label>
                                    <div
                                      style={{
                                        borderRadius: "5px",
                                        padding: "5px 20px 5px 8px",
                                      }}
                                    >
                                      {
                                        question.options.map((option ,i)=>
                                        <FormGroup className="row" key={i}>
                                        <Col md="1">
                                          {++i}).
                                        </Col>
                                        <Col md="11">
                                          <RadioInput
                                            label={option.option1}
                                            // defaultChecked={
                                            //   question.answer.trim()!== "" ?
                                            //     true
                                            //     : false
                                            // }
                                            name="gender"
                                            value="1"
                                            className="d-inline-block mr-1"
                                            // onChange={handleChange}
                                            // onBlur={handleBlur}
                                          />
                                        </Col>
                                        </FormGroup>
                                        )
                                      }
                                    </div>
                                  </Col>
                                  <Col md="1" className="my-1">
                                    <Label>{question.marks}</Label>
                                  </Col>
                                </React.Fragment>
                                : question.questionType === "Short" ?
                                <React.Fragment>
                                  <Col md="1" className="my-1">
                                    <Label>Q {question.sn}</Label>
                                  </Col>
                                  <Col md="10" className="my-1">
                                    <Label>{question.question}</Label>
                                    <Field
                                      name={'answer'+question.sn}
                                      id={'answer'+question.sn}
                                      value={
                                      question.answer.trim()!== "" ?
                                          question.answer
                                        : null
                                        }
                                      // readOnly={
                                      //   question.answer.trim()!== "" ?
                                      //     true
                                      //     : false
                                      // }
                                      className={`form-control ${
                                        errors.username &&
                                        touched.username &&
                                        "is-invalid"
                                      }`}
                                    />
                                  </Col>
                                  <Col md="1" className="my-1">
                                    <Label>{question.marks}</Label>
                                  </Col>
                                </React.Fragment>
                                : question.questionType === "Long" ?
                                <React.Fragment>
                                  <Col md="1" className="my-1">
                                    <Label>Q {question.sn}</Label>
                                  </Col>
                                  <Col md="10" className="my-1">
                                    <Label>{question.question}</Label>
                                    <Field
                                      component="textarea"
                                      style={{resize:'none'}}
                                      name={'answer'+question.sn}
                                      id={'answer'+question.sn}
                                      value={
                                        question.answer.trim()!== "" ?
                                          question.answer
                                          : null
                                      }
                                      // readOnly={
                                      //   question.answer.trim()!== "" ?
                                      //     true
                                      //     : false
                                      // }
                                      className={`form-control ${
                                        errors.username &&
                                        touched.username &&
                                        "is-invalid"
                                      }`}
                                    />
                                  </Col>
                                  <Col md="1" className="my-1">
                                    <Label>{question.marks}</Label>
                                  </Col>
                                </React.Fragment>
                                : question.questionType === "MTO" ?
                                <React.Fragment>
                                  <Col md="1" className="my-1">
                                    <Label>Q {question.sn}</Label>
                                  </Col>
                                  <Col md="10" className="my-1">
                                    <Label>{question.question}</Label>
                                    <div
                                      style={{
                                        borderRadius: "5px",
                                        padding: "5px 20px 5px 8px",
                                      }}
                                    >
                                    {
                                      question.options.map((option ,i)=>
                                        <FormGroup className="row" key={'MTO'+{i}}>
                                          <Col md="1">
                                            {++i}).
                                          </Col>
                                          <Col md="1">
                                            <Field
                                              type="checkbox"
                                              // checked={
                                              //   question.answer.length > 0 ?
                                              //     true
                                              //     : false
                                              // }
                                              name="option"
                                              value="1"
                                              className="d-inline-block mr-1"
                                            />
                                          </Col>
                                          <Col md="9">
                                            <Label>{question.option1}</Label>
                                          </Col>
                                        </FormGroup>
                                      )
                                    }
                                    </div>
                                  </Col>
                                  <Col md="1" className="my-1">
                                    <Label>{question.marks}</Label>
                                  </Col>
                                </React.Fragment>
                              : null
                            }
                          </FormGroup>
                      ))}
                    </Col>
                  </FormGroup>
                  {
                    button === "True" ?
                      <FormGroup row >
                        <Col sm="12" className="my-2">
                          <Button.Ripple
                            color="primary"
                            type="submit"
                            className="mb-1 mr-1"
                          >
                            Submit
                          </Button.Ripple>
                        </Col>
                      </FormGroup>
                    : null
                  }
                </Form>
                )}
            </Formik>
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}
export default AttendTest
