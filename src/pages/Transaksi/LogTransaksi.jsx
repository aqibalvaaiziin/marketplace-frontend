import React, { useState, useEffect } from 'react'
import CardLogTransaksi from './CardLogTransaksi'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

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
            />
            <Link to={{ pathname: '/transaksi/detail', state: transaksi.id_transaksi }} >
              <Button basic color="blue" style={styles.buttonPosition}>
                Detail Keranjang
            </Button>
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default LogTransaksi

const styles = {
  marginCard: {
    marginTop: '70px',
  },
  linkPosition: {
    position: 'relative',
    left: '74%',
    fontSize: '15px'
  },
  buttonPosition: {
    position: 'relative',
    top: '610%',
    left: '76%',
    transform: 'translate(-76%,-610%)'
  }
}
