import React, { useState, useEffect } from 'react'
import CardLogTransaksi from './CardLogTransaksi'
import axios from 'axios'

function LogTransaksi(props) {
  const [kumpulanTransaksi, setKumpulanTransaksi] = useState([])

  useEffect(() => {
    axios
      .get('https://marketplace-express.herokuapp.com/transaksi')
      .then(res => setKumpulanTransaksi(res.data))
  }, [])

  return (
    <>
      {kumpulanTransaksi.map(transaksi => {
        const dateTime = new Date(transaksi.createdAt)
        const date = dateTime.getDate()
        const month = dateTime.getMonth() + 1
        const year = dateTime.getFullYear()
        const hour = dateTime.getHours()
        const minutes = dateTime.getMinutes()

        return (
          <div style={styles.marginCard} key={transaksi.id_transaksi}>
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
          </div>
        )
      })}
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
