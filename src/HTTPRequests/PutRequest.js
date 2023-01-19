import axios from 'axios'

const putRequest = async (input) => {
  const config = {
    headers: { 'Authorization': import.meta.env.VITE_TOKEN }
  };

  const bodyParameters = {
  };

  axios.put(
    `https://io-test.uitdatabank.be/events/${import.meta.env.VITE_EVENT_ID}/labels/${input}`,
    bodyParameters,
    config
  ).then(console.log).catch(console.log);

}

export { putRequest }