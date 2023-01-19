import React, { useState, useContext } from 'react'
import 'styled-components'
import '../assets/global.css'
import * as S from '../assets/styles'
import Details from './tabs/Details'
import History from './tabs/History'
import Publication from './tabs/Publication'
import Data from '../context/Data'

function Card() {
  const context = useContext(Data)
  const [menus, setMenus] = useState({
    Publication: false,
    History: false,
    Details: true
  })
  const [active, setActive] = useState("Details")

  return (
    <S.Container>
      <S.Card>
        <h1>{context.title}</h1>
        <hr />
          {active === "Details" ?
            <S.TabLinkActive>
              Gegevens
            </S.TabLinkActive> :
            <S.TabLink
              id="details"
              onClick={() => { setMenus({ History: false, Publication: false, Details: true }); setActive("Details"); }}>
              Gegevens
            </S.TabLink>}
          {active === "History" ?
            <S.TabLinkActive>
              Historiek
            </S.TabLinkActive> :
            <S.TabLink
              id="history"
              onClick={() => { setMenus({ History: true, Publication: false, Details: false }); setActive("History"); }}>Historiek
            </S.TabLink>}
          {active === "Publication" ?
            <S.TabLinkActive>
              Publicatie
            </S.TabLinkActive> :
            <S.TabLink
              id="publication"
              onClick={() => { setMenus({ History: false, Publication: true, Details: false }); setActive("Publication"); }}>Publicatie
            </S.TabLink>}
        {
          menus.Details ? <Details /> : null
        }
        {
          menus.Publication ? <Publication /> : null
        }
        {
          menus.History ? <History /> : null
        }
      </S.Card>
    </S.Container>
  )
}

export default Card