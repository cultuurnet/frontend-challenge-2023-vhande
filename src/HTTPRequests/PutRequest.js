import axios from 'axios'

const putRequest = async (input) => {
    const config = {
        headers: { 'Authorization': process.env.REACT_APP_TOKEN }
    };
    
    const bodyParameters = {
    };
    
    axios.put( 
      `https://io-test.uitdatabank.be/events/${process.env.REACT_APP_EVENT_ID}/labels/${input}`,
      bodyParameters,
      config
    ).then(console.log).catch(console.log);
 
}

export{putRequest}