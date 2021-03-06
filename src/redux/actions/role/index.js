// import { history } from "../../../history"
import axios from "axios"
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/extensions/toastr.scss"

export const getData = () => {
    return async dispatch => {
        var bodyFormData = new FormData();
        bodyFormData.set('json_data', '{}');
        bodyFormData.set('w_clause', '{}');
        await axios({
            url: "https://lms-iotas.herokuapp.com/api/v1/getRole",
            method: "POST",
            headers: { 'x-api-key': 'iotas@12345' },
            data: bodyFormData,
        })
            .then(result => {
                // console.log("ddr", result.data.response_data);
                dispatch({
                    type: "GET_USERS",
                    roles: result.data.response_data,
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
            url: "https://lms-iotas.herokuapp.com/api/v1/createRole",
            method: "POST",
            headers: { 'x-api-key': 'iotas@12345' },
            data: bodyFormData,
        })
            .then(result => {
                // console.log("ddr", result.data);
                dispatch({
                    type: "POST_ROLE",
                    roles: result.data,
                })
              if(result.data.response_code==="200")
              {
                toast.success("Data Inserted Successfully..")
                //   history.push("/class-list")
              }
              else {
                toast.error(result.data.response_message)
                //   history.push("/class-list")
              }
            })
            .catch(err => console.log("Error", err))
    }
}

