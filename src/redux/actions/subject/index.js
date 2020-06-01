import { history } from "../../../history"
import axios from "axios"

export const getSubject = routeParams => {
    return async dispatch => {
        var bodyFormData = new FormData();
        bodyFormData.set('json_data', '{}');
        bodyFormData.set('w_clause', '{}');
        await axios({
            url: "https://lms-iotas.herokuapp.com/api/v1/getSubject",
            method: "POST",
            headers: { 'x-api-key': 'iotas@12345' },
            data: bodyFormData,
        })
            .then(result => {
                // console.log("ddr", result.data.response_data);
                dispatch({
                    type: "GET_SUBJECT",
                    roles: result.data.response_data,
                })
            })
            .catch(err => console.log("Error", err))
    }
}

export const postSubject = json_data => {
    // console.log("abc", json_data)
    return async dispatch => {
        var bodyFormData = new FormData();
        bodyFormData.set('json_data', json_data);
        bodyFormData.set('w_clause', '{}');
        await axios({
            url: "https://lms-iotas.herokuapp.com/api/v1/createSubject",
            method: "POST",
            headers: { 'x-api-key': 'iotas@12345' },
            data: bodyFormData,
        })
            .then(result => {
                // console.log("ddr", result.data);
                dispatch({
                    type: "POST_SUBJECT",
                    roles: result.data,
                })
                history.push("/subject/list")
            })
            .catch(err => console.log("Error", err))
    }
}

