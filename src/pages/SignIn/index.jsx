import React, { useState } from 'react'
import { Input, Header, Icon, Button } from 'semantic-ui-react'
import { UserContext } from '../../App'
import axios from 'axios'
import { reject } from 'q'

function SignIn(props) {

  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const url = 'https://marketplace-express.herokuapp.com/pengguna/login'

  function login(value) {
    axios.post(url, { input })
      .then(res => {
        if (res.data) {
          value.login(res.data.token, res.data.user, () => {
            props.history.push('/')
          })
        }
        else {
          resetValue()
          // eslint-disable-next-line no-alert
          alert('Username atau password anda salah')
        }
      }).catch(error => reject(error))
  }

  function resetValue() {
    input.password = ''
    setInput(input.password = input)
  }

  function changeValue(value, name) {
    input[name] = value
    setInput({ input })
  }

  function redirectIfAuthenticated(isLoggin) {
    if (isLoggin) props.history.push('/')
  }

  return (
    <UserContext.Consumer>
      {
        value => {
          redirectIfAuthenticated(value.isLoggin)
          return (
            <div>
              <Header as='h1' icon textAlign='center' style={styles.iconPosition}>
                <Icon name='user circle' />
                <Header.Content>Log In</Header.Content>
              </Header>
              <div style={styles.centered}>
                <div style={styles.box}>
                  <Input fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                    onChange={event => changeValue(event.target.value, 'username')}
                  />
                  <Input fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    onChange={event => changeValue(event.target.value, 'password')}
                  />
                  <Button positive
                    onClick={() => login(value)}
                  >Daftar</Button>
                  <p style={styles.textLink}>Kembali Ke Toko ?</p>
                </div>
              </div>
            </div>
          )
        }
      }
    </UserContext.Consumer>
  )
}

export default SignIn

const styles = {
  centered: {
    position: 'absolute',
    left: '50%',
    top: '45%',
    transform: 'translate(-50%,-45%)'
  },
  box: {
    width: '500px',
    height: '300px',
    border: '1px solid #ccc',
    boxShadow: '2px 2px 5px 3px #ccc',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  iconPosition: {
    marginTop: '90px'
  },
  textLink: {
    textAlign: 'right',
    color: '#547cc7'
  }
}