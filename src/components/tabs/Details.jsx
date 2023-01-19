import React, { useState, useEffect, useContext } from 'react'
import * as S from '../../assets/styles'
import { AiFillCloseCircle } from 'react-icons/ai';
import Data from '../../context/Data'
import { deleteRequest } from '../../HTTPRequests/DeleteRequest';
import { putRequest } from '../../HTTPRequests/PutRequest';
import { getRequest } from '../../HTTPRequests/GetRequest';

function Details() {
  const [fromList, setFromList] = useState("")
  const [input, setInput] = useState("")
  const [fetchedLabel, setFetchedLabel] = useState([])
  const [error, setError] = useState(false);
  const [labelError, setLabelError] = useState(false)
  const context = useContext(Data)


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
  // close search dropdown when it's empty
  const changeAction = (e) => {
    setInput(e.target.value)
    if (e.target.value !== "") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  const deleteReq = (e) => {
    if (e.target.tagName === 'path') {
      deleteRequest(e.target.parentElement.id)
      context.setLabelList(context.labelList.filter(item => item !== e.target.parentElement.id));
    } else {
      deleteRequest(e.target.id)
      context.setLabelList(context.labelList.filter(item => item !== e.target.id));
    }
  }


  // Search Labels
  useEffect(() => {
    if (input.trim() !== "") {
      fetch(`https://io-test.uitdatabank.be/labels/?limit=6&query=${input}&start=0&suggestion=true`)
        .then(res => res.json())
        .then(data => {
          setFetchedLabel(data.member.filter(item => item.visibility === 'visible' && item.privacy === 'public'))
        })
    }
  }, [input])

  // GET labels
  useEffect(() => {
    getRequest()
      .then(res => context.setLabelList(res.data.labels))
  }, [])


  useEffect(() => {
    if (fromList !== "") {
      putRequest(fromList)
      setFromList("")
    }
  }, [fromList]);

  // PUT request with enter
  const createNewLabel = (e) => {
    if (e.key === 'Enter' && input.match(/^(?=.{2,255}$)(?=.*\S.*\S.*)[^;]*$/) && !context.labelList.includes(input)) {
      context.setLabelList([...context.labelList, input]);
      putRequest(input)
      setIsOpen(false)
      setError(false)
      setLabelError(false)
      setInput("")
    }
    else if (e.key === 'Enter' && !input.match(/^(?=.{2,255}$)(?=.*\S.*\S.*)[^;]*$/)) {
      setError(true);
    }
    else if (e.key === "Backspace") {
      setError(false)
      setLabelError(false)
    }
    else if (e.key === 'Enter' && context.labelList.includes(input)) {
      setIsOpen(false)
      setLabelError(true)
      setInput("")
    }
    else {
      return null
    }
  }

  // PUT request with click
  const onLabelClicked = (e) => {
    if (!context.labelList.includes(e.target.title)) {
      context.setLabelList([...context.labelList, e.target.title]);
      setFromList(e.target.title)
      setIsOpen(false)
      setLabelError(false)
      setInput("");

    }
    else if (context.labelList.includes(e.target.title)) {
      setIsOpen(false);
      setLabelError(true);
      setInput("");
    }
    else {
      return null
    }
  };

  return (
    <>
      <S.Form onSubmit={e => { e.preventDefault(); }}>
        <S.InputGroup>
          <S.InputLabel htmlFor="titel">Titel</S.InputLabel>
          <S.Input onChange={(e) => { context.setTitle(e.target.value) }} defaultValue={context.title} />
        </S.InputGroup>
        <S.InputGroup>
          <S.InputLabel htmlFor="type">Type</S.InputLabel>
          <S.Input defaultValue={context.type} onChange={(e) => { context.setType(e.target.value) }} />
        </S.InputGroup>
        <S.InputLabel htmlFor="labels">Labels</S.InputLabel>
        <S.DropdownWrapper>
          <S.InputText>Met een label voeg je korte, specifieke trofwoorden toe.</S.InputText>
          {error ? 
          <S.ErrorMessage>
            The label name should be longer than 1 character but shorter than 255 characters. The label name should not contain semicolons.
          </S.ErrorMessage> : ""}
          {labelError ? 
          <S.LabelErrorMessage>
            Label is already added.
          </S.LabelErrorMessage> : ""}
          <S.Input onChange={changeAction} onKeyDown={createNewLabel} id="labels" type="text" value={input} name="labels" />
          <S.DropDownContainer>
            {isOpen && (
              <S.DropDownList>
                {fetchedLabel != [] ?
                  fetchedLabel.map(item =>
                    <S.ListItem className="listItem" onClick={onLabelClicked} title={item.name} key={item.uuid}>
                      {item.name}
                    </S.ListItem>)
                  : ""}
              </S.DropDownList>
            )}
          </S.DropDownContainer>
        </S.DropdownWrapper>
        <S.LabelWrapper>
          {context.labelList != [] ? context.labelList.map(item =>
            <S.Label key={item} >{item}
              <AiFillCloseCircle className="icon" size="25px" id={item} onClick={(e) => deleteReq(e)} />
            </S.Label>) : ""}
        </S.LabelWrapper>
      </S.Form>
    </>
  )
}

export default Details