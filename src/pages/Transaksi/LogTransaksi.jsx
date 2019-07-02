import React, { Component, Fragment } from 'react'
import CardLogTransaksi from './CardLogTransaksi'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class LogTransaksi extends Component {
  state = {
    transaksi: [],
  }

  componentDidMount() {
    axios
      .get('https://marketplace-express.herokuapp.com/transaksi')
      .then((res) => {
        this.setState({
          transaksi: res.data,
        })
      })
  }

  render() {
    return (
      <Fragment>
        {this.state.transaksi.map((transaksi) => {
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
              <div style={styles.marginCard}>
                <CardLogTransaksi
                  key={transaksi.id_transaksi}
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
      </Fragment>
    )
  }
}

const styles = {
  marginCard: {
    marginTop: '20px',
  },
}
