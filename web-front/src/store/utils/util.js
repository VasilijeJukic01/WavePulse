import axios from "axios";

// Config
axios.defaults.baseURL = process.env.VUE_APP_API_GATEWAY_URL

function makeApiRequest(url, data, method) {
  return new Promise((resolve, reject) => {
    axios({ url, data, method })
      .then(resp => resolve(resp))
      .catch(err => reject(err));
  });
}

export { makeApiRequest };
