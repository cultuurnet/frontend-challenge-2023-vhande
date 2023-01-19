import axios from 'axios'

const getRequest = async () =>
    axios.get(`https://io-test.uitdatabank.be/events/${import.meta.env.VITE_EVENT_ID}`);

export { getRequest }