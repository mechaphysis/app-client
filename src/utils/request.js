import axios from "axios";

/**
 *
 * Currently we are using proxy in development package.json
 * to avoid CORS issue. In production, express-js node should have
 * properly CORS policy implemented and here we can actually define
 * the baseUrl for axios and else.
 */

const get = resource => {
  return axios
    .get(resource)
    .then(response => response.data)
    .catch(error => {
      console.log(
        "Get Request Failed: ",
        error.response.status,
        "response: ",
        error.response.data
      );
      throw error;
    });
};

const post = (resource, payload) => {
  return axios
    .post(resource, payload)
    .then(response => response.data)
    .catch(error => {
      console.log(
        "Post Request Failed: ",
        error.response.status,
        "response: ",
        error.response.data
      );

      throw error;
    });
};

const del = resource => {
  return axios
    .delete(resource)
    .then(response => response.data)
    .catch(error => {
      console.log(
        "Delete Request Failed: ",
        error.response.status,
        "response: ",
        error.response.data
      );
      throw error;
    });
};

const REQUEST = {
  get,
  post,
  del
};

export default REQUEST;
