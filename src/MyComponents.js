import styled from "styled-components";

const Card = styled.div`
  background-color:var(--background);
  padding: 2rem;
`;

const Container = styled.div`
    width: 100%;
    display: block;
    position: absolute;
`;


const InputGroup = styled.div`
display:flex;
flex-direction: column;
align-items:flex-start;
justify-content:flex-start;
margin:2px;
`;

const Input = styled.input`

  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;  
  width:40rem;


  
`;

const Form = styled.form`
  margin: 1rem 1rem;
 
`;
const DropDownContainer = styled("div")`
  position:relative;
  width:40rem;
  
`;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  list-style: none;
  cursor: pointer;
`;

const ListItem = styled("li")`
  list-style: none;

  padding:0.25rem;


`;

export {Card,Container, DropDownContainer, DropDownList,ListItem,Form,InputGroup,Input}