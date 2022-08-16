import axios from "axios";

const Get = async (url: string, query: any, option: any) => {
  try {
    const res = await axios.get(url, {
      ...option,
      params: query,
    })
    console.log(res);
    return res.data;
  } catch (e) {
    console.log("Error while GET :: ");
    console.log(e);    
  }
}

export default {
  Get: Get,
}