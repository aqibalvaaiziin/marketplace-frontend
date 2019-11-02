import React from 'react'
import { Container } from 'semantic-ui-react'
import CardLogTransaksiUsaha from './CardLogTransaksiUsaha'

function LogTransaksiUsaha(props) {
  return props.kumpulanTransaksi.map(transaksi => {
    const dateTime = new Date(transaksi.createdAt)
    const date = dateTime.getDate()
    const month = dateTime.getMonth() + 1
    const year = dateTime.getFullYear()
    const hour = dateTime.getHours()
    const minutes = dateTime.getMinutes()

    const time = `${date}-${month}-${year} ${hour}:${minutes}`

    return (
      <Container styles={styles.marginTop} key={transaksi.id_transaksi}>
        <CardLogTransaksiUsaha transaksi={transaksi} time={time} />
      </Container>
    )
  })
}

const styles = {
  marginCard: {
    marginTop: '15px',
  },
}

export default LogTransaksiUsaha
