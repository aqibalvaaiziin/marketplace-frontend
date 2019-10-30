import _ from 'lodash'
import React from 'react'
import { Grid, Segment, Tab, Search, Icon } from 'semantic-ui-react'

function CardTabs() {
  const panes = [
    { menuItem: 'Semua Pesanan' },
    { menuItem: 'Belum Bayar' },
    { menuItem: 'Perlu Dikirim' },
    { menuItem: 'Selesai' },
    { menuItem: 'Pembatalan' },
    { menuItem: 'Pengembalian' },
  ]

  return (
    <Segment>
      <Tab
        menu={{ secondary: true, pointing: true }}
        panes={panes}
        style={styles.marginTabs}
      />
      <Grid columns={3}>
        <Grid.Column width="10">
          <Search />
        </Grid.Column>
        <Grid.Column width="6">
          Waktu Pesanan Dibuat <Icon name="calendar alternate"></Icon>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default CardTabs

const styles = {
  marginTabs: {
    marginBottom: 30,
  },
  marginDate: {
    marginLeft: 30,
  },
}
