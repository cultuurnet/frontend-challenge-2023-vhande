import React, {useState} from 'react'
import AddActivity from './AddActivity'
import Data from './Data'

function App() {
  const [title, setTitle] = useState("test nieuw")
  const [type, setType] = useState("Opendeur")
  const [labelList, setLabelList] = useState([])
  
  return (
    <Data.Provider value={{title,setTitle,type, setType,labelList,setLabelList}}>
    <AddActivity/>
    </Data.Provider>
  )
}

export default App