import React, { useState, useEffect, useContext } from 'react'
import CardTabs, { listActiveItemPesanan } from './CardTabs'
import axios from 'axios'
import { HOSTNAME, UserContext } from '../../App'

function PesananSayaUsaha() {
  const context = useContext(UserContext)

  function setActiveItemData(item) {
    setActiveItemPesanan(item)
    const transactions = kumpulanTransaksi
    switch (item) {
      case listActiveItemPesanan.semuaPesanan:
        setSelectedTransaksi(transactions)
        break
      case listActiveItemPesanan.belumBayar:
        setSelectedTransaksi(
          transactions.filter(transaction => !transaction.konfirmasi),
        )
        break
      case listActiveItemPesanan.perluDikirim:
        setSelectedTransaksi(
          transactions.filter(transaction => transaction.konfirmasi),
        )
        break
      case listActiveItemPesanan.dikirim:
        setSelectedTransaksi(
          transactions.filter(transaction => transaction.konfirmasi),
        )
        break
      case listActiveItemPesanan.selesai:
        setSelectedTransaksi(
          transactions.filter(transaction => transaction.konfirmasi),
        )
        break
    }
  }

  useEffect(() => {
    axios
      .get(`${HOSTNAME}/transaksi/usaha`, {
        headers: { Authorization: `Bearer ${context.token}` },
      })
      .then(res => {
        setKumpulanTransaksi(res.data)
        setSelectedTransaksi(res.data)
      })
  }, [])

  const [kumpulanTransaksi, setKumpulanTransaksi] = useState([])
  const [activeItemPesanan, setActiveItemPesanan] = useState(
    listActiveItemPesanan.semuaPesanan,
  )
  const [selectedTransaksi, setSelectedTransaksi] = useState([])

  return (
    <div style={{ marginLeft: '20px' }}>
      <CardTabs
        kumpulanTransaksi={selectedTransaksi}
        activeItemPesanan={activeItemPesanan}
        setActiveItemPesanan={setActiveItemData}
      />
    </div>
  )
}

export default PesananSayaUsaha
