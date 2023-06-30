import { ONISEP_ID, ONISEP_PS } from "../../config";

const GET_TOKEN = () => {
  return new Promise((resolve) => {
    const API_TOKEN = "https://api.opendata.onisep.fr/api/1.0/login";
    // formData for post request
    const formData = new FormData();
    formData.append("email", ONISEP_ID); // my email
    formData.append("password", ONISEP_PS); // my password
    // request
    fetch(API_TOKEN, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data.token);
      });
  });
};

export default GET_TOKEN;
