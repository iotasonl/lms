// import { history } from "../../../history";
import axios from "axios";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"
import {history} from "../../../history";

export const getData = (jsonData, wClause) => {
    return async dispatch => {
        var bodyFormData = new FormData();
        bodyFormData.set('json_data', jsonData);
        bodyFormData.set('w_clause', wClause);
        await axios({
                url: "https://lms-iotas.herokuapp.com/api/v1/getClass",
                method: "POST",
                headers: { 'x-api-key': 'iotas@12345' },
                data: bodyFormData,
            })
            .then(result => {
                // console.log("ddr", result);
                dispatch({
                    type: "GET_CLASS",
                    classes: result.data.response_data,
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
                url: "https://lms-iotas.herokuapp.com/api/v1/createClass",
                method: "POST",
                headers: { 'x-api-key': 'iotas@12345' },
                data: bodyFormData,
            })
            .then(result => {
                // console.log("ddr", result.data);
                dispatch({
                    type: "POST_CLASS",
                    classes: result.data,
                })
              if(result.data.response_code==="200")
              {
                toast.success("Data Inserted Successfully..");
              }
              else {
                toast.error(result.data.response_message)
                  // .then
                  //   history.push("/class-list")
              }
              // history.push("/class-create/0")
            })
            .catch(err => console.log("Error", err))
    }
}

export const updateData = (jsonData, wClause) => {
  console.log("abc", jsonData)
  return async dispatch => {
    var bodyFormData = new FormData();
    bodyFormData.set('json_data', jsonData);
    bodyFormData.set('w_clause',  wClause);
    await axios({
      url: "https://lms-iotas.herokuapp.com/api/v1/updateClass",
      method: "POST",
      headers: { 'x-api-key': 'iotas@12345' },
      data: bodyFormData,
    })
      .then(result => {
        // console.log("ddr", result.data);
        dispatch({
          type: "UPDATE_CLASS",
          classes: result.data,
        })
        if(result.data.response_code==="200")
        {
          toast.success("Data Updated Successfully..");
        }
        else {
          toast.error(result.data.response_message)
        }
        history.push("/class-create/0")
      })
      .catch(err => console.log("Error", err))
  }
}
