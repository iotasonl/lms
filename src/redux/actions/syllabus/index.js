import { history } from "../../../history"
import axios from "axios"

export const getData = () => {
  return async dispatch => {
    var bodyFormData = new FormData();
    bodyFormData.set('json_data', '{}');
    bodyFormData.set('w_clause', '{}');
    await axios({
      url: "https://lms-iotas.herokuapp.com/api/v1/getSyllabus",
      method: "POST",
      headers: { 'x-api-key': 'iotas@12345' },
      data: bodyFormData,
    })
      .then(result => {
        // console.log("ddr", result.data.response_data);
        dispatch({
          type: "GET_SYLLABUS",
          syllabus: result.data.response_data,
        })
      })
      .catch(err => console.log("Error", err))
  }
}

export const postData = json_data => {
  console.log("abc", json_data)
  return async dispatch => {
    var bodyFormData = new FormData();
    bodyFormData.set('json_data', json_data);
    bodyFormData.set('w_clause', '{}');
    await axios({
      url: "https://lms-iotas.herokuapp.com/api/v1/createSyllabus",
      method: "POST",
      headers: { 'x-api-key': 'iotas@12345' },
      data: bodyFormData,
    })
      .then(result => {
        // console.log("ddr", result.data);
        dispatch({
          type: "POST_ROLE",
          syllabus: result.data,
        })
        history.push("/syllabus-list")
      })
      .catch(err => console.log("Error", err))
  }
}

