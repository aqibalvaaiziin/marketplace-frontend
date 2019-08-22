import React from 'react'
import { Input, Header, Icon, Button } from 'semantic-ui-react'

function SignUp() {
  return (
    <div>
      <Header as='h1' icon textAlign='center' style={styles.iconPosition}>
        <Icon name='user circle' />
        <Header.Content>Daftar Pengguna</Header.Content>
      </Header>
      <div style={styles.centered}>
        <div style={styles.box}>
          <Input fluid icon='user outline' iconPosition='left' placeholder='Nama' />
          <Input fluid icon='user' iconPosition='left' placeholder='Username' />
          <Input fluid icon='lock' iconPosition='left' placeholder='Password' />
          <Button positive>Daftar</Button>
          <p style={styles.textLink}>Kembali Ke Toko ?</p>
        </div>
      </div>
    </div>
  )
}

export default SignUp

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