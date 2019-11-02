import React, { useState, useEffect, useContext } from 'react'
import {
  Container,
  Grid,
  Placeholder,
  Card,
  Header,
  Segment,
  Button,
} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import Sidebar from '../../component/Sidebar'
import { UserContext, HOSTNAME } from '../../App'
import axios from 'axios'
import Banner from './Banner'

const cards = [
  { header: 'loadingOne' },
  { header: 'loadingTwo' },
  { header: 'loadingThree' },
  { header: 'loadingFour' },
  { header: 'loadingFive' },
]

function Home() {
  const context = useContext(UserContext)
  const [kumpulanProduk, setKumpulanProduk] = useState([])
  const [kumpulanKategori, setKumpulanKategori] = useState([])
  const [selectedProduk, setSelectedProduk] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${HOSTNAME}/produk`).then(res => {
      setKumpulanProduk(res.data)
      setSelectedProduk(res.data)
      axios.get(`${HOSTNAME}/kategori`).then(kat => {
        const _kumpulanKategori = kat.data
        _kumpulanKategori.forEach(kategori => (kategori.selected = true))
        setKumpulanKategori(_kumpulanKategori)
        setLoading(false)
      })
    })
  }, [])

  function getSelectedKategori() {
    const produkSelect = kumpulanProduk.filter(produk => {
      for (let i = 0; i < kumpulanKategori.length; i++) {
        const kat = kumpulanKategori[i]
        if (kat.id_kategori === produk.id_kategori) {
          if (kat.selected) {
            return produk
          }
          break
        }
      }
    })
    console.log(produkSelect)
    setSelectedProduk(produkSelect)
  }

  // getSelectedCategory(): IEvent[] {
  //   const selectedEvent: IEvent[] = this.events.filter(event => {
  //     const cat = this.categories.filter(category => {
  //       return category._id === event.category._id;
  //     });
  //     if (cat[0].isSelected) {
  //       return event;
  //     }
  //   });
  //   return selectedEvent;
  // }

  function setSelectedKategori(id) {
    let categories = kumpulanKategori
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id_kategori === id) {
        categories[i].selected = !categories[i].selected
        break
      }
    }
    setKumpulanKategori(categories)
    getSelectedKategori()
  }

  return (
    <Container style={styles.cardRow}>
      {context.isLoggedIn() ? (
        <Grid columns={2}>
          <Grid.Column width={3}>
            <Sidebar />
          </Grid.Column>
          <Grid.Column width={13}>
            <Grid.Row style={styles.cardRow} stretched>
              <Grid.Column>
                <Banner />
              </Grid.Column>
            </Grid.Row>
            <Header as="h3">Kategori</Header>
            <Grid columns={6}>
              <Grid.Row>
                {!loading &&
                  kumpulanKategori.map(kategori => {
                    return (
                      <Grid.Column stretched key={kategori.id_kategori}>
                        <Button
                          basic={!kategori.selected}
                          onClick={e =>
                            setSelectedKategori(kategori.id_kategori)
                          }>
                          {kategori.nama_kategori}
                        </Button>
                      </Grid.Column>
                    )
                  })}
              </Grid.Row>
            </Grid>
            <Grid columns={5}>
              <Grid.Row>
                {loading ? (
                  <>
                    {cards.map((card, index) => (
                      <Grid.Column
                        stretched
                        style={styles.marginSide}
                        key={index}>
                        <Card key={card.header}>
                          <Placeholder>
                            <Placeholder.Image square />
                          </Placeholder>
                          <Card.Content>
                            <Placeholder>
                              <Placeholder.Header>
                                <Placeholder.Line length="very short" />
                                <Placeholder.Line length="medium" />
                              </Placeholder.Header>
                              <Placeholder.Paragraph>
                                <Placeholder.Line length="short" />
                              </Placeholder.Paragraph>
                            </Placeholder>
                          </Card.Content>
                        </Card>
                      </Grid.Column>
                    ))}
                  </>
                ) : (
                  <React.Fragment>
                    {selectedProduk.map(produk => (
                      <Grid.Column
                        style={styles.marginSide}
                        key={produk.id_produk}>
                        <Link
                          to={{ pathname: '/detail-produk', state: produk }}>
                          <ProductCard
                            name={produk.nama}
                            price={produk.harga}
                          />
                        </Link>
                      </Grid.Column>
                    ))}
                  </React.Fragment>
                )}
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid>
      ) : (
        [
          loading ? (
            <Grid columns={5}>
              <Grid.Row>
                {cards.map(card => (
                  <Grid.Column stretched style={styles.cardRow}>
                    <Card key={card.header}>
                      <Placeholder>
                        <Placeholder.Image square />
                      </Placeholder>
                      <Card.Content>
                        <Placeholder>
                          <Placeholder.Header>
                            <Placeholder.Line length="very short" />
                            <Placeholder.Line length="medium" />
                          </Placeholder.Header>
                          <Placeholder.Paragraph>
                            <Placeholder.Line length="short" />
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
                  <Banner />
                </Grid.Column>
              </Grid.Row>
              <Header as="h3">Kategori</Header>
              <Grid columns={6}>
                <Grid.Row>
                  {!loading &&
                    kumpulanKategori.map(kategori => {
                      return (
                        <Grid.Column stretched key={kategori.id_kategori}>
                          <Button
                            basic={!kategori.selected}
                            onClick={e =>
                              setSelectedKategori(kategori.id_kategori)
                            }>
                            {kategori.nama_kategori}
                          </Button>
                        </Grid.Column>
                      )
                    })}
                </Grid.Row>
              </Grid>
              <Grid columns={5}>
                <Grid.Row>
                  {selectedProduk.map(produk => (
                    <Grid.Column
                      style={styles.marginSide}
                      key={produk.id_produk}>
                      <Link to={{ pathname: '/detail-produk', state: produk }}>
                        <ProductCard name={produk.nama} price={produk.harga} />
                      </Link>
                    </Grid.Column>
                  ))}
                </Grid.Row>
              </Grid>
            </>
          ),
        ]
      )}
    </Container>
  )
}

export default Home

const styles = {
  cardRow: {
    marginTop: 5,
  },
  gridMinus: {
    marginTop: -50,
  },
  marginSide: {
    marginTop: 60,
  },
}
