import React, { useState, useEffect, useContext } from 'react'
import CardLogTransaksi from './CardLogTransaksi'
import axios from 'axios'
import { Header, Container } from 'semantic-ui-react'
import { UserContext } from '../../App'

function LogTransaksi(props) {
  const context = useContext(UserContext)
  const [kumpulanTransaksi, setKumpulanTransaksi] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:8000/transaksi', {
        headers: { Authorization: `Bearer ${context.token}` },
      })
      .then(res => setKumpulanTransaksi(res.data))
  }, [])

  return (
    <>
      {kumpulanTransaksi.length ? (
        kumpulanTransaksi.map(transaksi => {
          const dateTime = new Date(transaksi.createdAt)
          const date = dateTime.getDate()
          const month = dateTime.getMonth() + 1
          const year = dateTime.getFullYear()
          const hour = dateTime.getHours()
          const minutes = dateTime.getMinutes()

          return (
            <Container style={styles.marginCard} key={transaksi.id_transaksi}>
              <CardLogTransaksi
                idTransaksi={transaksi.id_transaksi}
                kotaAsal={transaksi.kota_asal}
                tujuan={transaksi.kota_tujuan}
                detailAlamat={transaksi.detail_alamat}
                tanggal={`${date}-${month}-${year} ${hour}:${minutes}`}
                totalBerat={transaksi.total_berat}
                totalTransaksi={transaksi.total_harga}
                ongkir={transaksi.ongkir}
                buktiBayar={transaksi.bukti_bayar}
                onDetailButtonClick={() =>
                  props.history.push({
                    pathname: '/transaksi/detail',
                    state: transaksi.id_transaksi,
                  })
                }
              />
            </Container>
          )
        })
      ) : (
        <Header as="h2">Transaksi Kosong</Header>
      )}
    </>
  )
}

export default LogTransaksi

const styles = {
  marginCard: {
    marginTop: '15px',
  },
  linkPosition: {
    position: 'relative',
    left: '74%',
    fontSize: '15px',
  },
  buttonPosition: {
    position: 'relative',
    top: '610%',
    left: '76%',
    transform: 'translate(-76%,-610%)',
  },
}
