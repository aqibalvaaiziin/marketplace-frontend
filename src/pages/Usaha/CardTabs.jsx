import _ from 'lodash'
import React from 'react'
import {
  Grid,
  Segment,
  Menu,
  Search,
  Icon,
  Input,
  Label,
  Header,
  Table,
} from 'semantic-ui-react'

function CardTabs() {
  return (
    <Segment>
      <Grid columns={12}>
        <Grid.Row>
          <Grid.Column width="16">
            <Menu pointing secondary fluid widths={6}>
              <Menu.Item name="Semua Pesanan" active="true" />
              <Menu.Item name="Belum Bayar" />
              <Menu.Item name="Perlu Dikirim" />
              <Menu.Item name="Selesai" />
              <Menu.Item name="Pembatalan" />
              <Menu.Item name="Pengembalian" />
            </Menu>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width="4">
            <Search size="small" placeholder="Search..." />
          </Grid.Column>
          <Grid.Column width="12" style={styles.paddingColumn}>
            Waktu Pesanan Dibuat
            <Input size="small" type="date" style={styles.marginInput}>
              <input />
              <Icon name="calendar alternate" size="large" />
            </Input>
            <Label size="small" style={styles.marginInput}>
              s/d
            </Label>
            <Input size="small" type="date" style={styles.marginInput}>
              <input />
              <Icon name="calendar alternate" size="large" />
            </Input>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row></Grid.Row>
      </Grid>
    </Segment>
  )
}

export default CardTabs

const styles = {
  marginTabs: {
    marginBottom: 15,
  },
  marginInput: {
    marginLeft: 15,
  },
  paddingColumn: {
    paddingLeft: 220,
  },
}
