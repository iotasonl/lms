import { history } from "../../../history";
import axios from "axios";

export const postData = (data) => {
  let api;
  let baseEndPoint = "https://lms-iotas.herokuapp.com/api/v1/";
  let jsonData;
  switch (data.method) {
    case "board":
      if (data.type === "i") {
        api = baseEndPoint + "createBoard";
        jsonData = data.json_data;
      }
      break;
    case "role":
      // code block
      break;
    default:
    // code block
  }

  console.log("abc", jsonData);
  return async (dispatch) => {
    const bodyFormData = new FormData();
    bodyFormData.set("json_data", jsonData);
    bodyFormData.set("w_clause", "{}");
    await axios({
      url: api,
      method: "POST",
      headers: { "x-api-key": "iotas@12345" },
      data: bodyFormData,
    })
      .then((result) => {
        console.log("ddr", result.data);
        dispatch({
          type: "POST_ROLE",
          roles: result.data,
        });
        history.push("/role/list");
      })
      .catch((err) => console.log("Error", err));
  };
};
