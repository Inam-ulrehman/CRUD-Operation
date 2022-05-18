import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import FormRow from '../components/FormRow'
import { toast } from 'react-toastify'
import { getRegisterUser, getLoginUser } from '../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
}
const Register = () => {
  const [values, setValues] = useState(initialState)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      return toast.error('Please fill all empty boxes')
    }
    if (isMember) {
      return dispatch(getLoginUser({ email, password }))
    }
    return dispatch(getRegisterUser({ name, email, password }))
  }
  // Handle Change

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setValues({ ...values, [name]: value })
  }

  // handle Toggle

  const toggle = () => {
    setValues({ ...values, isMember: !values.isMember })
  }
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
    // eslint-disable-next-line
  }, [user])
  return (
    <Wrapper>
      <div className='section'>
        <form onSubmit={handleSubmit} className='form'>
          <h3 className='title'>{values.isMember ? 'Login' : 'Register'}</h3>
          {/* name input */}
          {!values.isMember && (
            <FormRow
              type='text'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />
          )}

          {/* email input */}
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />
          {/* password input */}
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
          />
          <button type='submit' className='btn btn-block'>
            submit
          </button>
          <p>
            {values.isMember ? 'Are you register ?' : 'Are you a member ? '}
            <button className='toggle-btn' type='button' onClick={toggle}>
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .toggle-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-5);
    cursor: pointer;
  }
`

export default Register
