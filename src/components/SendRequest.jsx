export const sendRequest = async (
  method,
  root_url,
  url_part = "",
  body = false
) => {
  const url = `${root_url}${url_part}`;
  const options = {
    method,
  };
  if (method !== "GET" && method !== "DELETE") {
    options.body = JSON.stringify(body);
    options.headers = { "Content-Type": "application/json;charset=utf-8" };
  }
  const response = await fetch(url, options);

  let result;
  switch (response.status) {
    case 200:
    case 201:
      result = await response.json();
      break;
    default:
      console.log(`The backend responded with status ${response.status}.`);
      console.log(`URL: ${url}`);
      console.log(`options: ${options}`);
      break;
  }
  return result;
};
