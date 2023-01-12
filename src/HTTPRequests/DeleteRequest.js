import axios from 'axios'

const deleteRequest = async (name) => {
    const headers = {
        'Authorization': process.env.REACT_APP_TOKEN
      } 
      axios.delete(`https://io-test.uitdatabank.be/events/${process.env.REACT_APP_EVENT_ID}/labels/${name}`,{headers})
      .then(console.log).catch(console.log);
    }

export {deleteRequest}