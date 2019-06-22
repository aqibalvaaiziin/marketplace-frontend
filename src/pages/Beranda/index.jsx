import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import axios from 'axios'

export default class Home extends Component {
  state = {
    produk: [],
  }

  componentDidMount() {
    axios
      .get('https://marketplace-express.herokuapp.com/produk')
      .then((res) => {
        this.setState({
          produk: res.data,
        })
      })
  }

  render() {
    return (
      <Container>
        <Grid columns={5}>
          <Grid.Row>
            {this.state.produk.map((produk) => {
              return (
                <Grid.Column style={styles.cardRow}>
                  <Link to={{ pathname: '/detail-produk', state: produk }}>
                    <ProductCard
                      key={produk.id_produk}
                      name={produk.nama}
                      price={produk.harga}
                    />
                  </Link>
                </Grid.Column>
              )
            })}
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const styles = {
  cardRow: {
    marginTop: 15,
  },
}
