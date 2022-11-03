import axios from "axios";
import { BASE_URL, UPLOAD_URL } from "./path";

export const uploadFile = async ({ data }) => {
  let response = null;
  let path = BASE_URL + UPLOAD_URL;
  await axios
    .post(path, { data: data })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log("Error while uploading!");
    });

  return response;
};
