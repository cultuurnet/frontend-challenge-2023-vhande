import styled from "styled-components";


const Card = styled("div")`
background-color:var(--background);
padding: 2rem;
`;

const Container = styled("div")`
width: 100%;
display: block;
position: absolute;
`;


const InputGroup = styled("div")`
display:flex;
flex-direction: column;
align-items:flex-start;
justify-content:flex-start;
margin:2px;
`;

const Input = styled("input")`
padding: 14px 20px;
margin: 8px 0;
border: none;
border-radius: 4px;  
width:40rem; 
@media all and (min-width: 376px) and (max-width: 768px) {
    width: 15rem !important;
}
@media all and (max-width: 375px) {
     width: 15rem !important;
}
`;

const Form = styled("form")`
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
&:hover {
    background-color: var(--red);
    color: white;
}
`;

const ErrorMessage = styled("p")`
color:var(--red)
`;

const LabelErrorMessage = styled("p")`
color:var(--red)
`;

const TabLinkActive = styled("button")`
border-bottom: "1px solid";
box-shadow: inset 0 -1px 0 0 black;
background-color: inherit;
border:none; 
outline: none;
cursor: pointer;
padding: 14px 16px;
`

const TabLink = styled("button")`
background-color: inherit;
border:none; 
outline: none;
cursor: pointer;
padding: 14px 16px;
`

const InputLabel = styled("label")`
margin-right: 1rem;
`;

const Label = styled("div")`
display: flex;
align-items: center;
margin: 0.15rem 0.25rem;
border: 1px solid;
border-radius: 25px;
padding: 0.25rem 0.25rem;
background-color: white;
font-weight: bold;
padding-left: 0.75rem;
padding-right: 0.75rem;
`;

const InputText = styled("p")`
color: var(--gray);
font-size: 0.85rem;
display: block;
`;

const TabBody = styled("div")`
margin: 1rem;
`;

const DropdownWrapper = styled("div")`
display: flex;
flex-direction: column;
`;

const LabelWrapper = styled("div")`
display: flex;
flex-direction: row;
flex-wrap: wrap;
display: inline-flex;
margin-top: 1rem;
`;
export { Card, Container, DropDownContainer, DropDownList, ListItem, Form, InputGroup, Input, ErrorMessage, TabLink, TabLinkActive, LabelErrorMessage, InputLabel, Label, InputText, TabBody, DropdownWrapper, LabelWrapper }