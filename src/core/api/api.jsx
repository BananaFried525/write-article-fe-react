import axios from "axios";
import { constant } from "../../shared/constant";

const baseURL = constant.baseURL || process.env.beURL;
export const Get = async (url) => {
  try {
    let result = await axios.get(`${baseURL + url}`).then((res) => res.data);
    return result;
  } catch (error) {
    return {error};
  }
};

export const Post = async (url, body, header) => {
  try {
    let result = await axios
      .post(`${baseURL + url}`, body,{headers:header})
      .then((res) => res.data);
    return result;
  } catch (error) {
    return {error};
  }
};

export const Delete = async (url,header) => {
  try {
    let result = await axios
      .delete(`${baseURL + url}`,{headers:header})
      .then((res) => res.data);
    return result;
  } catch (error) {
    return {error};
  }
}
