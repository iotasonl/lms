import axios from "axios"

export const getData = routeParams => {
    return async dispatch => {
        var bodyFormData = new FormData();
        bodyFormData.set('json_data', '{}');
        bodyFormData.set('w_clause', '{}');
        await axios ({
            url: "https://lms-iotas.herokuapp.com/api/v1/getRole",
            method: "POST",
            headers: {'x-api-key':'iotas@12345'},
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

