import React, { useContext } from 'react'
import { UserContext } from "../../App";
import { Segment, Grid, Image, Header, Divider, Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import { styles } from 'ansi-colors';

function Sidebar() {
    const context = useContext(UserContext)

    return (
        <Segment.Group style={{ marginTop: "15px" }}>
            <Segment>
                <Grid columns={2}>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column width={5}>
                            <Image
                                src="https://placeimg.com/120/120/any"
                                fluid
                            />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Link to={{pathname: `/profil`}}>
                                <Header as="h4" style={{marginBottom:"0"}}>
                                    {context.getPengguna().nama} <br/>
                                </Header>
                                <Header as="h5" style={{marginTop:"0"}}>
                                    {
                                        (context.getPengguna().keanggotaan) ? "(anggota)"
                                        : "(pengguna)"
                                    }
                                </Header>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
            <Segment>
                {
                    context.getPengguna().keanggotaan && context.getPengguna().usaha ? (
                        <React.Fragment>
                            <Header as="h3" textAlign="center">Usaha Saya</Header>
                            <Grid columns={2}>
                                <Grid.Row verticalAlign="middle">
                                    <Grid.Column width={5}>
                                        <Image
                                            src="https://placeimg.com/120/120/any"
                                            fluid
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={11}>
                                        <Link to={{ pathname: `/usaha` }}>
                                            <Header as="h4">
                                                {context.getPengguna().usaha.nama}
                                            </Header>
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Divider />
                            <Link to={{ pathname: `/tambahproduk` }}>
                                <Button content="Tambah Produk" color="green" fluid />
                            </Link>
                        </React.Fragment>
                    ) : (
                            <React.Fragment>
                                {
                                    context.getPengguna().keanggotaan ? (
                                        <React.Fragment>
                                            <Link to={{ pathname: "/daftarusaha" }}>
                                                <Button content="Buka Usaha" color="green" fluid />
                                            </Link>
                                        </React.Fragment>
                                    ) : (
                                            <React.Fragment>
                                                <Link to={{ pathname: "/daftaranggota" }}>
                                                    <Button content="Daftar Anggota" color="green" fluid />
                                                </Link>
                                            </React.Fragment>
                                        )
                                }
                            </React.Fragment>
                        )
                }
            </Segment>
        </Segment.Group>
    )
}

export default Sidebar