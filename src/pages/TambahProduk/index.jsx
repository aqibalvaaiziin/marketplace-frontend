import React, { useState, useContext } from 'react'
import { Container, Header, Icon, Card, Form } from 'semantic-ui-react'
import { UserContext } from "../../App";
import axios from "axios";

function TambahProduk(props) {
    const context = useContext(UserContext)
    const [input, setInput] = useState({
        nama: '',
        stok: 0,
        harga: 0,
        berat: 0,
        deskripsi: ''
    })

    function changeValue(value, name) {
        setInput({...input, [name]: value})
    }

    function addBarang() {
        if (context.getPengguna().usaha) {
            axios.post(`http://localhost:8000/usaha/${context.getPengguna().usaha.id_usaha}/produk`, 
            input,
            {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${context.token}`,
                },
            },
            )
            .then(res => {
                props.history.push('/usaha')
            })
        }
    }

    return (
        <Container style={{marginTop: "30px"}}>
            <Header as="h1" icon textAlign="center">
                <Icon name="box" circular />
                <Header.Content>Tambah Produk</Header.Content>
            </Header>
            <Card fluid>
                <Card.Content>
                    <div style={styles.card}>
                        <Form size="large">
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    id="nama"
                                    label="Nama Produk"
                                    onChange={event => changeValue(event.target.value, 'nama')}
                                    value={input.nama}
                                />
                                <Form.Input
                                    fluid
                                    id="stok"
                                    label="Stok Produk"
                                    onChange={event => changeValue(event.target.value, 'stok')}
                                    value={input.stok}
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    id="harga"
                                    label="Harga Produk"
                                    icon="dollar sign"
                                    iconPosition="left"
                                    onChange={event => changeValue(event.target.value, 'harga')}
                                    value={input.harga}
                                />
                                <Form.Input
                                    fluid
                                    id="berat"
                                    label="Berat Produk"
                                    onChange={event => changeValue(event.target.value, 'berat')}
                                    value={input.berat}
                                />
                            </Form.Group>
                            <Form.TextArea
                                label="Deskripsi Produk"
                                placeholder="Tes"
                            />         
                            <Form.Input
                                label="Gambar Produk"
                                type="file"
                                onChange={event => changeValue(event.target.value, 'deskripsi')}
                                value={input.deskripsi}
                            />                 
                            <Form.Button
                            color="green"
                            size="medium"
                            onClick={addBarang}
                            >
                                Tambah Produk
                            </Form.Button>       
                        </Form>
                    </div>
                </Card.Content>
            </Card>
        </Container>
    )
}

const styles = {
    card: {
        margin: '15px 50px 10px 50px'
    }
}

export default TambahProduk