import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../Beranda/ProductCard'
import { Grid, Divider, Button, Icon } from 'semantic-ui-react'

function ProdukSaya(props) {
  return (
    <React.Fragment>
      <Divider horizontal>Produk Usaha</Divider>
      {props.doesHaveSameUsahaId() && (
        <Link to={{ pathname: '/tambahproduk' }}>
          <Button color="green" icon style={styles.marginDivider}>
            <Icon name="plus"></Icon> Tambah Produk
          </Button>
        </Link>
      )}
      <Grid columns={5}>
        {props.usaha && (
          <Grid.Row>
            {props.usaha.produks.map(produk => (
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
  )
}

export default ProdukSaya

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
