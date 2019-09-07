import React, { useContext, useState } from 'react'
import { Input, Header, Icon, Button, Form, Card } from 'semantic-ui-react'
import { UserContext } from '../../App'
import axios from 'axios'

function Daftar(props) {
  const context = useContext(UserContext)
  const [input, setInput] = useState({
    nama: '',
    username: '',
    password: '',
    konfirmasi_password: '',
  })

  function changeValue(value, name) {
    setInput({ ...input, [name]: value })
  }

  function register() {
    const { konfirmasi_password, ...rest } = input
    axios
      .post('https://marketplace-express.herokuapp.com/pengguna', rest)
      .then(response => props.history.push('/masuk'))
  }

  if (context.isLoggedIn()) {
    props.history.push('/')
  }

  return (
    <div style={styles.container}>
      <Card>
        <Card.Content>
          <Card.Header>
            <Header icon textAlign="center">
              <Icon name="user circle" />
              <Header.Content>Daftar</Header.Content>
            </Header>
          </Card.Header>

          <Form>
            <Form.Field>
              <Input
                fluid
                placeholder="Nama"
                onChange={event => changeValue(event.target.value, 'nama')}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                placeholder="Username"
                onChange={event => changeValue(event.target.value, 'username')}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                placeholder="Password"
                type="password"
                onChange={event => changeValue(event.target.value, 'password')}
              />
            </Form.Field>

            <Form.Field>
              <Input
                fluid
                placeholder="Konfirmasi Password"
                type="password"
                onChange={event =>
                  changeValue(event.target.value, 'konfirmasi_password')
                }
              />
            </Form.Field>

            <Form.Field>
              <Button positive fluid content="Daftar" onClick={register} />
            </Form.Field>
          </Form>
        </Card.Content>
      </Card>
    </div>
  )
}

const styles = {
  container: {
    height: '100vh',
    marginTop: -60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}

export default Daftar
