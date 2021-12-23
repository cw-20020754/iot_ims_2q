import axios from "axios";

const apiController = axios.create({
  baseUrl: "http://localhost:8888/",
  timeout: 5000,
});

apiController.interceptors.request.use(
  function (config) {
    console.log("config : ", config);
    config.headers["Content-Type"] = "application/json; charset=utf-8";
    config.headers["Authorization"] = "";
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

apiController.interceptors.response.use(
  function (response) {
    console.log(response);

    return response.data.data;
  },
  function (error) {
    console.log("error >> ", error);
    // errorController(error);
  }
);

export default apiController;
