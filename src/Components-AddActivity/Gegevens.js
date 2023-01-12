import React, { useState, useRef, useEffect, useContext } from 'react'
import { DropDownContainer, DropDownList, ListItem, Form, InputGroup, Input } from '../MyComponents'
import { AiFillCloseCircle } from 'react-icons/ai';
import Data from '../Data'
import { deleteRequest } from '../HTTPRequests/DeleteRequest';
import { putRequest } from '../HTTPRequests/PutRequest';

function Gegevens() {
  const [fromList, setFromList] = useState("")
  const [input, setInput] = useState("")
  const [fetchedLabel, setfetchedLabel] = useState([])
  const inputHook = useRef(null)
  const context = useContext(Data)
  const [error,setError] = useState(false);


  // DROPDOWN
  const [isOpen, setIsOpen] = useState(false);
  // close search dropdown when you click outside
  const specifiedElement = document.getElementById('labels')
  document.addEventListener('click', event => {
    if (specifiedElement !== null) {
      const isClickInside = specifiedElement.contains(event.target)
      if (!isClickInside) {
        setIsOpen(false);
      }
    }
  })
  // close search when it's empty
  const changeAction = (e) => {
    setInput(e.target.value)
    if (inputHook.current.value !== "") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  const deleteReq = (e)=>{
    if(e.target.tagName ==='path'){
      deleteRequest(e.target.parentElement.id)
      context.setLabelList(context.labelList.filter(item => item !== e.target.parentElement.id));
    }else{
      deleteRequest(e.target.id)
      context.setLabelList(context.labelList.filter(item => item !== e.target.id));
    }
  }


  //GET REQUEST
  useEffect(() => {
    if (input.trim() !== "") {
      fetch(`https://io-test.uitdatabank.be/labels/?limit=6&query=${input}&start=0&suggestion=true`)
        .then(res => res.json())
        .then(data => {
          setfetchedLabel(data.member.filter(item => item.visibility === 'visible' && item.privacy === 'public'))
        })
    }
  }, [input])


  useEffect(() => {
    if (fromList !== "") {
      putRequest(fromList)
      setFromList("")
    }
  }, [fromList]);

  // PUT request with enter
  const createNewLabel = (e) => {
    if (e.key === 'Enter' && input.match(/^(?=.{2,255}$)(?=.*\S.*\S.*)[^;]*$/)) {
      context.setLabelList([...context.labelList, input]);
      putRequest(input);
      setIsOpen(false);
      setError(false);
      inputHook.current.value = ""
    }
    else if (e.key === 'Enter' && !input.match(/^(?=.{2,255}$)(?=.*\S.*\S.*)[^;]*$/)) {
      setError(true);
    }
    else if (e.key === "Backspace") {
      setError(false)
    }
  }


// Create label list
const onLabelClicked = (e) => {
  context.setLabelList([...context.labelList, e.target.title]);
  setFromList(e.target.title)
  setIsOpen(false);
  inputHook.current.value = ""
};

return (
  <>
    <Form onSubmit={e => { e.preventDefault(); }}>
      <InputGroup>
        <label htmlFor="titel">Titel</label>
        <Input onChange={(e) => { context.setTitle(e.target.value) }} defaultValue={context.title} />
      </InputGroup>
      <InputGroup>
        <label htmlFor="type">Type</label>
        <Input defaultValue={context.type}  onChange={(e) => { context.setType(e.target.value) }} />
      </InputGroup>
      <label>Labels</label>
      <div className="dropdown-wrapper">
        <p className="input-text">Met een label voeg je korte, specifieke trofwoorden toe.</p>
        {error ? <p style={{color:"var(--red)"}}>The label name should be longer than 1 character but shorter than 255 characters. The label name should not contain semicolons.</p> : ""}
        <Input onChange={changeAction} onKeyDown={createNewLabel} ref={inputHook} id="labels" type="text" name="labels" />
        <DropDownContainer>
          {isOpen && (
            <DropDownList>
              {fetchedLabel !== [] ?
                fetchedLabel.map(item =>
                  <ListItem className="listItem" onClick={onLabelClicked} title={item.name} key={item.uuid}>
                    {item.name}
                  </ListItem>)
                : ""}
            </DropDownList>
          )}
        </DropDownContainer>
      </div>
      <div className="labels" style={{ display: "flex" }}>
        {context.labelList !== [] ? context.labelList.map(item =>
          <div className="label" key={item} >{item}
            <AiFillCloseCircle className="icon" size="25px" id={item} onClick={(e)=>deleteReq(e)} />
          </div>) : ""}
      </div>
    </Form>
  </>
)
}

export default Gegevens