import axios from "axios";
import { BASE_URL, UPLOAD_URL } from "../constants/path";

export const uploadFile = async ({ data }) => {
  let response = null;
  let path = BASE_URL + UPLOAD_URL;

  await axios
    .post(path, data)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log("Error while uploading => ", err);
    });

  return response;
};

export const getPdfFile = async (id) => {
  let response = null;
  let path = BASE_URL + id;

  console.log("PATH => ", path);

  await axios
    .get(path)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log("Error while uploading => ", err);
    });

  return response;
};
