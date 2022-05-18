import React from 'react'
import styled from 'styled-components'

import { useSelector, useDispatch } from 'react-redux'
import { toggleSidebar } from '../features/user/userSlice'
import ShareNav from './ShareNav'

const SmallSideBar = () => {
  const dispatch = useDispatch()
  //
  const handleToggle = () => {
    dispatch(toggleSidebar())
  }
  return (
    <Wrapper>
      <div className='modal-container'>
        <div className='modal'>
          <ShareNav handleToggle={handleToggle} />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @media (min-width: 992px) {
    display: none;
  }
  .modal {
    div {
      a {
        justify-content: center;

        padding: 1.3rem;
      }
    }
  }
`

export default SmallSideBar
