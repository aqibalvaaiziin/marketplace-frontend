import React, { useContext } from 'react'
import { UserContext } from "../../App";
import { Segment, Grid, Image, Header, Divider } from 'semantic-ui-react';
import { Link } from "react-router-dom";

function Sidebar() {
    const context = useContext(UserContext)

    return (
        <Segment.Group>
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
                                <Header as="h4">
                                    {context.getPengguna().nama}
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
                                        <Link to={{pathname: `/usaha`}}>
                                            <Header as="h4">
                                                {context.getPengguna().usaha.nama}
                                            </Header>
                                        </Link>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <Divider/>
                            <Link to={{pathname: `/tambahproduk`}}>
                                    Tambah Produk
                            </Link>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {
                                context.getPengguna().keanggotaan ? (
                                    <React.Fragment>
                                        <Link to={{pathname: "/daftarusaha"}}>
                                            <Header as="h4">
                                                Mulai jualan?
                                            </Header>
                                        </Link>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Link to={{pathname: "/daftaranggota"}}>
                                            <Header as="h4">
                                                Daftar Jadi Anggota?
                                            </Header>
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
