import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Grid, Sidebar, Segment, Image, Header } from 'semantic-ui-react'
import { UserContext } from '../../App'
import axios from 'axios'

function Profil(props) {
  const context = useContext(UserContext)
  let idPengguna
  const [pengguna, setPengguna] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
    if (!props.location.state) {
      if (context.getPengguna()) {
        idPengguna = context.getPengguna().id_pengguna
        axios
          .get(`http://localhost:8000/pengguna/${idPengguna}`)
          .then(res => {
            setPengguna(res.data)
            setLoading(true)
          })
      } else {
        props.history.push('/')
      }
    } else {
      axios
        .get(`http://localhost:8000/pengguna/${props.location.state.id_pengguna}`)
        .then(res => setPengguna(res.data))
      setLoading(true)
    }

  }, [])
  return (
    <Container style={styles.marginSide}>
      {
        pengguna && loading && (
          <Grid>
            <Grid.Column width={4}>
              <Image
                src="https://placeimg.com/120/120/any"
                size="medium" circular
              />
              <Header size="large">
                {pengguna.nama}
              </Header>
              <Header size="medium">
                User ID : {pengguna.id_pengguna}
              </Header>
            </Grid.Column>
            <Grid.Column width={9}>

            </Grid.Column>
          </Grid>
        )
        // <Grid columns={2}>
        //   <Grid.Column width={3}>
        //     <Sidebar />
        //   </Grid.Column>
        //   <Grid.column width={13}>
        //     <Grid columns={5}>

        //     </Grid>
        //   </Grid.column>
        // </Grid>

      }
    </Container>
  )
}

const styles = {
  cardRow: {
    marginTop: 15,
  },
  marginSide: {
    marginTop: 25
  },
  noMargin: {
    marginTop: '0'
  }
}
export default Profil
