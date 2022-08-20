import axios from "axios";

const get = async (url: string, query: any, option: any) => {
  try {
    const res = await axios.get(url, {
      ...option,
      params: query,
    });
    return res.data;
  } catch (e) {
    console.log(":: Error while GET :: ");
    console.log(e);
  }
}

const patch = async (url: string, body: any, option: any) => {
  try {
    const res = await axios.patch(url, {
      ...option,
      body
    });
    return res.data;
  } catch (e) {
    console.log(":: Error while PATCH :: ");
    console.log(e);
  }
}

const post = async (url: string, body: any, option: any) => {
  try {
    const res = await axios.post(url, {
      ...option,
      body,
    });
    return res.data;
  } catch (e) {
    console.log(":: Error while PATCH :: ");
    console.log(e);
  }
}

export default {
  get: get,
  patch: patch,
  post: post,
}