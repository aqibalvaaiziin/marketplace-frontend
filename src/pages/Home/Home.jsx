import React, { Component, Fragment } from 'react'
import { Container, Grid } from 'semantic-ui-react';
import Card from '../../components/CardProduct/CardProduct';
import Axios from 'axios';

export default class Home extends Component {

  state = {
    dataCard: []
  }

  componentDidMount() {
    Axios.get('https://marketplace-express.herokuapp.com/produk')
      .then((res) => {
        console.log(res.data)
        this.setState({
          dataCard: res.data
        })
      })
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Grid columns={5}>
            <Grid.Row>
              {
                this.state.dataCard.map(dataCard => {
                  return (
                    <Grid.Column style={styles.cardRow}>
                      <Card key={dataCard.id_produk} name={dataCard.nama} price={dataCard.harga} />
                    </Grid.Column>
                  )
                })
              }
            </Grid.Row>
          </Grid>


        </Container>
      </Fragment>
    )
  }
}

const styles = {
  cardRow: {
    marginTop: 15
  }
}