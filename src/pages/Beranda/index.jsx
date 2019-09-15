import React, { useState, useEffect } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import axios from 'axios'

function Home() {
  const [kumpulanProduk, setKumpulanProduk] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8000/produk')
      .then(res => setKumpulanProduk(res.data))
  }, [])

  return (
    <Container>
      <Grid columns={5}>
        <Grid.Row>
          {kumpulanProduk.map(produk => (
            <Grid.Column style={styles.cardRow} key={produk.id_produk}>
              <Link to={{ pathname: '/detail-produk', state: produk }}>
                <ProductCard name={produk.nama} price={produk.harga} />
              </Link>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default Home

const styles = {
  cardRow: {
    marginTop: 15,
  },
}
