import { BASE_URL } from "../../default.config";

const REFRESH_TOKEN = (TOKEN) => {
  return new Promise((resolve) => {
    const API_LINK = `${BASE_URL}/auth/token/refresh`;

    fetch(API_LINK, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + TOKEN, //use authentification with token
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data.access);
      })
      .catch((e) => {
        console.log("Error in REFRESH_TOKEN Function : ", e);
      });
  });
};

export default REFRESH_TOKEN;
