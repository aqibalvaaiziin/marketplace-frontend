import React from 'react'
import {
  Container,
  Segment,
  Header,
  Grid,
  Icon,
  Image,
} from 'semantic-ui-react'

function AkunSaya(props) {
  return (
    <Container>
      <Segment>
        <Header as="h2" textAlign="center" style={styles.marginHeader}>
          <Icon name="user outline" size="mini" />
          Akun Saya
        </Header>

        <Grid columns={2}>
          <Grid.Column width={5}>
            <Segment style={{ padding: '15px', marginLeft: '20px' }}>
              <Image src="https://placeimg.com/120/120/any" fluid />
            </Segment>
          </Grid.Column>
          <Grid.Column width={11}>
            <div style={{ marginLeft: '20px' }}>
              <Header as="h4" style={{ marginBottom: '20px' }}>
                Data Akun
              </Header>
              <Grid columns={2}>
                <Grid.Column width={5}>
                  <p style={{ marginBottom: '20px' }}>Username</p>
                  <p style={{ marginBottom: '20px' }}>Nama</p>
                  <p style={{ marginBottom: '20px' }}>Status Keanggotaan</p>
                </Grid.Column>
                <Grid.Column width={11}>
                  <p style={{ marginBottom: '20px' }}>
                    {props.pengguna.username}
                  </p>
                  <p style={{ marginBottom: '20px' }}>{props.pengguna.nama}</p>
                  <p style={{ marginBottom: '20px' }}>
                    {props.pengguna.keanggotaan ? 'Anggota' : 'Pengguna'}
                  </p>
                </Grid.Column>
              </Grid>
            </div>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  )
}

const styles = {
  marginHeader: {
    marginTop: '30px',
    marginBottom: '50px',
  },
  marginContent: {
    marginLeft: '50px',
  },
}

export default AkunSaya
