import React from 'react'
import links from '../utils/links'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const ShareNav = ({ handleToggle }) => {
  return (
    <Wrapper className='navbar-container'>
      {links.map((item) => {
        const { id, icon, path, text } = item
        return (
          <NavLink onClick={handleToggle} className='' key={id} to={path}>
            {icon}
            {text}
          </NavLink>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.div`
  a {
    display: block;
    /* justify-content: center; */
    align-items: center;
    padding: 0.7rem;
    display: flex;
    gap: 1rem;
  }
`

export default ShareNav
