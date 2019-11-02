import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import SidebarDashboardUsaha, { listActiveItem } from './SidebarDashboardUsaha'
import {
  Container,
  Image,
  Grid,
  Header,
  Segment,
  Divider,
  Button,
  Icon,
} from 'semantic-ui-react'
import { UserContext, HOSTNAME } from '../../App'
import axios from 'axios'
import CardTabs from './CardTabs'
import ProdukSaya from './ProdukSaya'
import PesananSayaUsaha from './PesananSayaUsaha'
import ProductCard from '../Beranda/ProductCard'
import PenghasilanSaya from './PenghasilanSaya'

function Usaha(props) {
  const context = useContext(UserContext)
  let idUsaha
  const [usaha, setUsaha] = useState()
  const [loading, setLoading] = useState(false)

  const [activeItem, setActiveItem] = useState(listActiveItem.pesananSaya)
  // const [activeItemPesanan, setActiveItemPesanan] = useState(
  //   listActiveItemPesanan,
  // )

  useEffect(() => {
    setLoading(false)
    if (!props.location.state) {
      if (context.getPengguna().usaha) {
        idUsaha = context.getPengguna().usaha.id_usaha
        axios.get(`${HOSTNAME}/usaha/${idUsaha}`).then(res => {
          setUsaha(res.data)
          setLoading(true)
        })
      } else {
        props.history.push('/')
      }
    } else {
      axios
        .get(`${HOSTNAME}/usaha/${props.location.state.id_usaha}`)
        .then(res => {
          setUsaha(res.data)
          setLoading(true)
        })
    }
  }, [])

  function isLoggedIn() {
    return context.isLoggedIn()
  }

  function doesHaveUsaha() {
    return isLoggedIn() && context.getPengguna().usaha
  }

  function doesHaveSameUsahaId() {
    if (doesHaveUsaha() && loading) {
      const halamanUsaha = usaha.id_usaha
      const userUsaha = context.getPengguna().usaha.id_usaha
      return doesHaveUsaha() && halamanUsaha == userUsaha
    } else {
      return false
    }
  }

  return (
    <Container style={styles.marginCard}>
      <Segment>
        {usaha && loading && (
          <Grid divided columns={2}>
            <Grid.Column width="2">
              <Image src="https://placeimg.com/120/120/any" fluid />
            </Grid.Column>
            <Grid.Column width="14">
              <Grid celled="internally" columns={2}>
                <Grid.Column>
                  <Header size="medium">{usaha.nama}</Header>
                  <Header sub style={styles.noMargin}>
                    {usaha.slogan}
                  </Header>
                </Grid.Column>
                <Grid.Column>
                  <Header
                    size="small"
                    icon="map marker alternate"
                    content="Alamat"
                    subheader={usaha.nama_kota}
                  />
                  <Header
                    size="small"
                    icon="phone"
                    content="Nomor Telepon"
                    subheader={usaha.no_telp}
                  />
                </Grid.Column>
              </Grid>
            </Grid.Column>
          </Grid>
        )}
      </Segment>
      {!doesHaveSameUsahaId() && (
        <React.Fragment>
          <Divider horizontal>Produk Usaha</Divider>
          {doesHaveSameUsahaId() && (
            <Link to={{ pathname: '/tambahproduk' }}>
              <Button color="green" icon style={styles.marginDivider}>
                <Icon name="plus"></Icon> Tambah Produk
              </Button>
            </Link>
          )}
          <Grid columns={5}>
            {usaha && (
              <Grid.Row>
                {usaha.produks.map(produk => (
                  <Grid.Column style={styles.cardRow} key={produk.id_produk}>
                    <Link to={{ pathname: '/detail-produk', state: produk }}>
                      <ProductCard name={produk.nama} price={produk.harga} />
                    </Link>
                  </Grid.Column>
                ))}
              </Grid.Row>
            )}
          </Grid>
        </React.Fragment>
      )}
      {doesHaveSameUsahaId() && [
        <Grid columns={2} style={styles.marginGrid}>
          <Grid.Column width="3">
            <SidebarDashboardUsaha
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              history={props.history}
            />
          </Grid.Column>
          <Grid.Column width="13">
            {activeItem === listActiveItem.pesananSaya && <PesananSayaUsaha />}
            {activeItem === listActiveItem.produkSaya && (
              <ProdukSaya
                location={props.location}
                history={props.history}
                usaha={usaha}
                doesHaveSameUsahaId={doesHaveSameUsahaId}
              />
            )}
            {activeItem === listActiveItem.penghasilanSaya && (
              <PenghasilanSaya />
            )}
          </Grid.Column>
        </Grid>,
      ]}
    </Container>
  )
}

export default Usaha

const styles = {
  marginCard: {
    marginTop: '50px',
  },
  noMargin: {
    marginTop: '0',
  },
  marginDivider: {
    marginTop: '10px',
    marginBottom: '50px',
  },
  marginColumn: {
    marginLeft: '20px',
  },
  marginGrid: {
    marginTop: '10px',
  },
}
