import { React, useState } from 'react'
import styled from 'styled-components'
import { toggleSidebar, logoutUser } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'

// AiOutlineLogout

const initialState = {
  toggleLogout: false,
}

const NavBar = () => {
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const toggle = () => {
    console.log('toggle')
    dispatch(toggleSidebar())
  }

  // HandleMouseOver
  const handleMouseOver = () => {
    setValues({ ...values, toggleLogout: !values.toggleLogout })
  }
  // Handle LogeOut
  const handleLogOut = () => {
    dispatch(logoutUser())
    navigate('/register')
    toast.success('Successfully Logout...')
  }
  return (
    <Wrapper className='container'>
      <div className='button'>
        <button onClick={toggle} type='button' className='btn'>
          <AiOutlineMenu />
        </button>
      </div>
      <div className='logo'>
        <h3>Dashboard</h3>
      </div>
      <div className='user'>
        <div className='user-info'>
          <p>Hello </p>{' '}
          <button type='button' onClick={handleMouseOver}>
            <CgProfile />
            {user.name}
            <AiOutlineLogout />
          </button>
        </div>
        <div className='logout'>
          {values.toggleLogout && (
            <button type='button' onClick={handleLogOut}>
              logout
            </button>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  display: flex;
  text-align: center;
  justify-content: space-between;
  height: 5rem;
  padding: 1rem;
  background-color: var(--white);
  .logo {
    h3 {
      padding: 0;
      margin: 0;
    }
  }
  .user-info {
    display: flex;
    p {
      margin: 0;
    }
    button {
      border: transparent;
      background-color: var(--primary-5);
      border-radius: var(--radius);
      margin-left: 4px;
      text-transform: capitalize;
      cursor: pointer;
      color: var(--white);
      gap: 1rem;
      display: flex;
      align-items: center;
    }
  }
  .logout {
    display: grid;

    button {
      background: var(--primary-5);
      color: white;
      border: 2px solid var(--white);
      padding: 0.3rem;
      transition: var(--transition);
      cursor: pointer;
    }
  }
`

export default NavBar
