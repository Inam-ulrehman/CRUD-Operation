import React from 'react'
import styled from 'styled-components'
import ShareNav from './ShareNav'

const BigSideBar = () => {
  return (
    <Wrapper>
      <ShareNav />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: var(--white);
  height: 100vh;
  @media (max-width: 992px) {
    display: none;
  }
  div {
    padding: 1rem;
    padding-top: 5rem;

    a {
      transition: var(--transition);
    }

    a:hover {
      transition: var(--transition);
      padding-left: 1.5rem;
    }
  }
`
export default BigSideBar
