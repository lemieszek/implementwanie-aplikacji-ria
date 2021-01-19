export function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...customConfig,
    body: customConfig.body && JSON.stringify(customConfig.body),
  };
  return window.fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config).then((response) => response.json());
}
