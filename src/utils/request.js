import axios from "axios";

/**
 *
 * Currently we are using proxy in development package.json
 * to avoid CORS issue. In production, express-js node should have
 * properly CORS policy implemented and here we can actually define
 * the baseUrl for axios and else.
 */

const get = async resource => {
  try {
    let response = await axios.get(`${resource}`);
    return response.data;
  } catch (error) {
    console.log("Get Request Failed: ", error);
  }
};

const post = async (resource, data) => {
  try {
    let response = await axios.post(`${resource}`, data);
    return response.data;
  } catch (error) {
    console.log("Post Request Failed: ", error);
  }
};

const REQUEST = {
  get,
  post
  //delete
};

export default REQUEST;
