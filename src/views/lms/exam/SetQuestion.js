import React from "react";
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
import {
  Card,
  CardBody,
  FormGroup,
  Col,
  Label,
  CardFooter,
} from "reactstrap"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import {
  RadioInput,
} from "../../../components/hrmsComponent/form/input";

let datas ,title;
let i = 0 ;
const formSchema = Yup.object().shape({
    questionType: Yup.object()
        .shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
        })
        .nullable()
        .required("This Field is required!"),
    option1: Yup.string().required("This Field is required!"),
    option2: Yup.string().required("This Field is required!"),
    option3: Yup.string().required("This Field is required!"),
    option4: Yup.string().required("This Field is required!"),
    option5: Yup.string().required("This Field is required!"),
    question: Yup.string().required("This Field is required!"),
    marks: Yup.string()
    .required("This Field Is Required")
    .min("1", "Enter a valid Marks")
    .max("3", "Enter a valid Marks"),
})

class SetQuestion extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.setQuestion = this.setQuestion.bind(this);
      this.addMore = this.addMore.bind(this);
      this.state={
        show:'',
        add:'',
        maxAdd:true,
        questionType:'',
      }
    }
    addMore = () =>{
      i++;
      if(i===3)
      {
        this.setState({
          maxAdd:'',
        })
      }
      this.setState({
        add:i,
      })
    }
    setQuestion = (e) => {
       console.log(e);
      };
    handleSubmit = (values, { setSubmitting }) => {
      const payload = {
        ...values,
        answer: values.answer.value,
      };
      if(this.props.match.params.TestId !== "0")
      {
        console.log("Updating Board..");
      }
      else {
        console.log("Inserting Board..");
      }
    setTimeout(() => {
        console.log(JSON.stringify(payload, null, 2));
        setSubmitting(false);
      }, 1000);
    };
    render() {
      if(this.props.match.params.TestId === "0")
      {
        datas = {
                id: "",
                questionType: [{
                    "value": "",
                    "label": ""
                  }],
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
          questionType: [{
              "value": "Science",
              "label": "Science"
            }],
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
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  questionType: datas.questionType,
                  question: datas.question,
                  marks:datas.marks,
                  answer:datas.answer,
                  option1:datas.option1,
                  option2:datas.option2,
                  option3:datas.option3,
                  option4:datas.option4,
                  option5:datas.option5,
                }}
                validationSchema={formSchema}
                onSubmit={this.handleSubmit}
              >
                {({
                    handleChange,
                    handleBlur,
                  }) => (
                  <Form>
                    <FormGroup row >
                      <Col className="my-2 col-md-9 col-sm-12">
                      </Col>
                      <Col className="my-2 col-md-3 col-sm-12 row">
                      <FormGroup className="col-md-1 col-sm-12">
                            <div>
                              <RadioInput
                                  defaultChecked={true}
                                  name="answer"
                                  value="1"
                                  className="d-inline-block mr-1"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                              />
                            </div>
                          </FormGroup>
                          <FormGroup className="col-md-11 col-sm-12">
                            <Label for="option1">Option 1</Label>
                          </FormGroup>
                      </Col>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </CardBody>
            <CardFooter className="row">
              <Col md="2">
                <Label>Note:</Label>
              </Col>
              <Col md="10" style={{float:'right'}}>
                <Label>* Maximum 5 Option Can Be Add!</Label><br> </br>
                <Label ml="3">* Select Radio Button In For Correct Answer!</Label>
              </Col>
            </CardFooter>
          </Card>
        </React.Fragment>
    )
    }
  }
  export default SetQuestion
