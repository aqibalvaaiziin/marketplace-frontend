import React from 'react'
import { Container, Header, Icon, Card, Form } from 'semantic-ui-react'

function TambahProduk() {
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
                                    placeholder="Tes"
                                />
                                <Form.Input
                                    fluid
                                    id="stok"
                                    label="Stok Produk"
                                    placeholder="Tes"
                                />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    id="harga"
                                    label="Harga Produk"
                                    placeholder="Tes"
                                    icon="dollar sign"
                                    iconPosition="left"
                                />
                                <Form.Input
                                    fluid
                                    id="berat"
                                    label="Berat Produk"
                                    placeholder="Tes"
                                />
                            </Form.Group>
                            <Form.TextArea
                                label="Deskripsi Produk"
                                placeholder="Tes"
                            />         
                            <Form.Input
                                label="Gambar Produk"
                                type="file"
                            />
                            <Form.Button
                            color="green"
                            size="medium">
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