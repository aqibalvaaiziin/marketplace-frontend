import React, { useState, useEffect, useContext } from 'react'
import { Container, Grid, Placeholder } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import Sidebar from "../../component/Sidebar";
import { UserContext } from '../../App'
import axios from 'axios'

function Home() {
  const context = useContext(UserContext)
  const [kumpulanProduk, setKumpulanProduk] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios
      .get('http://localhost:8000/produk')
      .then(res => {
        setKumpulanProduk(res.data)
        setLoading(false)
      })
  }, [])

  return (
    <Container style={styles.marginSide}>
      {
        context.isLoggedIn() ? [
          <Grid columns={2}>
            <Grid.Column width={3}>
              <Sidebar />
            </Grid.Column>
            {
              (loading) ? (
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length='medium' />
                    <Placeholder.Line length='short' />
                  </Placeholder.Paragraph>
                </Placeholder>
              ) : (
                  <Grid.Column width={13}>
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
                  </Grid.Column>
                )
            }
          </Grid>
        ] : [
            (loading) ? (
              <Placeholder>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length='medium' />
                  <Placeholder.Line length='short' />
                </Placeholder.Paragraph>
              </Placeholder>
            ) : (
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
              )
          ]
      }

    </Container>
  )
}

export default Home

const styles = {
  cardRow: {
    marginTop: 15,
  },
  marginSide: {
    marginTop: 25
  }
}
