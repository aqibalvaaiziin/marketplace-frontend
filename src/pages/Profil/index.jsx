import React, { useState, useEffect, useContext } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { UserContext } from '../../App'
import axios from 'axios'
import SidebarProfil, { listActiveSidebarItem } from './SidebarProfil'
import { listActiveItem } from './NavPesananSaya'
import UangSaya from './UangSaya'
import AkunSaya from './AkunSaya'
import PesananSayaContainer from './PesananSayaContainer'

function Profil(props) {
  const context = useContext(UserContext)
  let idPengguna
  const [pengguna, setPengguna] = useState()
  const [loading, setLoading] = useState(false)

  const [activeItem, setActiveItem] = useState(listActiveItem.semua)
  const [activeSidebarItem, setactiveSidebarItem] = useState(
    listActiveSidebarItem.akunSaya,
  )

  const [kumpulanTransaksi, setKumpulanTransaksi] = useState([])

  useEffect(() => {
    setLoading(true)
    if (!props.location.state) {
      if (context.getPengguna()) {
        idPengguna = context.getPengguna().id_pengguna
        axios.get(`http://localhost:8000/pengguna/${idPengguna}`).then(res => {
          setPengguna(res.data)
          axios
            .get('http://localhost:8000/transaksi', {
              headers: { Authorization: `Bearer ${context.token}` },
            })
            .then(res => {
              setKumpulanTransaksi(res.data)
              console.log(res.data)
              setLoading(false)
            })
        })
      } else {
        props.history.push('/')
      }
    } else {
      axios
        .get(
          `http://localhost:8000/pengguna/${props.location.state.id_pengguna}`,
        )
        .then(res => {
          setPengguna(res.data)
          setLoading(false)
        })
    }
  }, [])
  return (
    <Container style={(styles.marginSide, styles.paddingContainer)}>
      {pengguna && !loading && (
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={3}>
              <SidebarProfil
                pengguna={pengguna}
                setActiveItem={setactiveSidebarItem}
                activeItem={activeSidebarItem}
              />
            </Grid.Column>
            <Grid.Column width={13}>
              {activeSidebarItem === listActiveSidebarItem.akunSaya && (
                <AkunSaya pengguna={pengguna} />
              )}
              {activeSidebarItem === listActiveSidebarItem.pesananSaya && (
                <PesananSayaContainer
                  kumpulanTransaksi={kumpulanTransaksi}
                  setActiveItem={setActiveItem}
                  activeItem={activeItem}
                  listActiveItem={listActiveItem}
                  history={props.history}
                />
              )}
              {activeSidebarItem === listActiveSidebarItem.uangSaya && (
                <UangSaya />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  )
}

const styles = {
  cardRow: {
    marginTop: 15,
  },
  marginSide: {
    marginTop: 15,
  },
  noMargin: {
    marginTop: '0',
  },
  paddingContainer: {
    padding: 14,
  },
}
export default Profil
