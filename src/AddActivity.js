import React, { useState, useContext } from 'react'
import './style.css'
import 'styled-components'
import Gegevens from './Components-AddActivity/Gegevens'
import {Card,Container} from './MyComponents'
import Historiek from './Components-AddActivity/Historiek'
import Publicatie from './Components-AddActivity/Publicatie'
import Data from './Data'



function AddActivity() {
  const [gegevens,setGegevens] = useState({"borderBottom": "1px solid", boxShadow: "inset 0 -1px 0 0 black"})
  const [historiek,setHistoriek] = useState({})
  const [publicatie,setPublicatie] = useState({})
  const context = useContext(Data)
  const [menus,setMenus]=useState({
    Publicatie:false,
    Historiek:false,
    Gegevens:true
  })
 
  const historiekFunc = () => {
    setHistoriek({"borderBottom": "1px solid", boxShadow: "inset 0 -1px 0 0 black"});
    setGegevens({})
    setPublicatie({})
  }

  const gegevensFunc = () => {
    setGegevens({"borderBottom": "1px solid", boxShadow: "inset 0 -1px 0 0 black"});
    setHistoriek({})
    setPublicatie({})
  }

  const publicatieFunc = () => {
    setPublicatie({"borderBottom": "1px solid", boxShadow: "inset 0 -1px 0 0 black"});
    setHistoriek({})
    setGegevens({})
  }

  return (
    <Container>
    <Card>
      <h1>{context.title}</h1>
      <hr/>
      <div className="tab">
    <button 
    className="tablinks" 
    id="gegevens" 
    style={gegevens}
    onClick={()=>{setMenus({Historiek:false,Publicatie:false,Gegevens:true}); gegevensFunc();}}>Gegevens
    </button>
    <button 
    className="tablinks" 
    id="historiek" 
    style={historiek}
    onClick={()=>{setMenus({Historiek:true,Publicatie:false,Gegevens:false}); historiekFunc();}}>Historiek
    </button>
    <button 
    className="tablinks" 
    id="publicatie" 
    style={publicatie}
    onClick={()=>{setMenus({Historiek:false,Publicatie:true,Gegevens:false}); publicatieFunc();}}>Publicatie
    </button>
 
  </div>
    
    {
      menus.Gegevens ? (<Gegevens/>)  : null
    }
    {
      menus.Publicatie ? <Publicatie/> : null
    }
    {
      menus.Historiek ? <Historiek/> : null
    }
  
    
    </Card>
    </Container>
  )
}

export default AddActivity