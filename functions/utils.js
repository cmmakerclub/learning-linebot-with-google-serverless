const fetch = require("node-fetch");

const get = (url) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      timeout: 5 * 1000,
    },
  };
  return fetch(url, options).then(response => response.json());
};

const post = (url, body) => {
  console.log("http requesting.. ", url);
  const options = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      timeout: 5 * 1000,
    },
  };
  return fetch(url, options).then(response => response.text());
};

module.exports = {
  get,
  post,
};
