import React, { useState, useContext } from 'react'
import AlertContext from '../../context/alert/alertContext'

const Register = () => {

  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const onChange = e => setUser({...user, [e.target.name]: e.target.value})

  const { name, email, password, password2 } = user

  const onSubmit = e => {
    e.preventDefault()
    if(name === '' || email === '' || password === '') {
      setAlert('All fields are required', 'is-danger')
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'is-danger')
    } else {
      console.log(user)
    }
  }

  return (
    <section className="hero is-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-5-tablet is-6-desktop is-5-widescreen">
              <h1 className="title">Register</h1>
              <form className="box" onSubmit={onSubmit}>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left">
                    <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
                    <input className="input" type="text" name="name" placeholder="Username" onChange={onChange} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                    <input className="input" type="email" name="email" placeholder="Email Address" onChange={onChange} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <span className="icon is-small is-left"><i className="fas fa-lock"></i></span>
                    <input className="input" type="password" name="password" placeholder="********" onChange={onChange} />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirm Password</label>
                  <div className="control has-icons-left">
                    <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                    <input className="input" type="password" name="password2" placeholder="********" onChange={onChange} />
                  </div>
                </div>
                <div className="field">
                  <label className="checkbox">
                    <input type="checkbox"/>
                    Rememeber Me
                  </label>
                </div>
                <div className="field">
                  <button type="submit" className="button is-success">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
