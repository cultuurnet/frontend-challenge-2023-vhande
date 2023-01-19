import axios from 'axios'

const deleteRequest = async (name) => {
  const headers = {
    'Authorization': import.meta.env.VITE_TOKEN
  }
  axios.delete(`https://io-test.uitdatabank.be/events/${import.meta.env.VITE_EVENT_ID}/labels/${name}`, { headers })
    .then(console.log).catch(console.log);
}

export { deleteRequest }