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

function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export {
  makeApiRequest,
  debounce
};
