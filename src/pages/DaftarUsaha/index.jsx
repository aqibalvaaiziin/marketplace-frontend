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
import { UserContext } from '../../App'

function DaftarUsaha(props) {
    const [kumpulanProvinsi, setKumpulanProvinsi] = useState([])
    const [kumpulanKota, setKumpulanKota] = useState([])
    const [idKota, setIdKota] = useState()
    const [idProvinsi, setIdProvinsi] = useState()
    const [selectedFile, setSelectedFile] = useState(null)
    const [input, setInput] = useState({
        nama:"",
        kota: 0,
        nama_kota: "",
        nama_provinsi: "",
        detail_alamat: "",
        slogan: "",
        no_telp: "",
    })

    const context = useContext(UserContext)

    function changeValue(value, name) {
        setInput({ ...input, [name]: value })
    }

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
            .get(`http://localhost:8000/provinsi/${value}/kota`)
            .then(response => {
                setKumpulanKota(response.data)
            })
    }

    function getSelectedKota(e, { value }) {
        const kota = kumpulanKota.find((town) => town.id_kota == value)
        setInput({...input, kota: value, nama_kota: `${kota.tipe} ${kota.kota}`, nama_provinsi: kota.provinsi})
        setIdKota(value)
    }

    function daftarUsaha() {
        axios.post(`http://localhost:8000/pengguna/anggota/bukausaha`, 
            input,
            {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${context.token}`,
                },
            },
            )
            .then(res => {
                localStorage.setItem('token', res.data.token)
                context.setToken(res.data.token)
                props.history.push('/usaha')
            })
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
                                    label="Nama"
                                    placeholder="Nama usaha anda..."
                                    onChange={event => changeValue(event.target.value, 'nama')}
                                />
                                <Form.Input
                                    fluid
                                    label="No Telp."
                                    placeholder="Nomor telepon"
                                    onChange={event => changeValue(event.target.value, 'no_telp')}
                                />
                            </Form.Group>
                            <Form.Input
                                fluid
                                label="Slogan"
                                placeholder="Slogan usaha anda..."
                                onChange={event => changeValue(event.target.value, 'slogan')}
                            />
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
                                onChange={event => changeValue(event.target.value, 'detail_alamat')}
                            />
                            <Form.Input
                                id="logo-usaha"
                                label="Logo Usaha"
                                type="file"
                                onChange={e => setSelectedFile(e.target.files[0])}
                                >

                            </Form.Input>
                            <Form.Button
                                color="green"
                                size="big"
                                onClick={daftarUsaha}>
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
