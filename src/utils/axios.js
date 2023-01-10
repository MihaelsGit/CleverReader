import axios from "axios";
import {
  BASE_URL,
  UPLOAD_URL,
  REFERENCES,
  SUMMARY_BASE_URL,
} from "../constants/path";

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

export const getSummaryText = async ({ data }) => {
  let response = null;
  let path = SUMMARY_BASE_URL;

  await axios
    .post(path, data)
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log("Error while fetching summary => ", err);
      response =
        "Sorry about that, we couldn't get you the summary right now :(";
    });

  return response;
};

export const getKnowledgeGraph = async ({ pdfId }) => {
  let response;
  let path = BASE_URL + REFERENCES;

  await axios
    .get(path, { params: { id: pdfId } })
    .then((res) => {
      response = res.data;
    })
    .catch((err) => {
      console.log("Error while fetching knowledge graph => ", err);
    });

  return response;
};
