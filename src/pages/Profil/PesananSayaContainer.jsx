import React from 'react'
import { Container, Header } from 'semantic-ui-react'
import NavPesananSaya from './NavPesananSaya'
import CardLogTransaksi from '../Transaksi/CardLogTransaksi'

function PesananSayaContainer(props) {
  return (
    <div>
      <NavPesananSaya
        setActiveItem={props.setActiveItem}
        activeItem={props.activeItem}
      />
      {props.kumpulanTransaksi.length ? (
        props.kumpulanTransaksi.map(transaksi => {
          const dateTime = new Date(transaksi.createdAt)
          const date = dateTime.getDate()
          const month = dateTime.getMonth() + 1
          const year = dateTime.getFullYear()
          const hour = dateTime.getHours()
          const minutes = dateTime.getMinutes()

          return (
            <Container style={styles.marginCard} key={transaksi.id_transaksi}>
              {props.activeItem === props.listActiveItem.semua && (
                <CardLogTransaksi
                  idTransaksi={transaksi.id_transaksi}
                  kotaAsal={transaksi.nama_kota_asal}
                  tujuan={transaksi.nama_kota_tujuan}
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
              )}
              {props.activeItem === props.listActiveItem.belumBayar && (
                <CardLogTransaksi
                  idTransaksi={transaksi.id_transaksi}
                  kotaAsal={transaksi.nama_kota_asal}
                  tujuan={transaksi.nama_kota_tujuan}
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
              )}
              {props.activeItem === props.listActiveItem.dikemas && (
                <CardLogTransaksi
                  idTransaksi={transaksi.id_transaksi}
                  kotaAsal={transaksi.nama_kota_asal}
                  tujuan={transaksi.nama_kota_tujuan}
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
              )}
              {props.activeItem === props.listActiveItem.dikirim && (
                <CardLogTransaksi
                  idTransaksi={transaksi.id_transaksi}
                  kotaAsal={transaksi.nama_kota_asal}
                  tujuan={transaksi.nama_kota_tujuan}
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
              )}
              {props.activeItem === props.listActiveItem.selesai && (
                <CardLogTransaksi
                  idTransaksi={transaksi.id_transaksi}
                  kotaAsal={transaksi.nama_kota_asal}
                  tujuan={transaksi.nama_kota_tujuan}
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
              )}
            </Container>
          )
        })
      ) : (
        <Container style={styles.marginCard}>
          <Header as="h2">Transaksi Kosong</Header>
        </Container>
      )}
    </div>
  )
}

const styles = {
  cardRow: {
    marginTop: 15,
  },
  marginSide: {
    marginTop: 15,
  },
  noMargin: {
    marginTop: '0',
  },
  paddingContainer: {
    padding: 14,
  },
}

export default PesananSayaContainer
