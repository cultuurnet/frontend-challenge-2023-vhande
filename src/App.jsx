import React, { useState } from 'react'
import Card from './components/Card'
import Data from './context/Data'

function App() {
  const [title, setTitle] = useState("test nieuw")
  const [type, setType] = useState("Opendeur")
  const [labelList, setLabelList] = useState([])

  return (
    <Data.Provider value={{ title, setTitle, type, setType, labelList, setLabelList }}>
      <Card />
    </Data.Provider>
  )
}

export default App