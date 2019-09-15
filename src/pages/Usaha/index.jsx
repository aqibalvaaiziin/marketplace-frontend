import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../Beranda/ProductCard'
import { Container, Image, Grid, Header, Segment, Divider } from 'semantic-ui-react'
import { UserContext } from '../../App'
import axios from 'axios'


function Usaha(props) {
    const context = useContext(UserContext)

    const [usaha, setUsaha] = useState()

    useEffect(() => {
        console.log(props.location)
        if (!props.location.state) {
            const idUsaha = context.getPengguna().usaha.id_usaha
            axios
            .get(`http://localhost:8000/usaha/${idUsaha}`)
            .then(res => {
                setUsaha(res.data)
            })
        } else {
            axios
            .get(`http://localhost:8000/usaha/${props.location.state}`)
            .then(res => setUsaha(res.data))
        }
    }, [])

    return (
        <Container style={styles.marginCard}>
            <Segment>
                {
                    usaha && (
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
                                        <Header size="medium">{usaha.nama}</Header>
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
                                            subheader={usaha.no_telp}
                                        />
                                    </Grid.Column>
                                </Grid>
                            </Grid.Column>
                        </Grid>
                    )
                }
            </Segment>
            <Divider horizontal style={styles.marginDivider}>Produk Usaha</Divider>
            <Grid columns={5}>
                {
                    usaha && (
                        <Grid.Row>
                            {usaha.produks.map(produk => (
                                <Grid.Column style={styles.cardRow} key={produk.id_produk}>
                                <Link to={{ pathname: '/detail-produk', state: produk }}>
                                    <ProductCard name={produk.nama} price={produk.harga} />
                                </Link>
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                    )
                }
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
  