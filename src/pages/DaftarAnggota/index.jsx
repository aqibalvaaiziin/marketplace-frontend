import React, { useState, useContext } from 'react'
import { Container, Header, Icon, Card, Form } from 'semantic-ui-react'
import { UserContext, HOSTNAME } from '../../App'
import axios from 'axios'

function DaftarAnggota(props) {
  const context = useContext(UserContext)
  const [selectedFile, setSelectedFile] = useState(null)

  function daftarAnggota() {
    if (context.getPengguna()) {
      axios
        .put(
          `${HOSTNAME}/pengguna/anggota/daftar`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${context.token}`,
            },
          },
        )
        .then(res => {
          localStorage.setItem('token', res.data.token)
          context.setToken(res.data.token)
          props.history.push('/')
        })
    }
  }

  return (
    <Container style={{ marginTop: '30px' }}>
      <Header as="h1" icon textAlign="center">
        <Icon name="user" circular />
        <Header.Content>Daftar Anggota</Header.Content>
      </Header>
      <Card fluid>
        <Card.Content>
          <div style={styles.card}>
            <Form size="large">
              <Form.Input
                id="input-bukti-anggota"
                label="Bukti Bayar"
                type="file"
                onChange={e => setSelectedFile(e.target.files[0])}
              />
              <Form.Button color="green" size="medium" onClick={daftarAnggota}>
                Daftar Anggota
              </Form.Button>
            </Form>
          </div>
        </Card.Content>
      </Card>
    </Container>
  )
}

const styles = {
  card: {
    margin: '15px 50px 10px 50px',
  },
}

export default DaftarAnggota
