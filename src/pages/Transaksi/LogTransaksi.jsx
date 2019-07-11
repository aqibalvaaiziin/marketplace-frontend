import React, { useState, useEffect } from 'react'
import CardLogTransaksi from './CardLogTransaksi'
import { Link } from 'react-router-dom'
import axios from 'axios'

function LogTransaksi() {

  const [transaksi, setTransaksi] = useState([])

  useEffect(() => {
    axios
      .get('https://marketplace-express.herokuapp.com/transaksi')
      .then((res) => setTransaksi(res.data))
  }, [])

  return (
    <>
      {transaksi.map((transaksi) => {
        let dateTime = new Date(transaksi.createdAt)
        let date = dateTime.getDate()
        let month = dateTime.getMonth() + 1
        let year = dateTime.getFullYear()
        let hour = dateTime.getHours()
        let minutes = dateTime.getMinutes()

        return (
          <Link
            to={{
              pathname: '/transaksi/detail',
              state: transaksi.id_transaksi,
            }}>
            <div style={styles.marginCard} key={transaksi.id_transaksi}>
              <CardLogTransaksi

                idTransaksi={transaksi.id_transaksi}
                kotaAsal={transaksi.kota_asal}
                tujuan={transaksi.kota_tujuan}
                detailAlamat={transaksi.detail_alamat}
                tanggal={`${date}-${month}-${year} ${hour}:${minutes}`}
                totalBerat={transaksi.total_berat}
                totalHarga={transaksi.total_harga}
                ongkir={transaksi.ongkir}
                buktiBayar={transaksi.bukti_bayar}
              />
            </div>
          </Link>
        )
      })}
    </>
  )
}

export default LogTransaksi

const styles = {
  marginCard: {
    marginTop: '20px',
  },
}
