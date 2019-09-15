import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../Beranda/ProductCard'
import { Container, Image, Grid, Header, Segment, Divider } from 'semantic-ui-react'
import axios from 'axios'


function Usaha() {
    const [kumpulanProduk, setKumpulanProduk] = useState([])

    useEffect(() => {
        axios
        .get('http://localhost:8000/produk')
        .then(res => setKumpulanProduk(res.data))
    }, [])

    return (
        <Container style={styles.marginCard}>
            <Segment>
                <Grid divided columns={2} >
                    <Grid.Column width="2">
                        <Image
                            src="https://placeimg.com/120/120/any" 
                            fluid
                        />
                    </Grid.Column>
                    <Grid.Column width="14">
                        <Grid celled="internally" columns={2}>
                            <Grid.Column>
                                <Header size="medium">DaffaAkbar</Header>
                                <Header sub style={styles.noMargin}>Ini Slogan Saya masih placeholder yang penting maju jangan mundur ya</Header>
                            </Grid.Column>
                            <Grid.Column>
                                <Header
                                    size="small"
                                    icon="map marker alternate"
                                    content="Alamat"
                                    subheader="Bla Bla Bla"
                                />
                                <Header
                                    size="small"
                                    icon="phone"
                                    content="Nomor Telepon"
                                    subheader="086765432123"
                                />
                            </Grid.Column>
                        </Grid>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Divider horizontal style={styles.marginDivider}>Produk Usaha</Divider>
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

export default Usaha

const styles = {
    marginCard: {
      marginTop: '50px',
    },
    noMargin: {
        marginTop: '0'
    },
    marginDivider: {
        marginTop: '50px',
        marginBottom: '50px'
    }
  }
  