import React from 'react'
import { Outlet } from 'react-router-dom'
import BigSideBar from '../../components/BigSideBar'
import NavBar from '../../components/NavBar'
import SmallSideBar from '../../components/SmallSideBar'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
const SharedLayout = () => {
  const { isSideBarOpen } = useSelector((state) => state.user)
  return (
    <Wrapper>
      <div>{isSideBarOpen && <SmallSideBar />}</div>

      <div className={!isSideBarOpen ? 'bigScreen' : 'bigScreen-hide'}>
        {!isSideBarOpen && (
          <div className='bigSidebar'>
            <BigSideBar />
          </div>
        )}

        <div className='nav-outlet'>
          <div>
            <NavBar />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  background-color: var(--grey-2);
  height: 100vh;
  @media (min-width: 992px) {
    .bigScreen {
      display: grid;
      grid-template-columns: 240px auto;
      .bigScreen-hide {
        display: block;
      }
    }
  }
`
export default SharedLayout
