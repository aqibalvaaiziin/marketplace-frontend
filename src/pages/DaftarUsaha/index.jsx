import React , { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {
    Container,
    Form,
    Grid,
    Card,
    Dropdown,
    Segment,
    Header,
    Icon,
} from 'semantic-ui-react'

function DaftarUsaha(props) {
    const [kumpulanProvinsi, setKumpulanProvinsi] = useState([])
    const [kumpulanKota, setKumpulanKota] = useState([])
    const [idKota, setIdKota] = useState()
    const [idProvinsi, setIdProvinsi] = useState()

    const optionProvinsi = kumpulanProvinsi.map(provinsi => ({
        key: provinsi.id_provinsi,
        text: provinsi.provinsi,
        value: provinsi.id_provinsi,
    }))

    const optionKota = kumpulanKota.map(kota => ({
        key: kota.id_kota,
        value: kota.id_kota,
        text: kota.tipe === 'Kabupaten' ? `${kota.tipe} ${kota.kota}` : kota.kota,
    }))

    useEffect(() => {
        getProvinsi()
    }, [])

    function getProvinsi() {
        axios
            .get('http://localhost:8000/provinsi')
            .then(response => setKumpulanProvinsi(response.data))
    }

    function getKota(e, { value }) {
        setIdProvinsi(value)
        axios
            .get(`http://marketplace-express.herokuapp.com/provinsi/${value}/kota`)
            .then(response => {
                setKumpulanKota(response.data)
            })
    }

    function getSelectedKota(e, { value }) {
        setIdKota(value)
    }
    return (
        <Container style={{ marginBottom: "35px", marginTop: "30px" }}>
            <Header as="h1" icon textAlign="center">
                <Icon name="warehouse" circular />
                <Header.Content>Buka Usaha</Header.Content>
            </Header>
            <Card fluid>
                <Card.Content>
                    <div style={styles.card}>
                        <Form size="large">
                            <Form.Group widths="equal">
                                <Form.Input
                                    fluid
                                    id="tes"
                                    label="Nama"
                                    placeholder="Tes"
                                />
                                <Form.Input
                                    fluid
                                    id="tes2"
                                    label="No Telp."
                                    placeholder="Tes2"
                                />
                            </Form.Group>
                            <Header as="h4">Alamat</Header>
                            <Segment >
                                <Grid textAlign="center">
                                    <Grid.Row>
                                        <Grid.Column width="5">Provinsi</Grid.Column>
                                        <Grid.Column width="5">Kota</Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Grid.Column width="5">
                                            <Dropdown
                                                placeholder="Provinsi"
                                                fluid
                                                search
                                                selection

                                                options={optionProvinsi}
                                                onChange={getKota}
                                                value={idProvinsi}
                                            />
                                        </Grid.Column>
                                        <Grid.Column width="5">
                                            <Dropdown
                                                placeholder="Kota"
                                                fluid
                                                search
                                                selection
                                                options={optionKota}
                                                onChange={getSelectedKota}
                                                value={idKota}
                                            />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                            <Form.TextArea
                                label="Detail Alamat"
                                placeholder="Detail Alamat"
                            />
                            <Form.Input
                                label="Logo Usaha"
                                type="file">

                            </Form.Input>
                            <Form.Button
                                color="green"
                                size="big">
                                Daftar
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

export default DaftarUsaha
