import React, { useState, useEffect, useContext } from 'react'
import { Container, Grid, Placeholder, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import Sidebar from "../../component/Sidebar";
import { UserContext } from '../../App'
import axios from 'axios'
import Banner from './Banner';

const cards = [
  {header: "loadingOne"},
  {header: "loadingTwo"},
  {header: "loadingThree"},
  {header: "loadingFour"},
  {header: "loadingFive"},
]

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
    <Container style={styles.cardRow}>
      {
        context.isLoggedIn() ? (
          <Grid columns={2}>
            <Grid.Column width={3}>
              <Sidebar />
            </Grid.Column>  
              <Grid.Column width={13}>
                <Grid.Row style={styles.cardRow} stretched>
                  <Grid.Column>
                    <Banner/>
                  </Grid.Column>
                </Grid.Row>
                <Grid columns={5}>
                  <Grid.Row>
                      {
                        (loading) ? (
                            <>
                              {cards.map((card, index) => (
                            <Grid.Column stretched style={styles.marginSide} key={index}>
                                <Card key={card.header}>
                                    <Placeholder>
                                      <Placeholder.Image square />
                                    </Placeholder>
                                  <Card.Content>
                                      <Placeholder>
                                        <Placeholder.Header>
                                          <Placeholder.Line length='very short' />
                                          <Placeholder.Line length='medium' />
                                        </Placeholder.Header>
                                        <Placeholder.Paragraph>
                                          <Placeholder.Line length='short' />
                                        </Placeholder.Paragraph>
                                      </Placeholder>
                                  </Card.Content>
                                </Card>
                              </Grid.Column>
                              ))}
                            </>
                        ) : (
                            <React.Fragment>
                              {kumpulanProduk.map(produk => (
                                <Grid.Column style={styles.marginSide} key={produk.id_produk}>
                                  <Link to={{ pathname: '/detail-produk', state: produk }}>
                                    <ProductCard name={produk.nama} price={produk.harga} />
                                  </Link>
                                </Grid.Column>
                              ))}
                            </React.Fragment>
                        )
                      }
                    </Grid.Row>
                </Grid>
              </Grid.Column>
          </Grid>
         ) : [
            (loading) ? (
              <Grid columns={5}>
                <Grid.Row>
                  {cards.map((card) => (
                    <Grid.Column stretched style={styles.cardRow}>
                        <Card key={card.header}>
                            <Placeholder>
                              <Placeholder.Image square />
                            </Placeholder>
                          <Card.Content>
                              <Placeholder>
                                <Placeholder.Header>
                                  <Placeholder.Line length='very short' />
                                  <Placeholder.Line length='medium' />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                  <Placeholder.Line length='short' />
                                </Placeholder.Paragraph>
                              </Placeholder>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    ))}
                </Grid.Row>
              </Grid>
            ) : (
                <>
                  <Grid.Row style={styles.cardRow} stretched>
                    <Grid.Column>
                      <Banner/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid columns={5}>
                    <Grid.Row>
                      {kumpulanProduk.map(produk => (
                        <Grid.Column style={styles.marginSide} key={produk.id_produk}>
                          <Link to={{ pathname: '/detail-produk', state: produk }}>
                            <ProductCard name={produk.nama} price={produk.harga} />
                          </Link>
                        </Grid.Column>
                      ))}
                    </Grid.Row>
                  </Grid>
                </>
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
    marginTop: 60
  }
}
