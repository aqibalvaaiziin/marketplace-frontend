import React, { useState } from 'react'
import CardTabs, { listActiveItemPesanan } from './CardTabs'

function PesananSayaUsaha() {
  const [activeItemPesanan, setActiveItemPesanan] = useState(
    listActiveItemPesanan.semuaPesanan,
  )

  return (
    <div>
      <CardTabs
        activeItemPesanan={activeItemPesanan}
        setActiveItemPesanan={setActiveItemPesanan}
      />
    </div>
  )
}

export default PesananSayaUsaha
